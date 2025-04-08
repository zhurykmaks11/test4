`use strict`

const listProduct = document.getElementById("mainList");

let products = Array.from(listProduct.children).map(li => {
    return {
        id: li.querySelector(".product-id").textContent,
        name: li.querySelector(".product-name").textContent,
        cost: li.querySelector(".product-price").textContent,
        category: li.querySelector(".product-category").textContent,
        image: li.querySelector("img").src,
    };
});

function renderList() { //оновити list в HTML
    listProduct.innerHTML = "";
    products.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("product-item");

        const id = document.createElement("span");
        id.classList.add("product-id")
        id.textContent = "ID: " + item.id;


        const name = document.createElement("span");
        name.classList.add("product-name")
        name.textContent = "Name: " + item.name;

        const cost = document.createElement("span");
        cost.classList.add("product-price")
        cost.textContent = "Cost: " + item.cost;

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
}

function addProduct() {
    let div = document.getElementById("modal-add");
    div.style.display = "block";
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

function deleteProduct(id){
    console.log(id);

    const productToDelete = products.find(product => product.id === id);

    if (!productToDelete) return null;

    products = products.filter(product => product.id !== id);
    // оновити фільтри
    // оновити ціну

    renderList();
}

function editProduct(id){
    console.log(id);
    //дописати функціонал зміни
    const productToEdit = products.filter(product => product.id === id);

    let div = document.getElementById("modal-edit");
    div.style.display = "block";

    let btnSave = document.createElement("button");
    btnSave.classList.add(".save-product");
    btnSave.innerHTML = "Зберегти";
    btnSave.onclick = () => saveEditedProduct(id);

    let btnClose = document.createElement("button");
    btnClose.classList.add(".close-modal");
    btnClose.innerHTML = "Зберегти";
    btnClose.onclick = () => closeEditProduct();

    // оновити фільтри
    // оновити ціну
    renderList();
}

function saveProduct(){
    let div = document.querySelector("#modal-add");
    let newProduct = {
        id: generateId(),
        name: div.querySelector(".product-name").value.trim(),
        price: div.querySelector(".product-price").value.trim(),
        category: div.querySelector(".product-category").value.trim(),
        image: "./images/img.png",
    };

    products.push(newProduct);

    renderList();
    // оновити фільтри
    // оновити ціну
    div.style.display = "none";
}

function closeProduct(){
    let div = document.getElementById("modal-add");
    div.style.display = "none";
}
