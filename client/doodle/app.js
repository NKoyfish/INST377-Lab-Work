document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const doodler = document.createdElement('div');
  const doodlerLeftSpace = 50;
  const doodlerBottomSpace = 150;
  function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add('doodler');
    doodler.style.left = `${doodlerLeftSpace}px`;
    doodler.style.bottom = `${doodlerBottomSpace}px`;
  }

  function start() {
    if (!isGameOver) {
      createDoodler();
    }
  }
  start();
});
