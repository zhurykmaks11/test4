`use strict`

const listProduct = document.getElementById("mainList");
let filteredProducts = [];
let products = Array.from(listProduct.children).map(li => {
    return {
        id: li.querySelector(".product-id").textContent,
        name: li.querySelector(".product-name").textContent,
        cost: li.querySelector(".product-price").textContent,
        category: li.querySelector(".product-category").textContent,
        image: li.querySelector("img").src,
    };

    filteredProducts = [...products];
    renderAll()
});

function renderList() { //оновити list в HTML
    listProduct.innerHTML = "";
    filteredProducts.forEach(item =>  {
        const li = document.createElement("li");
        li.classList.add("product-item", "animate-in");

        const id = document.createElement("span");
        id.classList.add("product-id")
        id.textContent = "ID: " + item.id;


        const name = document.createElement("span");
        name.classList.add("product-name")
        name.textContent = "Name: " + item.name;

        const cost = document.createElement("span");
        cost.classList.add("product-price")
        cost.textContent = "Cost: " + item.price;

        const category = document.createElement("span");
        category.classList.add("product-category")
        category.textContent = "Category: " + item.category;

        const image = document.createElement("img");
        image.classList.add("product-image");
        image.src = item.image;
        image.alt = "image";

        const btnDelete = document.createElement("button");
        btnDelete.classList.add("delete-button");
        btnDelete.innerHTML = "Видалити"
        btnDelete.onclick = () => deleteProduct(item.id);

        const btnEdit = document.createElement("button");
        btnEdit.classList.add("edit-button");
        btnEdit.innerHTML = "Редагувати"
        btnEdit.onclick = () => editProduct(item.id);


        li.appendChild(id);
        li.appendChild(name);
        li.appendChild(cost);
        li.appendChild(category);
        li.appendChild(image);
        li.appendChild(btnDelete);
        li.appendChild(btnEdit);
        listProduct.appendChild(li);

    })

    updateTotalCost()
}

function addProduct() {
    let div = document.getElementById("modal-add");
    div.style.display = "block";
    closeEditProduct()
}

function generateId(){
    let step = 0;
    let isAvailable = true;

    while (isAvailable) {
        isAvailable = false;
        products.forEach(product => {
            if (product.id === step.toString()) {
                isAvailable = true;
            }
        })
        ++step;
    }
    --step;

    return step.toString();
}

