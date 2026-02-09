const MAX_TOP = 300,
  MAX_WIDTH = document.body.clientWidth;

let defaultType = 0;

let prizes;
const DEFAULT_MESS = [
  "新的一年，愿你心想事成，万事如意！",
  "祝福你及家人新年快乐，阖家幸福！",
  "愿新年带给你无尽的喜悦与惊喜！",
  "祝你新年吉祥，福气满满！",
  "祝大家新年快乐！",
  "愿你新年新气象，事业学业都进步！",
  "新年祝福大家平安健康，顺心如意！",
  "新年，祝福大家事事顺遂。",
  "新的一年，愿所有美好都如期而至！",
  "新的一年祝福大家越来越好！",
  "愿你新年梦想成真，前程似锦！"
];

let lastDanMuList = [];

let prizeElement = {},
  lasetPrizeIndex = 0;



let prizeSelectionCallback = null;

function setupPrizeSelection(callback) {
  prizeSelectionCallback = callback;
}

let prizeStatus = {};

function setPrizeStatus(statusData) {
  prizeStatus = statusData || {};
}

function isPrizeDone(type) {
  return !!prizeStatus[type];
}

let selectedPrizeType = null;
window.selectedPrizeType = null;

function selectPrize(type, index) {
  if (isPrizeDone(type)) {
    addQipao("该奖品已抽完，无法再次选择！");
    return;
  }
  
  selectedPrizeType = type;
  window.selectedPrizeType = type;
  
  if (prizeSelectionCallback) {
    prizeSelectionCallback(type, index);
  }
  
  let prize = prizes.find(p => p.type === type);
  if (prize) {
    addQipao(`已选择奖品: ${prize.text} ${prize.title}，准备开始抽奖！`);
  }
}

window.selectPrize = selectPrize;
window.setPrizeStatus = setPrizeStatus;
class DanMu {
  constructor(option) {
    if (typeof option !== "object") {
      option = {
        text: option
      };
    }

    this.position = {};
    this.text = option.text;
    this.onComplete = option.onComplete;

    this.init();
  }

  init() {
    this.element = document.createElement("div");
    this.element.className = "dan-mu";
    document.body.appendChild(this.element);

    this.start();
  }

  setText(text) {
    this.text = text || this.text;
    this.element.textContent = this.text;
    this.width = this.element.clientWidth + 100;
  }

  start(text) {
    let speed = ~~(Math.random() * 10000) + 6000;
    this.position = {
      x: MAX_WIDTH
    };
    let delay = speed / 10;

    this.setText(text);
    this.element.style.transform = "translateX(" + this.position.x + "px)";
    this.element.style.top = ~~(Math.random() * MAX_TOP) + 10 + "px";
    this.element.classList.add("active");
    this.tween = new TWEEN.Tween(this.position)
      .to(
        {
          x: -this.width
        },
        speed
      )
      .onUpdate(() => {
        this.render();
      })
      .onComplete(() => {
        this.onComplete && this.onComplete();
      })
      .start();
  }

  render() {
    this.element.style.transform = "translateX(" + this.position.x + "px)";
  }
}

class Qipao {
  constructor(option) {
    if (typeof option !== "object") {
      option = {
        text: option
      };
    }

    this.text = option.text;
    this.onComplete = option.onComplete;
    this.$par = document.querySelector(".qipao-container");
    if (!this.$par) {
      this.$par = document.createElement("div");
      this.$par.className = "qipao-container";
      document.body.appendChild(this.$par);
    }

    this.init();
  }

  init() {
    this.element = document.createElement("div");
    this.element.className = "qipao animated";
    this.$par.appendChild(this.element);

    this.start();
  }

  setText(text) {
    this.text = text || this.text;
    this.element.textContent = this.text;
  }

  start(text) {
    this.setText(text);
    this.element.classList.remove("bounceOutRight");
    this.element.classList.add("bounceInRight");

    setTimeout(() => {
      this.element.classList.remove("bounceInRight");
      this.element.classList.add("bounceOutRight");
      this.onComplete && this.onComplete();
    }, 4000);
  }
}

let addQipao = (() => {
  let qipaoList = [];
  return function (text) {
    let qipao;
    if (qipaoList.length > 0) {
      qipao = qipaoList.shift();
    } else {
      qipao = new Qipao({
        onComplete() {
          qipaoList.push(qipao);
        }
      });
    }

    qipao.start(text);
  };
})();

function setPrizes(pri) {
  prizes = pri;
  defaultType = prizes[0]["type"];
  lasetPrizeIndex = pri.length - 1;
}

