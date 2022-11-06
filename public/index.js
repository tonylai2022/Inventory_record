fetchData();

document.querySelector("#createItem").addEventListener("submit", async (e) => {
    e.preventDefault();
    const body = {
        asin: e.target.asin.value,
        stock: Number(e.target.stock.value),
        price: Number(e.target.price.value)
    }

    e.target.asin.value = ""
    e.target.stock.value = ""
    e.target.price.value = ""

    await sendDataToAPI("POST", body);
})


async function fetchData() {
    const res = await fetch('/inventory');
    const items = await res.json();
    document.querySelector("#inventory").innerHTML = "";
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        document.querySelector("#inventory").innerHTML += `
        <div data-itemid=${item.ID}>
        <span>Item #${i + 1}</span>
        <input type="text" placeholder="Item asin" class="asin" value="${item.asin}">
        <input type="number" placeholder="Item stock (i.e. quantity)" class="stock" value="${item.stock}" max="2147483647" min="0">
        <input type="number" placeholder="Item price" class="price" value="${item.price}" max="2147483647" min="0">
        <input type="button" class="edit" value="edit">
        <input type="button" class="delete" value="delete">
        </div>        
        `
    }

    document.querySelectorAll(".edit").forEach(element => element.addEventListener("click", (e) => {
        const item = e.target.parentElement;
        const body = {
            ID: Number(item.dataset.itemid),
            asin: item.querySelector(".asin").value,
            stock: Number(item.querySelector(".stock").value),
            price: Number(item.querySelector(".price").value)
        }
        sendDataToAPI("PUT", body);
    }));

    document.querySelectorAll(".delete").forEach(element => element.addEventListener("click", (e) => {
        const item = e.target.parentElement;
        const body = {
            ID: Number(item.dataset.itemid)
        }
        sendDataToAPI("DELETE", body);
    }));
}

async function sendDataToAPI(method, bodyContent) {
    const res = await fetch('/inventory', {
        method,
        body: JSON.stringify(bodyContent),
        headers: { 'Content-Type': 'application/json' }
    });

    await fetchData();
}