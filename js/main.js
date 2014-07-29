var cj = createjs, canvas, stage, stage_width;
var assets = {}, panels = {}, panel_positions = {}, positions = {};
var clear_back, clear_text;
var timer = false, count, second, clear = true;

var startButton = document.getElementById("puzzleStartButton");
var stopButton = document.getElementById("puzzleStopButton");
var resetButton = document.getElementById("puzzleResetButton");

function load() {

  var loadManifest = [
        {id:1, src:"./img/panel/1.png"},
        {id:2, src:"./img/panel/2.png"},
        {id:3, src:"./img/panel/3.png"},
        {id:4, src:"./img/panel/4.png"},
        {id:5, src:"./img/panel/5.png"},
        {id:6, src:"./img/panel/6.png"},
        {id:7, src:"./img/panel/7.png"},
        {id:8, src:"./img/panel/8.png"},
        {id:9, src:"./img/panel/9.png"},
        {id:10, src:"./img/panel/10.png"},
        {id:11, src:"./img/panel/11.png"},
        {id:12, src:"./img/panel/12.png"},
        {id:13, src:"./img/panel/13.png"},
        {id:14, src:"./img/panel/14.png"},
        {id:15, src:"./img/panel/15.png"},
        {id:"clear_back", src:"./img/clear/back.png"},
        {id:"clear_text", src:"./img/clear/text.png"},
  ];

  var loader = new cj.LoadQueue();
  loader.loadManifest(loadManifest);

  function fileloadHandler(event) {
    assets[event.item.id] = event.result;
  }
  function completeHandler(evt) {
    loader.removeEventListener("fileload", fileloadHandler);
    loader.removeEventListener("complete", completeHandler);
    setPanel(window);
  }
  loader.addEventListener("fileload", fileloadHandler);
  loader.addEventListener("complete", completeHandler);
  loader.load();

  startButton.addEventListener("click", startTimer);
  stopButton.addEventListener("click", stopTimer);
  resetButton.addEventListener("click", resetTimer);
  startButton.disabled = false;
}

window.addEventListener("load", function loadHandler(evt) {
  window.removeEventListener("load", loadHandler, false);
  load();
}, false);

function setPanel(window){
  var panel, panel_width;

  canvas = document.getElementById("eight");
  stage_width = window.innerWidth - 60;
  panel_width = stage_width / 3;
  canvas.width = stage_width;
  canvas.height = stage_width;
  stage = new cj.Stage(canvas);

  for (var i = 0; i < 8; i++) {
      panel_positions[i+1] = i+1;
  }
  for (var i = 0; i < 9; i++) {
      positions[i+1] = {x: (i % 3) * panel_width, y: ~~(i / 3) * panel_width};
  }

  for (var i = 0; i < 8 ; i++) {
    panel = new cj.Bitmap(assets[i+1]);
    panel.x = (i % 3) * panel_width;
    panel.y = ~~(i / 3) * panel_width;
    panel.scaleX = stage_width / (panel.image.width * 3.);
    panel.scaleY = stage_width / (panel.image.width * 3.);
    panel.name = i+1;
    panels[i+1] = panel;
    stage.addChild(panel);
    panel.addEventListener('click', clickHandler);
  }

  clear_back = new cj.Bitmap(assets["clear_back"]);
  clear_back.y = - stage_width;
  clear_back.scaleX = stage_width / clear_back.image.width;
  clear_back.scaleY = stage_width / clear_back.image.width;
  clear_back.alpha = 0.7;
  clear_text = new cj.Bitmap(assets["clear_text"]);
  clear_text.scaleX = stage_width / (clear_text.image.width);
  clear_text.y = - (stage_width + clear_text.image.height) / 2.;

  stage.update();

  cj.Ticker.setFPS(60);
  cj.Ticker.addEventListener('tick', tickHandler);
  cj.Ticker.useRAF = true;

  function clickHandler(event) {
    if (timer) {
      movePanel(event.target);
      checkClear();
    }
  }

  function tickHandler(event) {
    stage.update();
  }
}

function movePanel(panel) {
  switch(panel_positions[panel.name]) {
    case 1:
      move(panel, [2, 4]);
      break;
    case 2:
      move(panel, [1, 3, 5]);
      break;
    case 3:
      move(panel, [2, 6]);
      break;
    case 4:
      move(panel, [1, 5, 7]);
      break;
    case 5:
      move(panel, [2, 4, 6, 8]);
      break;
    case 6:
      move(panel, [3, 5, 9]);
      break;
    case 7:
      move(panel, [4, 8]);
      break;
    case 8:
      move(panel, [5, 7, 9]);
      break;
    case 9:
      move(panel, [6, 8]);
      break;
    }
  }

function move(panel, closed_list) {
  var b;
  for (var i = 0; i < closed_list.length; i++) {
    b = true;
    for (var j = 0; j < 8; j++) {
      if (panel_positions[j+1] == closed_list[i]) {
        b = false;
        break;
      }
    }
    if(b) {
      cj.Tween.get(panel).to(positions[closed_list[i]], 300);
      panel_positions[panel.name] = closed_list[i];
    }
  }
}

function sufflePanels() {
  var rand1, rand2, tmp;
  for (var i = 0; i < 20; i++) {
    rand1 = Math.floor(1 + Math.random() * 8);
    do {
      rand2 = Math.floor(1 + Math.random() * 8);
    } while (rand1 == rand2);
    tmp = panel_positions[rand1];
    panel_positions[rand1] = panel_positions[rand2];
    panel_positions[rand2] = tmp;
  }
  console.log(panel_positions);
  for (var i = 0; i < 8; i++) {
    cj.Tween.get(panels[i+1]).to(positions[panel_positions[i+1]]);
  }
}

function setPanelsDefaultPosition() {
  for (var i = 0; i < 8; i++) {
    panel_positions[i+1] = i+1;
    cj.Tween.get(panels[i+1]).to(positions[i+1]);
  }
}

function checkClear() {
  for (var i = 0; i < 8; i++) {
    if (panel_positions[i+1] != i+1) {
      return;
    }
  }
  cj.Tween.get(clear_back).to({x: 0, y: 0}, 500);
  cj.Tween.get(clear_text).to({x: 0, y: (stage_width - clear_text.image.height) / 2}, 500);
  stage.addChild(clear_back);
  stage.addChild(clear_text);
  clear = true;
  clearInterval(timer);
  startButton.disabled = false;
}

function resetClearView() {
  stage.removeChild(clear_back);
  stage.removeChild(clear_text);
  clear_back.y = - stage_width;
  clear_text.y = - (stage_width + clear_text.image.height) / 2.;
}

function startTimer() {
  startButton.disabled = true;
  if (clear) {
    count = 0;
    resetClearView();
    sufflePanels();
  }
  timer = setInterval("countTime()", 10);
  clear = false;
}

function countTime() {
  count += 1;
  second = (count < 1000) ? "0" + parseInt(count / 100, 10) : parseInt(count / 100, 10);
  msecond = (count % 100 < 10) ? "0" + count % 100 : count % 100;
  document.getElementById("timer").innerHTML = second + ":" + msecond;
}

function stopTimer() {
  startButton.disabled = false;
  clearInterval(timer);
  timer = false;
}

function resetTimer() {
  startButton.disabled = false;
  resetClearView();
  clearInterval(timer);
  setPanelsDefaultPosition();
  count = 0;
  clear = true;
  timer = false;
  document.getElementById("timer").innerHTML = "00:00";
}












