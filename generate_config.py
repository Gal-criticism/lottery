import os
from pathlib import Path

IMG_DIR = Path(__file__).parent / "product" / "src" / "img"
OUTPUT_FILE = Path(__file__).parent / "server" / "config.js"

IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'}

def generate_config():
    image_files = []
    for file_path in sorted(IMG_DIR.iterdir()):
        if file_path.suffix.lower() in IMAGE_EXTENSIONS:
            image_files.append(file_path)
    
    if not image_files:
        print(f"Error: No image files found in {IMG_DIR}")
        return
    
    lines = []
    lines.append("/**")
    lines.append(" * 奖品设置")
    lines.append(" * type: 唯一标识，0是默认特别奖的占位符，其它奖品不可使用")
    lines.append(" * count: 奖品数量")
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
    for img_path in image_files:
        prize_name = img_path.stem
        
        lines.append("  {")
        lines.append(f"    type: {type_id},")
        lines.append("    count: 1,")
        lines.append(f'    text: "{prize_name}",')
        lines.append('    title: "",')
        lines.append(f'    img: "../img/{img_path.name}"')
        lines.append("  },")
        lines.append("")
        
        type_id += 1
    
    lines.append("];")
    lines.append("")
    lines.append("/**")
    lines.append(" * 一次抽取的奖品个数与prizes对应")
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
    print(f"Found {len(image_files)} images, generated {type_id - 1} prize configs")

if __name__ == "__main__":
    generate_config()
