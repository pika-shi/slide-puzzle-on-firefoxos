document.querySelector('#startButton').addEventListener ('click', function () {
  document.querySelector('#puzzle').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#backButton').addEventListener ('click', function () {
  document.querySelector('#puzzle').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});
