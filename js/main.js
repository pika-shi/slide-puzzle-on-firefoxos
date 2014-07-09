var assets = {};

function load() {
  var cj = createjs;

  var loadManifest = [
        {id:"1", src:"./img/panel/1.png"},
        {id:"2", src:"./img/panel/2.png"},
        {id:"3", src:"./img/panel/3.png"},
        {id:"4", src:"./img/panel/4.png"},
        {id:"5", src:"./img/panel/5.png"},
        {id:"6", src:"./img/panel/6.png"},
        {id:"7", src:"./img/panel/7.png"},
        {id:"8", src:"./img/panel/8.png"},
        {id:"9", src:"./img/panel/9.png"},
        {id:"10", src:"./img/panel/10.png"},
        {id:"11", src:"./img/panel/11.png"},
        {id:"12", src:"./img/panel/12.png"},
        {id:"13", src:"./img/panel/13.png"},
        {id:"14", src:"./img/panel/14.png"},
        {id:"15", src:"./img/panel/15.png"},
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
  var cj = createjs, canvas, stage;
  canvas = document.getElementById("eight");
  stage = new cj.Stage(canvas);
  if (cj.Touch.isSupported()) {
    cj.Touch.enable(stage);
  }

  bitmap = new cj.Bitmap('http://blog.asial.co.jp/image/user_image_m/22.png');
  console.log(assets["1"]);
  bitmap.y = 50;
  bitmap.x = 50;
  bitmap.scaleX = 0;
  bitmap.scaleY = 0;
  bitmap.alpha = 0;

  stage.addChild(bitmap);

  stage.update();

  cj.Ticker.setFPS(60);
  cj.Ticker.addEventListener('tick', tickHandler);

  stage.update();

  cj.Tween.get(bitmap, {loop: true}).to({alpha: 1, scaleX: 2, scaleY: 2}, 1000).wait(1000).to({alpha: 0, scaleX: 0, scaleY: 0}, 1000).wait(1000);

  function tickHandler(event) {
    stage.update();
  }
}
