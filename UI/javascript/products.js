const allProductTab = document.querySelector('.all-product-tab');
const availableProductTab = document.querySelector('.available-product-tab');
const finishedProductTab = document.querySelector('.finished-product-tab');
const tabs = document.querySelectorAll('.tab');
const categorySelectElement = document.querySelector('select');
const categories = [];
let products;

class Products {
  constructor(category, query = '') {
    this.url = `https://stark-crag-43885.herokuapp.com/api/v1/products${query}`;
    this.category = category;
    this.categoryProducts = [];
    this.categoryShowing = false;
    this.productsLoaded = false;
  }

  getProducts() {
    const token = sessionStorage.getItem('token');
    return fetch(this.url, {
      headers: { 'Content-Type': 'application/json', Authorization: token },
      mode: 'cors',
    })
      .then(fetchResponse => fetchResponse.json())
      .then((data) => {
        // displayProducts(data.products);
        products = data.allProducts || data.availableProducts || data.finishedProducts;
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCategories(allProductArray, categoriesArray) {
    allProductArray.forEach((product) => {
      if (!categoriesArray.includes(product.category)) {
        categoriesArray.push(product.category);
      }
    });
    return categoriesArray;
  }

  displayCategories(categoryArray) {
    const categorySelect = document.querySelector('select');
    categoryArray.forEach((category) => {
      const categoryOption = document.createElement('option');
      categoryOption.innerHTML = category;
      categorySelect.appendChild(categoryOption);
    });
  }

  getCategoryProducts(productsArray, category) {
    if (category === 'choose category') return products;
    productsArray.forEach((product) => {
      if (product.category === category) {
        this.categoryProducts.push(product);
      }
    });
    return this.categoryProducts;
  }

  display(productArray) {
    const productTable = document.querySelector('table');
    productArray.forEach((product) => {
      const tableRow = document.createElement('tr');
      tableRow.className = 'product align-left bold fourteen txt-ash-black';
      tableRow.innerHTML = `
                <td class="left-end-major">${product.name}</td>
                <td class="fifteen-percent align-center">${product.price}</td>
                <td class="ten-percent align-center">${product.quantityleft}</td>
            `;
      productTable.appendChild(tableRow);
    });
  }

  clearTable() {
    return new Promise((resolve, reject) => {
      const tableHead = document.querySelector('tr');
      document.querySelector('table').innerHTML = '';
      resolve(tableHead);
    });
  }
}

const allProducts = new Products('all');
allProducts.getProducts()
  .then((data) => {
    allProducts.display(data);
    const categoryList = allProducts.getCategories(products, categories);
    allProducts.displayCategories(categoryList);
  })
  .catch((err) => {
    console.log(err);
  });

// -------------------Event Listeners--------------------

function removeTabFocus(tabsNodeList, className) {
  tabsNodeList.forEach((tab) => {
    if (tab.classList.contains(className)) {
      tab.classList.remove(className);
    }
  });
}

function generateAvailability(elementInnerText) {
  let query;
  switch (elementInnerText.toLowerCase()) {
    case 'all':
      query = '';
      break;
    case 'available':
      query = '/available';
      break;
    case 'finished':
      query = '/finished';
      break;
    default:
      break;
  }
  return query;
}

function showTabProducts() {
  const categorySelected = categorySelectElement.value;
  const tabSelected = document.querySelector('.tab-main').innerText;
  const newProducts = new Products(categorySelected, generateAvailability(tabSelected));
  newProducts.getProducts()
    .then((data) => {
      newProducts.clearTable()
        .then((node) => {
          document.querySelector('table').appendChild(node);
        })
        .catch(() => {
          console.log('error occured');
        });
      return data;
    })
    .then((data) => {
      newProducts.display(newProducts.getCategoryProducts(products, categorySelected));
    })
    .catch((err) => {
      console.log(err);
    });
}

tabs.forEach((tab) => {
  tab.addEventListener('click', (event) => {
    removeTabFocus(tabs, 'tab-main');
    event.target.classList.add('tab-main');

    showTabProducts();
  });
});

categorySelectElement.addEventListener('change', () => {
  const selectedCategory = categorySelectElement.value;
  const category = new Products(selectedCategory);

  category.clearTable().then((node) => {
    document.querySelector('table').appendChild(node);
    return true;
  })
    .then(() => {
      category.display(category.getCategoryProducts(products, selectedCategory));
    })
    .catch((err) => {
      console.log(err);
    });
});
