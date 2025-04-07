`use strict`

const listProduct = document.getElementById("mainList");

let products = Array.from(listProduct.children).map(li => {
    const div = li.querySelector(".item");
    return {
        id: div.querySelector(".id").textContent,
        name: div.querySelector(".name").textContent,
        cost: div.querySelector(".cost").textContent,
        category: div.querySelector(".category").textContent,
        image: div.querySelector(".img").src,
        btnDelete: div.querySelector(".btnDelete").button,
        btnEdit: div.querySelector(".btnEdit").button
    };
});

function renderList() { //оновити list в HTML
    listProduct.innerHTML = "";
    products.forEach(item => {
        const li = document.createElement("li");
        const div = document.createElement("div");
        div.classList.add("item");

        const id = document.createElement("span");
        id.classList.add("id")
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
