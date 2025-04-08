`use strict`

const listProduct = document.getElementById("mainList");

let products = Array.from(listProduct.children).map(li => {
    const div = li.querySelector(".product-item");
    return {
        id: div.querySelector(".product-id").textContent,
        name: div.querySelector(".product-name").textContent,
        cost: div.querySelector(".product-price").textContent,
        category: div.querySelector(".product-category").textContent,
        image: div.querySelector("img").src,
    };
});

console.log(products);

products[0].id = 5;

console.log(products);


function renderList() { //оновити list в HTML
    listProduct.innerHTML = "";
    products.forEach(item => {
        const li = document.createElement("li");
        const div = document.createElement("div");
        div.classList.add("product-item");

        const id = document.createElement("span");
        id.classList.add("product-id")
        id.textContent = item.id;

        const name = document.createElement("span");
        name.classList.add("product-name")
        name.textContent = item.name;

        const cost = document.createElement("span");
        cost.classList.add("product-price")
        cost.textContent = item.cost;

        const category = document.createElement("span");
        category.classList.add("product-category")
        category.textContent = item.category;

        const image = document.createElement("img");
        image.classList.add("product-image");
        image.src = item.image;
        image.alt = "image";

        const btnDelete = document.createElement("button");
        btnDelete.classList.add("btnDelete");
        //подописувати, що треба

        const btnEdit = document.createElement("button");
        btnEdit.classList.add("btnEdit");
        //подописувати, що треба

        div.appendChild(id);
        div.appendChild(name);
        div.appendChild(cost);
        div.appendChild(category);
        div.appendChild(image);
        div.appendChild(btnDelete);
        div.appendChild(btnEdit);

        li.appendChild(div);
        listProduct.appendChild(li);
    })
}

function generateId(){
    return products.length;
}

function addProduct() {
    let div = document.getElementById("modal");
    div.style.display = "block";
}

function saveProduct(){
    let div = document.querySelector("#modal");
    let newProduct = {
        id: div.querySelector("#product-id").value.trim(),
        name: div.querySelector("#product-name").value.trim(),
        price: div.querySelector("#product-price").value.trim(),
        category: div.querySelector("#product-category").value.trim(),
        image: "./images/img.png",
    };

    products.push(newProduct);

    renderList();
    // оновити фільтри
    // оновити ціну
    div.style.display = "none";
}

function closeProduct(){
    let div = document.getElementById("modal");
    div.style.display = "none";
}
