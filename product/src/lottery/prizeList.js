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
  if (statusData) {
    prizeStatus = Object.assign({}, prizeStatus, statusData);
  }
}

function resetPrizeStatus() {
  prizeStatus = {};
}

function isPrizeDone(type) {
  return !!prizeStatus[type];
}

let selectedPrizeType = null;
window.selectedPrizeType = null;
let isPrizeSelecting = true;

window.setPrizeSelecting = function(status) {
  isPrizeSelecting = status;
};

// 图片预览相关变量
let currentPreviewImages = [];
let currentPreviewIndex = 0;
let prizeImagesMap = {};
let prizeImagesMapLoaded = {};
let currentPreviewPrizeName = null;

window.openPrizeImagePreview = function(prizeName, currentImg) {
  currentPreviewPrizeName = prizeName;
  let baseName = prizeName;
  let imgDir = "../img/";
  let exts = ['.jpg', '.png', '.webp'];
  
  if (prizeImagesMapLoaded[prizeName]) {
    currentPreviewImages = prizeImagesMap[prizeName] || [currentImg];
    currentPreviewIndex = 0;
    createImagePreviewModal();
    showPrizePreviewImage();
    updatePrizePreviewNav();
    return;
  }
  
  prizeImagesMapLoaded[prizeName] = true;
  prizeImagesMap[prizeName] = [currentImg];
  currentPreviewImages = [currentImg];
  currentPreviewIndex = 0;
  
  createImagePreviewModal();
  showPrizePreviewImage();
  
  let foundCount = 1;  // 图片文件名从 1 开始
  let foundImages = [currentImg];
  let checkedSet = new Set();  // 防止重复检查
  
  function checkNext() {
    foundCount++;
    
    if (foundCount > 30) {
      return;
    }
    
    let extIndex = 0;
    
    function checkExt() {
      if (extIndex >= exts.length) {
        checkNext();
        return;
      }
      
      let ext = exts[extIndex];
      let url = imgDir + baseName + "-" + foundCount + ext;
      let img = new Image();
      
      img.onload = function() {
         if (this.complete && this.naturalWidth > 0) {
           if (!checkedSet.has(url)) {
             checkedSet.add(url);
             foundImages.push(url);
             // 实时更新缓存，这样下次打开时就能直接看到已找到的图片
             prizeImagesMap[prizeName] = [...foundImages];

             // 只有当用户还在预览当前奖品时才更新 UI
             if (currentPreviewPrizeName === prizeName && foundImages.length > 1) {
               currentPreviewImages = [...foundImages];
               updatePrizePreviewNav();
             }
           }
         }
         extIndex++;
         checkExt();
      };
      
      img.onerror = function() {
        extIndex++;
        checkExt();
      };
      
      img.src = url;
    }
    
    checkExt();
  }
  
  checkNext();
};

function showPrizePreviewImage() {
  let previewImg = document.getElementById('prize-preview-image');
  let loading = document.querySelector('.prize-preview-loading');
  let modal = document.getElementById('prize-image-preview-modal');
  
  if (modal) modal.style.display = 'block';
  if (loading) loading.style.display = 'block';
  if (previewImg) {
    previewImg.style.display = 'none';
    previewImg.src = currentPreviewImages[currentPreviewIndex] || '';
    
    previewImg.onload = function() {
      if (loading) loading.style.display = 'none';
      previewImg.style.display = 'block';
    };
  }
}

function updatePrizePreviewNav() {
  let prevBtn = document.getElementById('prize-prev-image');
  let nextBtn = document.getElementById('prize-next-image');
  let counter = document.getElementById('prize-preview-counter');
  
  if (prevBtn) prevBtn.style.display = currentPreviewImages.length > 1 ? 'flex' : 'none';
  if (nextBtn) nextBtn.style.display = currentPreviewImages.length > 1 ? 'flex' : 'none';
  if (counter) counter.textContent = (currentPreviewIndex + 1) + ' / ' + currentPreviewImages.length;
}

window.changePrizePreviewImage = function(direction) {
  if (currentPreviewImages.length <= 1) return;
  
  currentPreviewIndex += direction;
  
  if (currentPreviewIndex < 0) {
    currentPreviewIndex = currentPreviewImages.length - 1;
  } else if (currentPreviewIndex >= currentPreviewImages.length) {
    currentPreviewIndex = 0;
  }
  
  let previewImg = document.getElementById('prize-preview-image');
  if (previewImg) {
    previewImg.style.display = 'none';
    previewImg.src = currentPreviewImages[currentPreviewIndex];
    
    previewImg.onload = function() {
      let loading = document.querySelector('.prize-preview-loading');
      if (loading) loading.style.display = 'none';
      previewImg.style.display = 'block';
    };
  }
  
  updatePrizePreviewNav();
};

