let cartLi = document.querySelector(".cart");
let cartLink = cartLi.querySelector("a");
let message = cartLi.querySelector(".message");
let cartContainer = document.getElementById("cart-container");
let cartItemsList = document.getElementById("cart-items");
let cartTotal = document.getElementById("cart-total");
let checkoutBtn = document.getElementById("checkout-btn");
const modal = document.getElementById("modal");
const submitOrder = document.getElementById("submitOrder");
const closeModal = document.getElementById("closeModal");


let cartItems = [];

// Atualiza o carrinho
// Atualiza o carrinho
function updateCart() {
    cartItemsList.innerHTML = "";

    if (cartItems.length === 0) {
        cartContainer.style.display = "none";
        message.style.display = "block"; // Mostra mensagem de carrinho vazio
        cartTotal.textContent = "";
        return;
    } else {
        message.style.display = "none";
        cartContainer.style.display = "block";
    }

    let total = 0;

    cartItems.forEach(item => {
        let li = document.createElement("li");

        // span para o texto do item
        let nameSpan = document.createElement("span");
        nameSpan.textContent = `${item.name}`;
        nameSpan.classList.add("item-name");

        let priceSpan= document.createElement("span");
        priceSpan.textContent = `R$ ${item.price}`;
        priceSpan.classList.add("item-price");
        

        // botão de remover
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.classList.add("remove-btn");
        removeBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // evita clique duplicado
            cartItems = cartItems.filter(i => i !== item); // remove item
            updateCart();
        });

        li.appendChild(nameSpan);
        li.appendChild(priceSpan);
        li.appendChild(removeBtn);
        cartItemsList.appendChild(li);
        

        total += parseFloat(item.price.toString().replace(",", "."));
    });

    cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

    
// Clique no ícone do carrinho
cartLink.addEventListener("click", function (e) {
    e.preventDefault();
    if (cartItems.length === 0) {
        // alterna message se carrinho vazio
        message.style.display = message.style.display === "block" ? "none" : "block";
    } else {
        // alterna visibilidade do carrinho quando tem itens
        cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
    }
});

// Adicionar itens ao carrinho
let products = document.querySelectorAll(".pizza-hot, .normal-pizza, .candy-pizza, .drink");
products.forEach(prod => {
    prod.addEventListener("click", () => {
        let name = prod.dataset.name;
        let price = prod.dataset.price;

        cartItems.push({ name, price });

        updateCart();
        cartContainer.style.display = "block"; // abre carrinho ao adicionar
        cartItemsList.style.padding = "10px";

    });
});

checkoutBtn.addEventListener("click", () => {
    if (cartItems.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    modal.classList.add("show");
});

closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});

submitOrder.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    if (!name || !address || !phone) {
        alert("Por favor, verifique seus dados novamente!");
        return;
    }

    let summary = `Pedido por ${name}\nEndereço: ${address}\nTelefone: ${phone}\n\nItens:\n`;
    let total = 0

    cartItems.forEach(item => {
        const price = parseFloat(item.price.toString().replace(",", "."));
        const emoji = ["Coca-cola", "Guaraná", "Fanta Laranja"].includes(item.name) ? "🥤" : "🍕";
        summary += `${emoji} ${item.name} - R$ ${item.price}\n`;
        total += price;

    })
    summary += `\nTotal: R$ ${total.toFixed(2)}`
    alert("Pedido realizado!\n\n" + summary);

    cartItems = []; // limpa carrinho
    updateCart();
    modal.classList.remove("show");
});

// Fechar modal clicando fora
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});


