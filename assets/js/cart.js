
        let cart = [];

        document.addEventListener('DOMContentLoaded', function() {
            loadCart();
            renderCart();
        });

        function loadCart() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
            }
        }
        
        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        
        function renderCart() {
            const cartItems = document.getElementById('cartItems');
            const emptyCartMessage = document.getElementById('emptyCartMessage');
            const totalContainer = document.getElementById('totalContainer');
            
            const items = cartItems.querySelectorAll('.cart-item');
            items.forEach(item => item.remove());
            
            if (cart.length === 0) {
                emptyCartMessage.style.display = 'block';
                totalContainer.style.display = 'none';
            } else {
                emptyCartMessage.style.display = 'none';
                
                cart.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.setAttribute('data-id', item.id);
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" class="item-image">
                        <div class="item-details">
                            <div class="item-name">${item.name}</div>
                            <div class="item-description">${item.description}</div>
                            <div class="item-price">${item.price} ₽</div>
                            <div class="quantity-controls">
                                <button class="quantity-btn minus" data-id="${item.id}" onclick="changeQuantity(${item.id}, -1)">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <span class="quantity" id="quantity-${item.id}">${item.quantity}</span>
                                <button class="quantity-btn plus" data-id="${item.id}" onclick="changeQuantity(${item.id}, 1)">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    `;
                    cartItems.appendChild(cartItem);
                });
                
                totalContainer.style.display = 'block';
            }
            
            updateCartTotal();
        }
        
        function changeQuantity(itemId, delta) {
            const itemIndex = cart.findIndex(item => item.id === itemId);
            
            if (itemIndex === -1) return;
            
            const newQuantity = cart[itemIndex].quantity + delta;
            
            if (newQuantity < 1) {
                cart.splice(itemIndex, 1);
            } else {
                cart[itemIndex].quantity = newQuantity;
                
                const quantityElement = document.getElementById(`quantity-${itemId}`);
                if (quantityElement) {
                    quantityElement.textContent = newQuantity;
                }
            }
            
            saveCart();
            
            if (newQuantity < 1) {
                renderCart();
            } else {
                updateCartTotal();
            }
        }
        
        function updateCartTotal() {
            let subtotal = 0;
            
            cart.forEach(item => {
                subtotal += item.price * item.quantity;
            });
            
            const subtotalElement = document.getElementById('subtotal');
            const totalElement = document.getElementById('total');
            
            if (subtotalElement && totalElement) {
                subtotalElement.textContent = subtotal.toLocaleString('ru-RU') + ' ₽';
                totalElement.textContent = subtotal.toLocaleString('ru-RU') + ' ₽';
            }
        }
        
        function updateQuantity(itemId, change) {
            changeQuantity(itemId, change);
        }