function myFunction() {
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function myFunctionedit() {
    var x = document.getElementById("snackbar1");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
//delete
function deleteProduct(id){
    // console.log(id);
    //
    // const productToDelete = products.find(product => product.id === id);
    //
    // if (!productToDelete) return null;
    //
    // products = products.filter(product => product.id !== id);
    // // оновити фільтри
    // // оновити ціну
    filteredProducts = [...products];
    const index = products.findIndex(product => product.id === id);
    if (index === -1) return;

    const liToRemove = [...listProduct.children].find(
        li => li.querySelector(".product-id").textContent.includes(id)
    );

    if (liToRemove) {
        liToRemove.classList.remove("animate-in");
        liToRemove.classList.add("animate-out");

        setTimeout(() => {
            products.splice(index, 1);
            filteredProducts = [...products];
            renderAll();
            renderList();
        }, 400);
    }
    myFunction()
    renderAll()
    renderList();
    closeEditProduct()
}
//edit
function editProduct(productId){
    let div = document.getElementById("modal-edit");
    div.style.display = "block";

    let btnSave = div.querySelector(".save-product")
    btnSave.onclick = () => saveEditedProduct(productId);

    let btnClose = div.querySelector(".close-modal")
    btnClose.onclick = () => closeEditProduct();

    let productToEdit = products.find(product => product.id === productId);

    let name = div.querySelector(".product-name");
    let price = div.querySelector(".product-price");
    let category = div.querySelector(".product-category");

    name.value = productToEdit.name;
    price.value = productToEdit.price;
    category.value = productToEdit.category;

    // оновити фільтри
    // оновити ціну
    renderList();
}

function saveEditedProduct(productId){
    console.log("ID after: " + productId); //чомусь не передається атрибут productId
    let div = document.querySelector("#modal-edit");
    const name = div.querySelector(".product-name");
    const price = div.querySelector(".product-price");
    const category = div.querySelector(".product-category");

    if (!name.checkValidity() || !price.checkValidity() || !category.checkValidity()) {
        name.reportValidity();
        price.reportValidity();
        category.reportValidity();
        return;
    }
    let editedProduct = {
        id: productId,
        name: div.querySelector(".product-name").value.trim(),
        price: div.querySelector(".product-price").value.trim(),
        category: div.querySelector(".product-category").value.trim(),
        image: "./images/img.png",
    };
    console.log(productId)
    let index = products.findIndex(product => product.id === productId);
    if (index !== -1) {
        products[index] = editedProduct;
    }
    filteredProducts = [...products];
    renderAll()
    renderList();
    myFunctionedit()
    // оновити фільтри
    // оновити ціну
    div.style.display = "none";
}

function closeEditProduct(){
    let div = document.getElementById("modal-edit");
    div.style.display = "none";
}

function saveProduct(){
    let div = document.querySelector("#modal-add");
    const name = div.querySelector(".product-name");
    const price = div.querySelector(".product-price");
    const category = div.querySelector(".product-category");
    if (!name.checkValidity() || !price.checkValidity() || !category.checkValidity()) {
        name.reportValidity();
        price.reportValidity();
        category.reportValidity();
        return;
    }

    let productName =  div.querySelector(".product-name");
    let productPrice = div.querySelector(".product-price")
    let productCategory = div.querySelector(".product-category");

    let newProduct = {
        id: generateId(),
        name: productName.value.trim(),
        price: productPrice.value.trim(),
        category: productCategory.value.trim(),
        image: "./images/img.png",
    };

    products.push(newProduct);
    filteredProducts = [...products];
    renderAll();
    renderList();
    // оновити фільтри
    // оновити ціну
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    div.style.display = "none";
}

function closeProduct(){
    let div = document.getElementById("modal-add");
    div.style.display = "none";
}
//total-cost
function updateTotalCost() {
    const total = products.reduce((sum, p) => sum + parseFloat(p.price), 0);
    document.getElementById("total-cost").textContent = `Загальна вартість: ${total.toFixed(2)} грн`;
}
//filter
function renderFilters() {
    const filtersContainer = document.getElementById("filters");
    filtersContainer.innerHTML = "";

    const uniqueCategories = [...new Set(products.map(p => p.category))];

    uniqueCategories.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.classList.add("btn-filter");
        btn.onclick = () => {
            filteredProducts = products.filter(p => p.category === cat);
            renderList();
        };
        filtersContainer.appendChild(btn);
    });

    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Скинути фільтр";
    resetBtn.classList.add("btn-reset");
    resetBtn.onclick = () => {
        filteredProducts = [...products];
        renderList();
    };
    filtersContainer.appendChild(resetBtn);
}

function renderAll(){
    renderFilters()
    updateTotalCost()
    renderSorters()
}
function renderSorters() {
    const sortersContainer = document.getElementById("sorters");
    sortersContainer.innerHTML = "";

    const btnPrice = document.createElement("button");
    btnPrice.textContent = "Сортувати за ціною";
    btnPrice.classList.add("btn-renPrice");
    btnPrice.onclick = () => {
        filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        renderList();
    };

    const btnCreate = document.createElement("button");
    btnCreate.textContent = "Сортувати за ID";
    btnCreate.classList.add("btn-renID");
    btnCreate.onclick = () => {
        filteredProducts.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        renderList();
    };

    const btnReset = document.createElement("button");
    btnReset.textContent = "Скинути сортування";
    btnReset.classList.add("btn-renReset");
    btnReset.onclick = () => {
        filteredProducts = [...products];
        renderList();
    };

    sortersContainer.appendChild(btnPrice);
    sortersContainer.appendChild(btnCreate);
    sortersContainer.appendChild(btnReset);
}