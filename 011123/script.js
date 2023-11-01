document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("product-form");
    const productList = document.getElementById("product-list");
    const sumTotalButton = document.getElementById("BtnSumarTotal");
    const totalPriceDisplay = document.getElementById("total-price");

    const products = [
        { id: 1, description: "| Manzana", price: 140 },
        { id: 2, description: "| Pera", price: 130 },
        { id: 3, description: "| Asado", price: 5000 },
        { id: 4, description: "| CocaCola", price: 700 },
        { id: 5, description: "| Lechuga", price: 500 }
    ];

    const addedProducts = [];

    productForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const productId = parseInt(document.getElementById("IdProd").value);
        const product = products.find(p => p.id === productId);

        if (product) {
            renderProduct(product);
        } else {
            alert("Ingrese un ID válido (1-5).");
        }

        document.getElementById("IdProd").value = "";
    });

    function renderProduct(product) {
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `${product.id} ${product.description} $${product.price} <button class="delete-btn">ELIMINAR</button>`;

        const deleteBtn = productDiv.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", function () {
            deleteProduct(product);
            productList.removeChild(productDiv);
        });

        productList.appendChild(productDiv);

        addedProducts.push(product);

        updateTotalPrice();
    }

    function deleteProduct(product) {
        const index = addedProducts.findIndex(p => p.id === product.id);
        if (index !== -1) {
            addedProducts.splice(index, 1);
        }

        updateTotalPrice();
    }

    function updateTotalPrice() {
        const total = addedProducts.reduce((acc, product) => acc + product.price, 0);
        totalPriceDisplay.textContent = `Precio Total: $${total}`;
    }

    sumTotalButton.addEventListener("click", function () {
        updateTotalPrice();
    });
});
