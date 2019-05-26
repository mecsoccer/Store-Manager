/* menu */
const menuButton = document.querySelector('.menu-button');
const sideBar = document.querySelector('.side-bar');
const main = document.querySelector('.main');

/* event listeners */
menuButton.addEventListener('click', (e) => {
  sideBar.classList.toggle('open');
  e.stopPropagation();
});

main.addEventListener('click', () => {
  sideBar.classList.remove('open');
});
