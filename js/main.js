var assets = {};

function load() {
  var cj = createjs;

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
}

window.addEventListener("load", function loadHandler(evt) {
  window.removeEventListener("load", loadHandler, false);
  load();
}, false);

function setPanel(window){
  var cj = createjs, canvas, stage, stage_width;
  var panels = {}, panel, panel_width;

  canvas = document.getElementById("eight");
  stage_width = window.innerWidth - 60;
  panel_width = stage_width / 3;
  canvas.width = stage_width;
  canvas.height = stage_width;
  stage = new cj.Stage(canvas);
  if (cj.Touch.isSupported()) {
    cj.Touch.enable(stage);
  }

  var panel_positions = {}, positions = {};
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

  stage.update();

  cj.Ticker.setFPS(60);
  cj.Ticker.addEventListener('tick', tickHandler);
  cj.Ticker.useRAF = true;

  function clickHandler(event) {
    movePanel(event.target);
  }

  function tickHandler(event) {
    stage.update();
  }

  function movePanel(panel) {
    console.log(panel.name);
    console.log(panel_positions[panel.name]);
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
        cj.Tween.get(panel).to(positions[closed_list[i]], 400);
        panel_positions[panel.name] = closed_list[i];
        console.log(panel_positions[panel.name]);
        console.log(panel_positions);
      }
    }
  }
}
