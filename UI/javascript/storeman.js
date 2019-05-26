// sign out
const signOut = document.querySelector('#sign-out');

signOut.addEventListener('click', () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  window.location.assign('./login.html');
});

// menu buttons
const menuButton = document.querySelector('.menu-button');
const menuButton2 = document.querySelector('.menu-button-2');
const sideBar = document.querySelector('.side-bar');
const backArrow = document.querySelector('.back-arrow');
const container = document.querySelector('.container');

menuButton.addEventListener('click', (e) => {
  sideBar.classList.toggle('close');
  e.stopPropagation();
});

menuButton2.addEventListener('click', () => {
  sideBar.classList.toggle('open');
  container.classList.toggle('open');
});

backArrow.addEventListener('click', () => {
  sideBar.classList.toggle('close');
});
