// for the menu icon
const menu = document.querySelector('.menu');
const main = document.querySelector('.content');
const nav = document.querySelector('.nav-bar');

menu.addEventListener('click', (e) => {
  nav.classList.toggle('open');
  e.stopPropagation();
});

main.addEventListener('click', () => {
  nav.classList.remove('open');
});
