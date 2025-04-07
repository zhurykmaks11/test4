`use strict`

const listProduct = document.getElementById("mainList");

let products = Array.from(listProduct.children).map(li => {
    const div = li.querySelector(".product-item");
    return {
        id: div.querySelector(".product-id").textContent,
        name: div.querySelector(".product-name").textContent,
        cost: div.querySelector(".product-price").textContent,
        category: div.querySelector(".product-category").textContent,
        image: div.querySelector(".product-img").src,
    };
});

function renderList() { //оновити list в HTML
    listProduct.innerHTML = "";
    products.forEach(item => {
        const li = document.createElement("li");
        const div = document.createElement("div");
        div.classList.add("item");

        const id = document.createElement("span");
        id.classList.add("product-id")
        id.textContent = item.id;

        const name = document.createElement("span");
        name.classList.add("name")
        name.textContent = item.name;

        const cost = document.createElement("span");
        cost.classList.add("cost")
        cost.textContent = item.cost;

        const category = document.createElement("span");
        category.classList.add("category")
        category.textContent = item.category;

        const image = document.createElement("img");
        image.classList.add("img");
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

function addProduct(productData) {
    const newProduct = {
        id: generateId(),
        name: productData.name,
        price: productData.price,
        category: productData.category,
        image: productData.image,
    };

    products = products.push(newProduct);

    renderList();
    // оновити список на ui
    // оновити фільтри
    // оновити ціну

    return newProduct;

}
