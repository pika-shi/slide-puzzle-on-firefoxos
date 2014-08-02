document.querySelector('#startButton').addEventListener ('click', function () {
  document.querySelector('#puzzle').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#recordButton').addEventListener ('click', function () {
  document.querySelector('#record').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#puzzleBackButton').addEventListener ('click', function () {
  document.querySelector('#puzzle').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});
document.querySelector('#recordBackButton').addEventListener ('click', function () {
  document.querySelector('#record').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});
