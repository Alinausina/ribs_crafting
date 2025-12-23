// cart.js
let cart = [];

// Загрузка корзины из localStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
});

// Функция добавления товара в корзину
function addToCart(id, name, price, image, description, weight) {
    // Проверяем, есть ли уже такой товар в корзине
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex > -1) {
        // Увеличиваем количество существующего товара
        cart[existingItemIndex].quantity += 1;
    } else {
        // Добавляем новый товар
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            description: description,
            weight: weight,
            quantity: 1
        });
    }
    
    // Обновляем счетчик и сохраняем в localStorage
    updateCartCount();
    saveCartToLocalStorage();
    
    // Анимация кнопки корзины
    try {
        // Пытаемся получить event из глобальной переменной
        const event = window.currentEvent || (typeof event !== 'undefined' ? event : null);
        if (event && event.currentTarget) {
            const cartBtn = event.currentTarget;
            cartBtn.classList.add('cart-added');
            setTimeout(() => {
                cartBtn.classList.remove('cart-added');
            }, 500);
        }
        // Очищаем глобальную переменную
        window.currentEvent = null;
    } catch (e) {
        console.log('Анимация не выполнена:', e);
    }
}

// Функция обновления счетчика товаров в корзине
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Функция сохранения корзины в localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Экспортируем функцию для использования на странице корзины
window.getCartData = function() {
    return cart;
};

window.saveCartToLocalStorage = saveCartToLocalStorage;
window.updateCartCount = updateCartCount;