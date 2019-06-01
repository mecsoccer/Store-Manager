// accordion
const accordion = document.querySelectorAll('.accordion');

accordion.forEach((acc) => {
  acc.onclick = (e) => {
    e.target.classList.toggle('active');
    e.target.nextElementSibling.classList.toggle('show');
  };
});

/* Modal region */
const modal = document.getElementById('myModal');
const modalCloseBtn = document.querySelectorAll('.modal-close-btn');
const allForms = document.querySelectorAll('.sign-up');

modalCloseBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.style.display = 'none';
    allForms.forEach((form) => {
      form.style.display = 'none';
    });
  });
});

// products accordion buttons
const addProductBtn = document.querySelector('.add-product-btn');
const updateProductBtn = document.querySelector('.update-product-btn');
const deleteProductBtn = document.querySelector('.delete-product-btn');
const addProductForm = document.querySelector('.add-product-form');
const updateProductForm = document.querySelector('.update-product-form');
const deleteProductForm = document.querySelector('.delete-product-form');

addProductBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  addProductForm.style.display = 'block';
});

updateProductBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  updateProductForm.style.display = 'block';
});

deleteProductBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  deleteProductForm.style.display = 'block';
});

// users accordion buttons
const addUserBtn = document.querySelector('.add-user-btn');
const updateUserBtn = document.querySelector('.update-user-btn');
const deleteUserBtn = document.querySelector('.delete-user-btn');
const adminRightsBtn = document.querySelector('.admin-rights-btn');
const addUserForm = document.querySelector('.add-user-form');
const updateUserForm = document.querySelector('.update-user-form');
const deleteUserForm = document.querySelector('.delete-user-form');
const adminRightsForm = document.querySelector('.admin-rights-form');

addUserBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  addUserForm.style.display = 'block';
});

updateUserBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  updateUserForm.style.display = 'block';
});

deleteUserBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  deleteUserForm.style.display = 'block';
});

adminRightsBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  adminRightsForm.style.display = 'block';
});
