/**
 * 奖品设置
 * type: 唯一标识，0是默认特别奖的占位符，其它奖品不可使用
 * count: 奖品数量
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
    text: "edifier",
    title: "",
    img: "../img/edifier.jpg"
  },

  {
    type: 2,
    count: 1,
    text: "huawei",
    title: "",
    img: "../img/huawei.png"
  },

  {
    type: 3,
    count: 1,
    text: "ipad",
    title: "",
    img: "../img/ipad.jpg"
  },

  {
    type: 4,
    count: 1,
    text: "kindle",
    title: "",
    img: "../img/kindle.jpg"
  },

  {
    type: 5,
    count: 1,
    text: "mbp",
    title: "",
    img: "../img/mbp.jpg"
  },

  {
    type: 6,
    count: 1,
    text: "secrit",
    title: "",
    img: "../img/secrit.jpg"
  },

  {
    type: 7,
    count: 1,
    text: "spark",
    title: "",
    img: "../img/spark.jpg"
  },

];

/**
 * 一次抽取的奖品个数与prizes对应
 */
const EACH_COUNT = [1, 1, 1, 1, 1, 1, 1, 1];

/**
 * 卡片公司名称标识
 */
const COMPANY = "MoShang";

module.exports = {
  prizes,
  EACH_COUNT,
  COMPANY
};