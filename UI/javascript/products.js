const tabs = document.querySelectorAll('.tab');
const categorySelectElement = document.querySelector('select');
const categories = [];
let products;

class Products {
  constructor(category, query = '') {
    this.url = `https://stark-crag-43885.herokuapp.com/api/v1/products${query}`;
    this.category = category;
    this.categories = [];
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
        products = data.allProducts || data.availableProducts || data.finishedProducts;
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCategories(allProductArray, categoriesArray) {
    allProductArray.forEach((product) => {
      if (!categoriesArray.includes(product.productcategory)) {
        categoriesArray.push(product.productcategory);
      }
    });
    this.categories = categoriesArray;
    return categoriesArray;
  }

  displayCategories(categoryArray) {
    const categorySelect = document.querySelector('select');
    categoryArray.forEach((category) => {
      const categoryOption = document.createElement('option');
      categoryOption.innerHTML = category;
      categorySelect.appendChild(categoryOption);
    });
    this.categoryShowing = true;
  }

  getCategoryProducts(productsArray, category) {
    if (category === 'choose category') return products;
    productsArray.forEach((product) => {
      if (product.productcategory === category) {
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
                <td class="left-end-major">${product.productname}</td>
                <td class="fifteen-percent align-center">${product.price}</td>
                <td class="ten-percent align-center">${product.quantityleft}</td>
            `;
      productTable.appendChild(tableRow);
    });
    this.productsLoaded = true;
  }

  clearTable() {
    return new Promise((resolve) => {
      const tableHead = document.querySelector('tr');
      document.querySelector('table').innerHTML = '';
      this.tableHead = tableHead;
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
    .then(() => {
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