// 创建图片预览模态框
function createImagePreviewModal() {
  if (document.getElementById('prize-image-preview-modal')) return;
  
  let modalHTML = `
    <div id="prize-image-preview-modal" class="prize-image-preview-modal" onclick="closePrizeImagePreview(event)">
      <div class="prize-preview-content">
        <span class="prize-preview-close" onclick="document.getElementById('prize-image-preview-modal').style.display='none'">&times;</span>
        <div class="prize-preview-wrapper">
          <button id="prize-prev-image" class="prize-preview-btn prev" onclick="event.stopPropagation(); changePrizePreviewImage(-1)">&#10094;</button>
          <div class="prize-preview-image-container">
            <div class="prize-preview-loading"></div>
            <img id="prize-preview-image" src="" alt="奖品图片" onclick="event.stopPropagation()">
          </div>
          <button id="prize-next-image" class="prize-preview-btn next" onclick="event.stopPropagation(); changePrizePreviewImage(1)">&#10095;</button>
        </div>
        <div id="prize-preview-counter" class="prize-preview-counter"></div>
      </div>
    </div>
  `;
  
  let style = document.createElement('style');
  style.textContent = `
    .prize-image-preview-modal {
      display: none;
      position: fixed;
      z-index: 2000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.85);
    }
    .prize-preview-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 90%;
      max-height: 90%;
    }
    .prize-preview-close {
      position: absolute;
      top: -40px;
      right: 0;
      color: #fff;
      font-size: 40px;
      cursor: pointer;
      z-index: 2001;
    }
    .prize-preview-wrapper {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .prize-preview-image-container {
      position: relative;
      width: 500px;
      height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #000;
      border-radius: 8px;
      overflow: hidden;
    }
    .prize-preview-image-container img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .prize-preview-btn {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(97, 125, 242, 0.6);
      color: white;
      border: none;
      cursor: pointer;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    .prize-preview-btn:hover {
      background: rgba(97, 125, 242, 0.9);
      transform: scale(1.1);
    }
    .prize-preview-btn.prev { margin-right: 10px; }
    .prize-preview-btn.next { margin-left: 10px; }
    .prize-preview-counter {
      text-align: center;
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
    }
    .prize-preview-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      border: 4px solid rgba(255,255,255,0.3);
      border-top-color: #617df2;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to { transform: translate(-50%, -50%) rotate(360deg); }
    }
  `;
  
  document.head.appendChild(style);
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  let previewImg = document.getElementById('prize-preview-image');
  if (previewImg) {
    previewImg.onload = function() {
      let loading = document.querySelector('.prize-preview-loading');
      if (loading) loading.style.display = 'none';
      previewImg.style.display = 'block';
    };
  }
}

// 关闭图片预览
window.closePrizeImagePreview = function(event) {
  if (!event || event.target === document.getElementById('prize-image-preview-modal')) {
    document.getElementById('prize-image-preview-modal').style.display = 'none';
  }
};

function selectPrize(type, index) {
  if (isPrizeDone(type)) {
    addQipao("该奖品已抽完，无法再次选择！");
    return;
  }
  
  if (!isPrizeSelecting) {
    addQipao("正在抽奖中，无法切换奖品！");
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
    
    let isSelected = String(item.type) === String(selectedPrizeType);
    let isSelectable = !isSelected;
    let clickHandler = isSelectable ? `onclick="selectPrize('${item.type}', ${index})"` : '';
    let cursorStyle = isSelectable ? 'cursor: pointer;' : 'cursor: not-allowed;';
    let selectedClass = isSelected ? 'selected' : '';
    
    let opacity = '';
    
    htmlCode += `<li id="prize-item-${item.type}" class="prize-item ${selectedClass}" ${clickHandler} style="${cursorStyle}${opacity}">
                        <span></span><span></span><span></span><span></span>
                        <div class="prize-img">
                            <img src="${item.img}" alt="${item.title}" onclick="event.stopPropagation(); openPrizeImagePreview('${item.text}', '${item.img}')" style="cursor: pointer;">
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
                            <button class="prize-view-all-btn" onclick="event.stopPropagation(); openPrizeImagePreview('${item.text}', '${item.img}')">查看全部</button>
                        </div>
                    </li>`;
  });
  htmlCode += `</ul>`;

  let prizeBar = document.querySelector("#prizeBar");
  if (prizeBar) {
    prizeBar.innerHTML = htmlCode;
  }
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
    let currentPrize = prizes[currentPrizeIndex];
    if (!currentPrize) return;
    
    let type = currentPrize.type,
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
        let prizeItem = document.querySelector(`#prize-item-${type}`);
        let prizeBar = document.querySelector(`#prize-bar-${type}`);
        let prizeCount = document.querySelector(`#prize-count-${type}`);
        
        if (prizeItem) prizeItem.className = "prize-item done";
        if (prizeBar) prizeBar.style.width = "0";
        if (prizeCount) prizeCount.textContent = "0" + "/" + prizes[i]["count"];
      }
    }

    if (lasetPrizeIndex !== currentPrizeIndex) {
      let lastPrize = prizes[lasetPrizeIndex];
      if (lastPrize) {
        let lastBox = document.querySelector(`#prize-item-${lastPrize.type}`);
        if (lastBox) {
          lastBox.classList.remove("shine");
          lastBox.classList.add("done");
        }
      }
      
      if (elements.box) {
        elements.box.classList.add("shine");
      }
      
      if (prizeElement.prizeType) {
        prizeElement.prizeType.textContent = currentPrize.text;
      }
      if (prizeElement.prizeText) {
        prizeElement.prizeText.textContent = currentPrize.title;
      }

      lasetPrizeIndex = currentPrizeIndex;
    }

    if (currentPrizeIndex === 0) {
      if (prizeElement.prizeType) prizeElement.prizeType.textContent = "特别奖";
      if (prizeElement.prizeText) prizeElement.prizeText.textContent = " ";
      if (prizeElement.prizeLeft) prizeElement.prizeLeft.textContent = "不限制";
      return;
    }

    count = totalCount - count;
    count = count < 0 ? 0 : count;
    let percent = (count / totalCount).toFixed(2);
    
    if (elements.bar) {
      elements.bar.style.width = (percent * 100) + "%";
    }
    if (elements.text) {
      elements.text.textContent = count + "/" + totalCount;
    }
    if (prizeElement.prizeLeft) {
      prizeElement.prizeLeft.textContent = count;
    }
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

