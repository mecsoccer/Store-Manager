const token = sessionStorage.getItem('token');
const cartQuantity = document.querySelector('.cart-qty');
const cartTotal = document.querySelector('.cart-total');
const seachBar = document.querySelector('.search-bar');
const globalCart = [];
const nameIdDict = {};
let productStore;

function displayProducts(productArray) {
  const oldList = document.querySelectorAll('.product');
  const productList = document.querySelector('table');

  oldList.forEach((element) => {
    element.remove();
  });

  productArray.forEach((product) => {
    nameIdDict[product.productname] = product.id;
    const tableRow = document.createElement('tr');
    tableRow.className = 'product align-left bold txt-ash-black';

    tableRow.innerHTML = `
            <td class="left-end-major fourteen"><input class="fourteen no-margin" type="checkbox" value="${product.productname}" name="${product.productname}">${product.productname}</td>
            <td class="fourteen fifteen-percent align-center" id="price">${product.price}</td>
            <td class="ten-percent left-padding-10"><span class="qty fourteen">1</span><img class="delta-up" src="./image/storemanager/increase.svg"><img class="delta-down" src="./image/storemanager/reduce.svg"></td>
        `;

    productList.appendChild(tableRow);
  });
}

function addButtonListeners() {
  const productRow = document.querySelectorAll('.product');

  productRow.forEach((element) => {
    const add = element.querySelector('.delta-up');
    const minus = element.querySelector('.delta-down');
    const quantity = element.querySelector('.qty');
    const unitPrice = element.querySelector('#price').innerHTML;
    const productPrice = element.querySelector('#price');
    const check = element.querySelector('input');

    check.addEventListener('click', () => {
      const total = cartTotal.innerText.slice(1);

      if (check.checked) {
        cartQuantity.innerText = Number(cartQuantity.innerText) + 1;
        const totalPrice = Number(total) + Number(productPrice.innerText);
        cartTotal.innerText = `$${totalPrice}`;
        globalCart.push(element);
      } else {
        const totalPrice = Number(total) - Number(productPrice.innerHTML);
        cartTotal.innerText = `$${totalPrice}`;
        cartQuantity.innerText = Number(cartQuantity.innerText) - Number(quantity.innerHTML);
        productPrice.innerHTML = unitPrice;
        quantity.innerHTML = '1';
        const cartIndex = globalCart.indexOf(element);
        globalCart.splice(cartIndex, 1);
      }
    });

    add.addEventListener('click', () => {
      const total = cartTotal.innerText.slice(1);

      if (check.checked === false) return;
      quantity.innerHTML = Number(quantity.innerHTML) + 1;
      productPrice.innerHTML = Number(productPrice.innerHTML) + Number(unitPrice);
      cartQuantity.innerText = Number(cartQuantity.innerText) + 1;
      const totalPrice = Number(total) + Number(unitPrice);
      cartTotal.innerText = `$${totalPrice}`;
    });

    minus.addEventListener('click', () => {
      const total = cartTotal.innerText.slice(1);

      if (check.checked === false) return;
      if (quantity.innerHTML === '1') return;
      quantity.innerHTML = Number(quantity.innerHTML) - 1;
      productPrice.innerHTML = Number(productPrice.innerHTML) - Number(unitPrice);
      cartQuantity.innerText = Number(cartQuantity.innerText) - 1;
      const totalPrice = Number(total) - Number(unitPrice);
      cartTotal.innerText = `$${totalPrice}`;
    });
  });
}


function getProducts() {
  return fetch('https://stark-crag-43885.herokuapp.com/api/v1/products/available', {
    headers: { 'Content-Type': 'application/json', Authorization: token },
    mode: 'cors',
  })
    .then(fetchResponse => fetchResponse.json())
    .then((data) => {
      displayProducts(data.availableProducts);
      productStore = data.availableProducts;
      addButtonListeners();
    })
    .catch((err) => {
      console.log(err);
    });
}

getProducts();

seachBar.addEventListener('keydown', () => {
  const filteredProducts = [];

  productStore.forEach((product) => {
    let userInput = seachBar.value;
    userInput = userInput.toLowerCase();
    const productName = product.productname.toLowerCase();
    if (productName.includes(userInput)) filteredProducts.push(product);
  });

  displayProducts(filteredProducts);
  addButtonListeners();
});


/* show cart contents */
const cartContent = document.querySelector('.cart-svg');

cartContent.addEventListener('click', () => {
  const oldList = document.querySelectorAll('.product');
  const productList = document.querySelector('table');

  oldList.forEach((element) => {
    element.remove();
  });

  globalCart.forEach((product) => {
    const productName = product.querySelector('input').value;
    const price = product.querySelector('#price').innerHTML;
    const quantity = product.querySelector('.qty').innerHTML;
    const tableRow = document.createElement('tr');
    tableRow.className = 'product align-left';

    tableRow.innerHTML = `
            <td class="left-end-major fourteen"><input class="fourteen no-margin" type="checkbox" value="${productName}" name="${productName}" checked>${productName}</td>
            <td class="fourteen fifteen-percent align-center" id="price">${price}</td>
            <td class="ten-percent left-padding-10"><span class="qty fourteen">${quantity}</span><img class="delta-up" src="increase.svg"><img class="delta-down" src="reduce.svg"></td>
        `;

    productList.appendChild(tableRow);
  });

  addButtonListeners();
});

/* Modal region */
const modal = document.getElementById('myModal');
const modalContinue = document.querySelector('#modal-continue');

modalContinue.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
  window.location.reload();
});

/* place order */
const placeOrder = document.querySelector('#place-order');

placeOrder.addEventListener('click', () => {
  globalCart.forEach((product) => {
    /*      const checkButton = product.querySelector('input').checked;
        if (checkButton === false) continue;  */
    const seller = sessionStorage.getItem('user');
    const productName = product.querySelector('input').value;
    const quantity = product.querySelector('.qty').innerHTML;
    const price = product.querySelector('#price').innerHTML;
    const total = `${String(Number(quantity) * Number(price))}.00`;
    const productId = nameIdDict[productName];

    fetch('https://stark-crag-43885.herokuapp.com/api/v1/sales', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      mode: 'cors',
      body: JSON.stringify({
        seller, productName, quantity, price, total, productId,
      }),
    })
      .then((fetchResponse) => {
        if (fetchResponse.status === 201) {
          modal.style.display = 'block';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