function showPrizeList(currentPrizeIndex) {
  let currentPrize = prizes[currentPrizeIndex];
  if (currentPrize.type === defaultType) {
    currentPrize.count === "不限制";
  }
  
  let htmlCode = `<div class="prize-mess">正在抽取<label id="prizeType" class="prize-shine">${currentPrize.text}</label><label id="prizeText" class="prize-shine">${currentPrize.title}</label>，剩余<label id="prizeLeft" class="prize-shine">${currentPrize.count}</label>个</div><ul class="prize-list">`;
  prizes.forEach((item, index) => {
    if (item.type === defaultType) {
      return true;
    }
    
    let done = isPrizeDone(item.type);
    
    // 已完成的奖品不再显示
    if (done) {
      return;
    }
    
    let isSelected = selectedPrizeType === item.type;
    let isSelectable = !isSelected;
    let clickHandler = isSelectable ? `onclick="selectPrize('${item.type}', ${index})"` : '';
    let cursorStyle = isSelectable ? 'cursor: pointer;' : 'cursor: not-allowed;';
    let selectedClass = isSelected ? 'selected' : '';
    
    let opacity = '';
    
    htmlCode += `<li id="prize-item-${item.type}" class="prize-item ${selectedClass}" ${clickHandler} style="${cursorStyle}${opacity}">
                        <span></span><span></span><span></span><span></span>
                        <div class="prize-img">
                            <img src="${item.img}" alt="${item.title}">
                        </div>
                        <div class="prize-text">
                            <h5 class="prize-title">${item.text} ${
      item.title
    }</h5>
                            <div class="prize-count">
                                <div class="progress">
                                    <div id="prize-bar-${
                                      item.type
                                    }" class="progress-bar progress-bar-danger progress-bar-striped active" style="width: 100%;">
                                    </div>
                                </div>
                                <div id="prize-count-${
                                  item.type
                                }" class="prize-count-left">
                                    ${item.count + "/" + item.count}
                                </div>
                            </div>
                        </div>
                    </li>`;
  });
  htmlCode += `</ul>`;

  document.querySelector("#prizeBar").innerHTML = htmlCode;
}

function resetPrize(currentPrizeIndex) {
  prizeElement = {};
  lasetPrizeIndex = currentPrizeIndex;
  prizeStatus = {};
  selectedPrizeType = null;
  window.selectedPrizeType = null;
  showPrizeList(currentPrizeIndex);
}

let setPrizeData = (function () {
  return function (currentPrizeIndex, count, isInit) {
    let currentPrize = prizes[currentPrizeIndex],
      type = currentPrize.type,
      elements = prizeElement[type],
      totalCount = currentPrize.count;

    if (!elements) {
      elements = {
        box: document.querySelector(`#prize-item-${type}`),
        bar: document.querySelector(`#prize-bar-${type}`),
        text: document.querySelector(`#prize-count-${type}`)
      };
      prizeElement[type] = elements;
    }

    if (!prizeElement.prizeType) {
      prizeElement.prizeType = document.querySelector("#prizeType");
      prizeElement.prizeLeft = document.querySelector("#prizeLeft");
      prizeElement.prizeText = document.querySelector("#prizeText");
    }

    if (isInit) {
      for (let i = 1; i < currentPrizeIndex; i++) {
        let type = prizes[i]["type"];
        document.querySelector(`#prize-item-${type}`).className =
          "prize-item done";
        document.querySelector(`#prize-bar-${type}`).style.width = "0";
        document.querySelector(`#prize-count-${type}`).textContent =
          "0" + "/" + prizes[i]["count"];
      }
    }

    if (lasetPrizeIndex !== currentPrizeIndex) {
      let lastPrize = prizes[lasetPrizeIndex],
        lastBox = document.querySelector(`#prize-item-${lastPrize.type}`);
      lastBox.classList.remove("shine");
      lastBox.classList.add("done");
      elements.box && elements.box.classList.add("shine");
      prizeElement.prizeType.textContent = currentPrize.text;
      prizeElement.prizeText.textContent = currentPrize.title;

      lasetPrizeIndex = currentPrizeIndex;
    }

    if (currentPrizeIndex === 0) {
      prizeElement.prizeType.textContent = "特别奖";
      prizeElement.prizeText.textContent = " ";
      prizeElement.prizeLeft.textContent = "不限制";
      return;
    }

    count = totalCount - count;
    count = count < 0 ? 0 : count;
    let percent = (count / totalCount).toFixed(2);
    elements.bar && (elements.bar.style.width = percent * 100 + "%");
    elements.text && (elements.text.textContent = count + "/" + totalCount);
    prizeElement.prizeLeft.textContent = count;
  };
})();

function startMaoPao() {
  let len = DEFAULT_MESS.length,
    count = 5,
    index = ~~(Math.random() * len),
    danmuList = [],
    total = 0;

  function restart() {
    total = 0;
    danmuList.forEach(item => {
      let text =
        lastDanMuList.length > 0
          ? lastDanMuList.shift()
          : DEFAULT_MESS[index++];
      item.start(text);
      index = index > len ? 0 : index;
    });
  }

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      danmuList.push(
        new DanMu({
          text: DEFAULT_MESS[index++],
          onComplete: function () {
            setTimeout(() => {
              this.start(DEFAULT_MESS[index++]);
              index = index > len ? 0 : index;
            }, 1000);
          }
        })
      );
      index = index > len ? 0 : index;
    }, 1500 * i);
  }
}

function addDanMu(text) {
  lastDanMuList.push(text);
}

export {
  startMaoPao,
  showPrizeList,
  setPrizeData,
  addDanMu,
  setPrizes,
  resetPrize,
  addQipao,
  setupPrizeSelection,
  setPrizeStatus
};