function showPrizeConfirm(luckyUsers, prize) {
  if (!luckyUsers || luckyUsers.length === 0) {
    return;
  }

  let winnerNames = luckyUsers.map(user => user[1]).join("、");
  console.log('showPrizeConfirm 被调用');
  console.log('luckyUsers:', luckyUsers);
  console.log('prize:', prize);
  
  let modal = document.createElement('div');
  modal.id = 'prize-confirm-modal';
  modal.className = 'prize-confirm-modal';
  modal.innerHTML = `
    <div class="prize-confirm-content">
      <h2>🎉 恭喜中奖 🎉</h2>
      <div class="winner-info">
        <p class="winner-names">${winnerNames}</p>
        <p class="prize-name">${prize.text} ${prize.title}</p>
      </div>
      <button id="confirm-close-btn" class="confirm-button">确定</button>
    </div>
  `;
  
  let style = document.createElement('style');
  style.textContent = `
    .prize-confirm-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.7);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .prize-confirm-content {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 20px;
      padding: 40px;
      text-align: center;
      color: white;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      animation: zoomIn 0.3s ease;
    }
    @keyframes zoomIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .prize-confirm-content h2 {
      margin-bottom: 30px;
      font-size: 28px;
    }
    .winner-info {
      margin-bottom: 30px;
    }
    .winner-names {
      font-size: 32px;
      font-weight: bold;
      margin: 15px 0;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    .prize-name {
      font-size: 20px;
      opacity: 0.9;
      margin-top: 10px;
    }
    .confirm-button {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      border: none;
      border-radius: 30px;
      padding: 15px 50px;
      font-size: 20px;
      color: white;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      box-shadow: 0 5px 20px rgba(240, 147, 251, 0.4);
    }
    .confirm-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(240, 147, 251, 0.5);
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(modal);
  
  console.log('modal已添加到body');
  console.log('window.onPrizeConfirmClose:', window.onPrizeConfirmClose);
  
  // 延迟绑定事件，确保DOM已完全渲染
  setTimeout(function() {
    let confirmBtn = document.getElementById('confirm-close-btn');
    console.log('confirmBtn元素:', confirmBtn);
    
    if (confirmBtn) {
      confirmBtn.onclick = function() {
        console.log('确定按钮被点击');
        console.log('window.onPrizeConfirmClose:', window.onPrizeConfirmClose);
        
        // 调用回调函数
        if (window.onPrizeConfirmClose && typeof window.onPrizeConfirmClose === 'function') {
          console.log('调用回调函数');
          window.onPrizeConfirmClose(luckyUsers, prize);
        } else {
          console.error('window.onPrizeConfirmClose未定义或不是函数');
          alert('回调函数未定义!');
        }
        
        console.log('准备移除弹窗');
        
        // 移除弹窗
        let modalEl = document.getElementById('prize-confirm-modal');
        if (modalEl) {
          console.log('找到modal元素，移除');
          modalEl.parentNode.removeChild(modalEl);
        } else {
          console.error('找不到modal元素');
        }
        
        // 移除样式
        let styleEl = document.querySelector('style');
        if (styleEl && styleEl.textContent.includes('.prize-confirm-modal')) {
          styleEl.parentNode.removeChild(styleEl);
        }
        
        console.log('弹窗移除完成');
      };
      console.log('按钮事件绑定成功');
    } else {
      console.error('找不到confirm-close-btn元素');
    }
  }, 100);
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
  setPrizeStatus,
  resetPrizeStatus,
  showPrizeConfirm,
  isPrizeDone
};
