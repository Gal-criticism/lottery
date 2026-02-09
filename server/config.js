/**
 * 奖品设置
 * type: 唯一标识，0是默认特别奖的占位符，其它奖品不可使用
 * count: 奖品数量（每个奖品固定为1，抽一次移除）
 * title: 奖品描述
 * text: 奖项名称
 * img: 图片地址
 */
const prizes = [
  {
    type: 0,
    count: 1000,
    title: "",
    text: "特别奖"
  },

  {
    type: 1,
    count: 1,
    text: "奖品1",
    title: "",
    img: "../img/奖品1-1.jpg"
  },

  {
    type: 2,
    count: 1,
    text: "奖品10",
    title: "",
    img: "../img/奖品10-1.jpg"
  },

  {
    type: 3,
    count: 1,
    text: "奖品11",
    title: "",
    img: "../img/奖品11-1.jpg"
  },

  {
    type: 4,
    count: 1,
    text: "奖品12",
    title: "",
    img: "../img/奖品12-1.jpg"
  },

  {
    type: 5,
    count: 1,
    text: "奖品13",
    title: "",
    img: "../img/奖品13-1.jpg"
  },

  {
    type: 6,
    count: 1,
    text: "奖品14",
    title: "",
    img: "../img/奖品14-1.jpg"
  },

  {
    type: 7,
    count: 1,
    text: "奖品15",
    title: "",
    img: "../img/奖品15-1.jpg"
  },

  {
    type: 8,
    count: 1,
    text: "奖品16",
    title: "",
    img: "../img/奖品16-1.jpg"
  },

  {
    type: 9,
    count: 1,
    text: "奖品17",
    title: "",
    img: "../img/奖品17-1.jpg"
  },

  {
    type: 10,
    count: 1,
    text: "奖品18",
    title: "",
    img: "../img/奖品18-1.jpg"
  },

  {
    type: 11,
    count: 1,
    text: "奖品19",
    title: "",
    img: "../img/奖品19-1.jpg"
  },

  {
    type: 12,
    count: 1,
    text: "奖品2",
    title: "",
    img: "../img/奖品2-1.jpg"
  },

  {
    type: 13,
    count: 1,
    text: "奖品20",
    title: "",
    img: "../img/奖品20-1.jpg"
  },

  {
    type: 14,
    count: 1,
    text: "奖品21",
    title: "",
    img: "../img/奖品21-1.jpg"
  },

  {
    type: 15,
    count: 1,
    text: "奖品22",
    title: "",
    img: "../img/奖品22-1.jpg"
  },

  {
    type: 16,
    count: 1,
    text: "奖品23",
    title: "",
    img: "../img/奖品23-1.jpg"
  },

  {
    type: 17,
    count: 1,
    text: "奖品24",
    title: "",
    img: "../img/奖品24-1.jpg"
  },

  {
    type: 18,
    count: 1,
    text: "奖品25",
    title: "",
    img: "../img/奖品25-1.jpg"
  },

  {
    type: 19,
    count: 1,
    text: "奖品26",
    title: "",
    img: "../img/奖品26-1.jpg"
  },

  {
    type: 20,
    count: 1,
    text: "奖品27",
    title: "",
    img: "../img/奖品27-1.jpg"
  },

  {
    type: 21,
    count: 1,
    text: "奖品28",
    title: "",
    img: "../img/奖品28-1.jpg"
  },

  {
    type: 22,
    count: 1,
    text: "奖品29",
    title: "",
    img: "../img/奖品29-1.jpg"
  },

  {
    type: 23,
    count: 1,
    text: "奖品3",
    title: "",
    img: "../img/奖品3.jpg"
  },

  {
    type: 24,
    count: 1,
    text: "奖品30",
    title: "",
    img: "../img/奖品30-1.jpg"
  },

  {
    type: 25,
    count: 1,
    text: "奖品31",
    title: "",
    img: "../img/奖品31-1.jpg"
  },

  {
    type: 26,
    count: 1,
    text: "奖品32",
    title: "",
    img: "../img/奖品32-1.jpg"
  },

  {
    type: 27,
    count: 1,
    text: "奖品33",
    title: "",
    img: "../img/奖品33-1.jpg"
  },

  {
    type: 28,
    count: 1,
    text: "奖品34",
    title: "",
    img: "../img/奖品34-1.jpg"
  },

  {
    type: 29,
    count: 1,
    text: "奖品35",
    title: "",
    img: "../img/奖品35-1.jpg"
  },

  {
    type: 30,
    count: 1,
    text: "奖品36",
    title: "",
    img: "../img/奖品36-1.jpg"
  },

  {
    type: 31,
    count: 1,
    text: "奖品37",
    title: "",
    img: "../img/奖品37-1.jpg"
  },

  {
    type: 32,
    count: 1,
    text: "奖品38",
    title: "",
    img: "../img/奖品38-1.jpg"
  },

  {
    type: 33,
    count: 1,
    text: "奖品39",
    title: "",
    img: "../img/奖品39-1.jpg"
  },

  {
    type: 34,
    count: 1,
    text: "奖品4",
    title: "",
    img: "../img/奖品4.jpg"
  },

  {
    type: 35,
    count: 1,
    text: "奖品40",
    title: "",
    img: "../img/奖品40-1.jpg"
  },

  {
    type: 36,
    count: 1,
    text: "奖品41",
    title: "",
    img: "../img/奖品41-1.jpg"
  },

  {
    type: 37,
    count: 1,
    text: "奖品42",
    title: "",
    img: "../img/奖品42-1.jpg"
  },

  {
    type: 38,
    count: 1,
    text: "奖品43",
    title: "",
    img: "../img/奖品43-1.jpg"
  },

  {
    type: 39,
    count: 1,
    text: "奖品44",
    title: "",
    img: "../img/奖品44-1.jpg"
  },

  {
    type: 40,
    count: 1,
    text: "奖品45",
    title: "",
    img: "../img/奖品45-1.jpg"
  },

  {
    type: 41,
    count: 1,
    text: "奖品46",
    title: "",
    img: "../img/奖品46-1.webp"
  },

  {
    type: 42,
    count: 1,
    text: "奖品47",
    title: "",
    img: "../img/奖品47-1.webp"
  },

  {
    type: 43,
    count: 1,
    text: "奖品48",
    title: "",
    img: "../img/奖品48-1.jpg"
  },

  {
    type: 44,
    count: 1,
    text: "奖品49",
    title: "",
    img: "../img/奖品49-1.jpg"
  },

  {
    type: 45,
    count: 1,
    text: "奖品5",
    title: "",
    img: "../img/奖品5-1.jpg"
  },

  {
    type: 46,
    count: 1,
    text: "奖品50",
    title: "",
    img: "../img/奖品50-1.jpg"
  },

  {
    type: 47,
    count: 1,
    text: "奖品51",
    title: "",
    img: "../img/奖品51-1.jpg"
  },

  {
    type: 48,
    count: 1,
    text: "奖品52",
    title: "",
    img: "../img/奖品52-1.jpg"
  },

  {
    type: 49,
    count: 1,
    text: "奖品53",
    title: "",
    img: "../img/奖品53-1.jpg"
  },

  {
    type: 50,
    count: 1,
    text: "奖品54",
    title: "",
    img: "../img/奖品54-1.jpg"
  },

  {
    type: 51,
    count: 1,
    text: "奖品55",
    title: "",
    img: "../img/奖品55-1.jpg"
  },

  {
    type: 52,
    count: 1,
    text: "奖品56",
    title: "",
    img: "../img/奖品56-1.jpg"
  },

  {
    type: 53,
    count: 1,
    text: "奖品57",
    title: "",
    img: "../img/奖品57-1.jpg"
  },

  {
    type: 54,
    count: 1,
    text: "奖品58",
    title: "",
    img: "../img/奖品58-1.jpg"
  },

  {
    type: 55,
    count: 1,
    text: "奖品59",
    title: "",
    img: "../img/奖品59-1.jpg"
  },

  {
    type: 56,
    count: 1,
    text: "奖品6",
    title: "",
    img: "../img/奖品6-1.jpg"
  },

  {
    type: 57,
    count: 1,
    text: "奖品60",
    title: "",
    img: "../img/奖品60-1.jpg"
  },

  {
    type: 58,
    count: 1,
    text: "奖品61",
    title: "",
    img: "../img/奖品61-1.jpg"
  },

  {
    type: 59,
    count: 1,
    text: "奖品62",
    title: "",
    img: "../img/奖品62-1.jpg"
  },

  {
    type: 60,
    count: 1,
    text: "奖品63",
    title: "",
    img: "../img/奖品63-1.jpg"
  },

  {
    type: 61,
    count: 1,
    text: "奖品64",
    title: "",
    img: "../img/奖品64-1.jpg"
  },

  {
    type: 62,
    count: 1,
    text: "奖品65",
    title: "",
    img: "../img/奖品65-1.png"
  },

  {
    type: 63,
    count: 1,
    text: "奖品66",
    title: "",
    img: "../img/奖品66-1.jpg"
  },

  {
    type: 64,
    count: 1,
    text: "奖品67",
    title: "",
    img: "../img/奖品67-1.jpg"
  },

  {
    type: 65,
    count: 1,
    text: "奖品68",
    title: "",
    img: "../img/奖品68-1.jpg"
  },

  {
    type: 66,
    count: 1,
    text: "奖品69",
    title: "",
    img: "../img/奖品69-1.jpg"
  },

  {
    type: 67,
    count: 1,
    text: "奖品7",
    title: "",
    img: "../img/奖品7-1.jpg"
  },

  {
    type: 68,
    count: 1,
    text: "奖品70",
    title: "",
    img: "../img/奖品70-1.jpg"
  },

  {
    type: 69,
    count: 1,
    text: "奖品71",
    title: "",
    img: "../img/奖品71-1.jpg"
  },

  {
    type: 70,
    count: 1,
    text: "奖品72",
    title: "",
    img: "../img/奖品72-1.jpg"
  },

  {
    type: 71,
    count: 1,
    text: "奖品73",
    title: "",
    img: "../img/奖品73-1.jpg"
  },

  {
    type: 72,
    count: 1,
    text: "奖品74",
    title: "",
    img: "../img/奖品74-1.jpg"
  },

  {
    type: 73,
    count: 1,
    text: "奖品75",
    title: "",
    img: "../img/奖品75-1.jpg"
  },

  {
    type: 74,
    count: 1,
    text: "奖品76",
    title: "",
    img: "../img/奖品76-1.jpg"
  },

  {
    type: 75,
    count: 1,
    text: "奖品77",
    title: "",
    img: "../img/奖品77-1.jpg"
  },

  {
    type: 76,
    count: 1,
    text: "奖品78",
    title: "",
    img: "../img/奖品78-1.jpg"
  },

  {
    type: 77,
    count: 1,
    text: "奖品79",
    title: "",
    img: "../img/奖品79-1.jpg"
  },

  {
    type: 78,
    count: 1,
    text: "奖品8",
    title: "",
    img: "../img/奖品8-1.jpg"
  },

  {
    type: 79,
    count: 1,
    text: "奖品80",
    title: "",
    img: "../img/奖品80-1.jpg"
  },

  {
    type: 80,
    count: 1,
    text: "奖品81",
    title: "",
    img: "../img/奖品81-1.jpg"
  },

  {
    type: 81,
    count: 1,
    text: "奖品82",
    title: "",
    img: "../img/奖品82-1.png"
  },

  {
    type: 82,
    count: 1,
    text: "奖品83",
    title: "",
    img: "../img/奖品83-1.jpg"
  },

  {
    type: 83,
    count: 1,
    text: "奖品84",
    title: "",
    img: "../img/奖品84-1.jpg"
  },

  {
    type: 84,
    count: 1,
    text: "奖品85",
    title: "",
    img: "../img/奖品85-1.jpg"
  },

  {
    type: 85,
    count: 1,
    text: "奖品86",
    title: "",
    img: "../img/奖品86-1.jpg"
  },

  {
    type: 86,
    count: 1,
    text: "奖品87",
    title: "",
    img: "../img/奖品87-1.jpg"
  },

  {
    type: 87,
    count: 1,
    text: "奖品88",
    title: "",
    img: "../img/奖品88-1.jpg"
  },

  {
    type: 88,
    count: 1,
    text: "奖品89",
    title: "",
    img: "../img/奖品89-1.jpg"
  },

  {
    type: 89,
    count: 1,
    text: "奖品9",
    title: "",
    img: "../img/奖品9-1.jpg"
  },

  {
    type: 90,
    count: 1,
    text: "奖品90",
    title: "",
    img: "../img/奖品90-1.jpg"
  },

  {
    type: 91,
    count: 1,
    text: "奖品91",
    title: "",
    img: "../img/奖品91-1.jpg"
  },

  {
    type: 92,
    count: 1,
    text: "奖品92",
    title: "",
    img: "../img/奖品92-1.jpg"
  },

  {
    type: 93,
    count: 1,
    text: "奖品93",
    title: "",
    img: "../img/奖品93-1.jpg"
  },

  {
    type: 94,
    count: 1,
    text: "奖品94",
    title: "",
    img: "../img/奖品94-1.jpg"
  },

  {
    type: 95,
    count: 1,
    text: "奖品95",
    title: "",
    img: "../img/奖品95-1.jpg"
  },

  {
    type: 96,
    count: 1,
    text: "奖品96",
    title: "",
    img: "../img/奖品96-1.jpg"
  },

  {
    type: 97,
    count: 1,
    text: "奖品97",
    title: "",
    img: "../img/奖品97-1.png"
  },

  {
    type: 98,
    count: 1,
    text: "奖品98",
    title: "",
    img: "../img/奖品98-1.jpg"
  },

];

/**
 * 一次抽取的奖品个数（每个奖品固定抽1个）
 */
const EACH_COUNT = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

/**
 * 卡片公司名称标识
 */
const COMPANY = "MoShang";

module.exports = {
  prizes,
  EACH_COUNT,
  COMPANY
};