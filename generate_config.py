from pathlib import Path

IMG_DIR = Path(__file__).parent / "product" / "src" / "img"
OUTPUT_FILE = Path(__file__).parent / "server" / "config.js"

IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'}

def extract_prize_base_name(filename):
    stem = Path(filename).stem
    if '-' in stem:
        return stem.rsplit('-', 1)[0]
    return stem

def generate_config():
    prize_groups = {}
    
    for file_path in sorted(IMG_DIR.iterdir()):
        if file_path.suffix.lower() in IMAGE_EXTENSIONS:
            base_name = extract_prize_base_name(file_path.name)
            if base_name not in prize_groups:
                prize_groups[base_name] = []
            prize_groups[base_name].append(file_path)
    
    prize_groups = dict(sorted(prize_groups.items()))
    
    lines = []
    lines.append("/**")
    lines.append(" * 奖品设置")
    lines.append(" * type: 唯一标识，0是默认特别奖的占位符，其它奖品不可使用")
    lines.append(" * count: 奖品数量（每个奖品固定为1，抽一次移除）")
    lines.append(" * title: 奖品描述")
    lines.append(" * text: 奖项名称")
    lines.append(" * img: 图片地址")
    lines.append(" */")
    lines.append("const prizes = [")
    lines.append("  {")
    lines.append('    type: 0,')
    lines.append('    count: 1000,')
    lines.append('    title: "",')
    lines.append('    text: "特别奖"')
    lines.append("  },")
    lines.append("")
    
    type_id = 1
    for prize_name, img_files in prize_groups.items():
        first_img = img_files[0]
        
        lines.append("  {")
        lines.append(f"    type: {type_id},")
        lines.append("    count: 1,")
        lines.append(f'    text: "{prize_name}",')
        lines.append('    title: "",')
        lines.append(f'    img: "../img/{first_img.name}"')
        lines.append("  },")
        lines.append("")
        
        type_id += 1
    
    lines.append("];")
    lines.append("")
    lines.append("/**")
    lines.append(" * 一次抽取的奖品个数（每个奖品固定抽1个）")
    lines.append(" */")
    lines.append("const EACH_COUNT = [1" + ", 1" * (type_id - 1) + "];")
    lines.append("")
    lines.append("/**")
    lines.append(" * 卡片公司名称标识")
    lines.append(" */")
    lines.append('const COMPANY = "MoShang";')
    lines.append("")
    lines.append("module.exports = {")
    lines.append("  prizes,")
    lines.append("  EACH_COUNT,")
    lines.append("  COMPANY")
    lines.append("};")
    
    content = "\n".join(lines)
    OUTPUT_FILE.write_text(content, encoding="utf-8")
    
    print(f"Generated: {OUTPUT_FILE}")
    print(f"Found {sum(len(v) for v in prize_groups.values())} images")
    print(f"Grouped into {len(prize_groups)} prizes")
    print("Each prize: count=1, EACH_COUNT=1 (draw once to remove)")

if __name__ == "__main__":
    generate_config()
