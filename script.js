      class Product {
            constructor(id, title, price, category, rating, image, description) {
                this.id = id;
                this.title = title;
                this.price = price;
                this.category = category;
                this.rating = rating;
                this.image = image;
                this.description = description;
            }

            getFormattedPrice() {
                return `$${this.price.toFixed(2)}`;
            }

            getRatingStars() {
                const fullStars = Math.floor(this.rating);
                return '⭐'.repeat(fullStars);
            }
        }

        class CartItem {
            constructor(product, quantity = 1) {
                this.product = product;
                this.quantity = quantity;
            }

            getSubtotal() {
                return this.product.price * this.quantity;
            }

            incrementQuantity() {
                this.quantity++;
            }

            decrementQuantity() {
                if (this.quantity > 1) {
                    this.quantity--;
                }
            }
        }

        class ShoppingCart {
            constructor() {
                this.items = [];
            }

            addItem(product) {
                const existingItem = this.items.find(item => item.product.id === product.id);
                if (existingItem) {
                    existingItem.incrementQuantity();
                } else {
                    this.items.push(new CartItem(product));
                }
                this.saveToStorage();
            }

            removeItem(productId) {
                this.items = this.items.filter(item => item.product.id !== productId);
                this.saveToStorage();
            }

            updateQuantity(productId, newQuantity) {
                const item = this.items.find(item => item.product.id === productId);
                if (item) {
                    item.quantity = Math.max(1, newQuantity);
                    this.saveToStorage();
                }
            }

            getTotal() {
                return this.items.reduce((total, item) => total + item.getSubtotal(), 0);
            }

            getTotalItems() {
                return this.items.reduce((total, item) => total + item.quantity, 0);
            }

            clear() {
                this.items = [];
                this.saveToStorage();
            }

            saveToStorage() {
                // Note: localStorage would throw SecurityError in sandbox
                // Using in-memory storage instead
                window.cartData = this.items;
            }

            loadFromStorage() {
                // Loading from in-memory storage
                if (window.cartData) {
                    this.items = window.cartData;
                }
            }
        }

        class ProductService {
            constructor() {
                this.products = [];
                this.categories = new Set();
            }

            // Simulating API call with Promise
            async fetchProducts() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        try {
                            const mockProducts = this.generateMockProducts();
                            resolve(mockProducts);
                        } catch (error) {
                            reject(error);
                        }
                    }, 1000);
                });
            }

            generateMockProducts() {
                const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];
                const products = [];

                const productNames = {
                    'Electronics': ['Laptop', 'Smartphone', 'Headphones', 'Smart Watch', 'Tablet'],
                    'Clothing': ['T-Shirt', 'Jeans', 'Jacket', 'Sneakers', 'Dress'],
                    'Books': ['Fiction Novel', 'Programming Guide', 'Cookbook', 'Biography', 'Science Book'],
                    'Home': ['Coffee Maker', 'Lamp', 'Cushion', 'Wall Art', 'Plant Pot'],
                    'Sports': ['Yoga Mat', 'Dumbbells', 'Running Shoes', 'Tennis Racket', 'Bicycle']
                };

                const productImages = {
                    'Electronics': [
                        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
                        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
                        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
                        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
                        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'
                    ],
                    'Clothing': [
                        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
                        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
                        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
                        'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400',
                        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'
                    ],
                    'Books': [
                        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
                        'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
                        'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400',
                        'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400',
                        'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400'
                    ],
                    'Home': [
                        'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
                        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
                        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
                        'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400',
                        'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400'
                    ],
                    'Sports': [
                        'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
                        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
                        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
                        'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
                        'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400'
                    ]
                };

                let id = 1;
                categories.forEach(category => {
                    productNames[category].forEach((name, index) => {
                        products.push(new Product(
                            id++,
                            `${name} - Premium Quality`,
                            Math.floor(Math.random() * 500) + 20,
                            category,
                            (Math.random() * 2 + 3).toFixed(1),
                            productImages[category][index],
                            `High-quality ${name.toLowerCase()} with excellent features and durability. Perfect for everyday use.`
                        ));
                    });
                });

                return products;
            }

            async loadProducts() {
                try {
                    this.products = await this.fetchProducts();
                    this.categories = new Set(this.products.map(p => p.category));
                    return this.products;
                } catch (error) {
                    console.error('Error loading products:', error);
                    throw error;
                }
            }

            filterByCategory(category) {
                if (category === 'all') return this.products;
                return this.products.filter(p => p.category === category);
            }

            searchProducts(query) {
                const lowerQuery = query.toLowerCase();
                return this.products.filter(p => 
                    p.title.toLowerCase().includes(lowerQuery) ||
                    p.category.toLowerCase().includes(lowerQuery) ||
                    p.description.toLowerCase().includes(lowerQuery)
                );
            }

            sortProducts(products, sortType) {
                const sorted = [...products];
                switch(sortType) {
                    case 'price-low':
                        return sorted.sort((a, b) => a.price - b.price);
                    case 'price-high':
                        return sorted.sort((a, b) => b.price - a.price);
                    case 'rating':
                        return sorted.sort((a, b) => b.rating - a.rating);
                    default:
                        return sorted;
                }
            }
        }

        class UI {
            constructor() {
                this.productsGrid = document.getElementById('productsGrid');
                this.loading = document.getElementById('loading');
                this.cartBadge = document.getElementById('cartBadge');
                this.cartItems = document.getElementById('cartItems');
                this.cartTotal = document.getElementById('cartTotal');
                this.modal = document.getElementById('productModal');
                this.modalContent = document.getElementById('modalContent');
                this.cartSidebar = document.getElementById('cartSidebar');
            }

            showLoading() {
                this.loading.style.display = 'block';
                this.productsGrid.style.display = 'none';
            }

            hideLoading() {
                this.loading.style.display = 'none';
                this.productsGrid.style.display = 'grid';
            }

            renderProducts(products) {
                if (products.length === 0) {
                    this.productsGrid.innerHTML = `
                        <div class="empty-state" style="grid-column: 1/-1;">
                            <p>No products found. Try a different search or category.</p>
                        </div>
                    `;
                    return;
                }

                this.productsGrid.innerHTML = products.map(product => `
                    <div class="product-card" data-id="${product.id}">
                        <img src="${product.image}" alt="${product.title}" class="product-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="product-image-placeholder" style="display:none;">📦</div>
                        <h3 class="product-title">${product.title}</h3>
                        <div class="product-price">${product.getFormattedPrice()}</div>
                        <div class="product-rating">
                            <span class="stars">${product.getRatingStars()}</span>
                            <span>${product.rating}</span>
                        </div>
                        <div class="product-actions">
                            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                            <button class="btn btn-secondary view-details" data-id="${product.id}">Details</button>
                        </div>
                    </div>
                `).join('');
            }

            renderCategories(categories) {
                const nav = document.getElementById('categoryNav');
                nav.innerHTML = `
                    <div class="nav-tab active" data-category="all">All Products</div>
                    ${Array.from(categories).map(cat => 
                        `<div class="nav-tab" data-category="${cat}">${cat}</div>`
                    ).join('')}
                `;
            }

            updateCartBadge(count) {
                this.cartBadge.textContent = count;
            }

            renderCart(cart) {
                if (cart.items.length === 0) {
                    this.cartItems.innerHTML = `
                        <div class="empty-state">
                            <p>Your cart is empty</p>
                        </div>
                    `;
                    this.cartTotal.textContent = '$0.00';
                    return;
                }

                this.cartItems.innerHTML = cart.items.map(item => `
                    <div class="cart-item">
                        <img src="${item.product.image}" alt="${item.product.title}" class="cart-item-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="cart-item-image-placeholder" style="display:none;">📦</div>
                        <div class="cart-item-details">
                            <div class="cart-item-title">${item.product.title}</div>
                            <div class="cart-item-price">${item.product.getFormattedPrice()}</div>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn decrease-qty" data-id="${item.product.id}">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-btn increase-qty" data-id="${item.product.id}">+</button>
                                <button class="btn btn-secondary" style="margin-left: auto; padding: 4px 8px; font-size: 12px;" data-id="${item.product.id}" class="remove-item">Remove</button>
                            </div>
                        </div>
                    </div>
                `).join('');

                this.cartTotal.textContent = `$${cart.getTotal().toFixed(2)}`;
            }

            showModal(product) {
                this.modalContent.innerHTML = `
                    <button class="modal-close" id="modalClose">×</button>
                    <img src="${product.image}" alt="${product.title}" class="modal-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="modal-image-placeholder" style="display:none;">📦</div>
                    <h2>${product.title}</h2>
                    <div class="product-price" style="margin: 16px 0;">${product.getFormattedPrice()}</div>
                    <div class="product-rating" style="margin-bottom: 16px;">
                        <span class="stars">${product.getRatingStars()}</span>
                        <span>${product.rating}</span>
                    </div>
                    <p style="margin-bottom: 16px; line-height: 1.6;">${product.description}</p>
                    <button class="btn btn-primary" style="width: 100%;" id="modalAddToCart" data-id="${product.id}">Add to Cart</button>
                `;
                this.modal.classList.add('active');
            }

            hideModal() {
                this.modal.classList.remove('active');
            }

            toggleCart() {
                this.cartSidebar.classList.toggle('active');
            }
        }

        // ============================================
        // Application Controller
        // ============================================

        class App {
            constructor() {
                this.productService = new ProductService();
                this.cart = new ShoppingCart();
                this.ui = new UI();
                this.currentCategory = 'all';
                this.currentSort = 'default';
                this.searchQuery = '';
            }

            async init() {
                try {
                    this.ui.showLoading();
                    
                    // Load products using Promise
                    await this.productService.loadProducts();
                    
                    // Render UI
                    this.ui.renderCategories(this.productService.categories);
                    this.renderFilteredProducts();
                    
                    // Load cart from storage
                    this.cart.loadFromStorage();
                    this.updateCart();
                    
                    // Setup event listeners
                    this.setupEventListeners();
                    
                    this.ui.hideLoading();
                } catch (error) {
                    console.error('Error initializing app:', error);
                    alert('Failed to load products. Please refresh the page.');
                }
            }

            setupEventListeners() {
                // Category navigation
                document.getElementById('categoryNav').addEventListener('click', (e) => {
                    if (e.target.classList.contains('nav-tab')) {
                        document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
                        e.target.classList.add('active');
                        this.currentCategory = e.target.dataset.category;
                        this.renderFilteredProducts();
                    }
                });

                // Sort filters
                document.getElementById('filters').addEventListener('click', (e) => {
                    if (e.target.classList.contains('filter-btn')) {
                        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                        e.target.classList.add('active');
                        this.currentSort = e.target.dataset.sort;
                        this.renderFilteredProducts();
                    }
                });

                // Search
                document.getElementById('searchBtn').addEventListener('click', () => this.handleSearch());
                document.getElementById('searchInput').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.handleSearch();
                });

                // Product actions
                document.getElementById('productsGrid').addEventListener('click', (e) => {
                    if (e.target.classList.contains('add-to-cart')) {
                        const productId = parseInt(e.target.dataset.id);
                        this.addToCart(productId);
                    } else if (e.target.classList.contains('view-details')) {
                        const productId = parseInt(e.target.dataset.id);
                        this.showProductDetails(productId);
                    }
                });

                // Modal
                document.getElementById('productModal').addEventListener('click', (e) => {
                    if (e.target.id === 'modalClose' || e.target.id === 'productModal') {
                        this.ui.hideModal();
                    } else if (e.target.id === 'modalAddToCart') {
                        const productId = parseInt(e.target.dataset.id);
                        this.addToCart(productId);
                        this.ui.hideModal();
                    }
                });

                // Cart
                document.getElementById('cartIcon').addEventListener('click', () => this.ui.toggleCart());
                document.getElementById('closeCart').addEventListener('click', () => this.ui.toggleCart());

                // Cart actions with event delegation
                document.getElementById('cartItems').addEventListener('click', (e) => {
                    const productId = parseInt(e.target.dataset.id);
                    if (e.target.classList.contains('increase-qty')) {
                        this.updateCartQuantity(productId, 1);
                    } else if (e.target.classList.contains('decrease-qty')) {
                        this.updateCartQuantity(productId, -1);
                    } else if (e.target.classList.contains('remove-item')) {
                        this.removeFromCart(productId);
                    }
                });

                // Checkout
                document.getElementById('checkoutBtn').addEventListener('click', () => this.checkout());
            }

            renderFilteredProducts() {
                let products = this.productService.filterByCategory(this.currentCategory);
                
                if (this.searchQuery) {
                    products = this.productService.searchProducts(this.searchQuery);
                }
                
                products = this.productService.sortProducts(products, this.currentSort);
                this.ui.renderProducts(products);
            }

            handleSearch() {
                this.searchQuery = document.getElementById('searchInput').value.trim();
                this.renderFilteredProducts();
            }

            addToCart(productId) {
                const product = this.productService.products.find(p => p.id === productId);
                if (product) {
                    this.cart.addItem(product);
                    this.updateCart();
                    this.showNotification('Added to cart!');
                }
            }

            removeFromCart(productId) {
                this.cart.removeItem(productId);
                this.updateCart();
            }

            updateCartQuantity(productId, change) {
                const item = this.cart.items.find(item => item.product.id === productId);
                if (item) {
                    const newQuantity = item.quantity + change;
                    if (newQuantity > 0) {
                        this.cart.updateQuantity(productId, newQuantity);
                        this.updateCart();
                    }
                }
            }

            updateCart() {
                this.ui.updateCartBadge(this.cart.getTotalItems());
                this.ui.renderCart(this.cart);
            }

            showProductDetails(productId) {
                const product = this.productService.products.find(p => p.id === productId);
                if (product) {
                    this.ui.showModal(product);
                }
            }

            async checkout() {
                if (this.cart.items.length === 0) {
                    alert('Your cart is empty!');
                    return;
                }

                // Simulating async checkout process with Promise
                try {
                    const result = await this.processCheckout();
                    alert(result.message);
                    this.cart.clear();
                    this.updateCart();
                    this.ui.toggleCart();
                } catch (error) {
                    alert('Checkout failed: ' + error.message);
                }
            }

            processCheckout() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        // Simulating 90% success rate
                        if (Math.random() > 0.1) {
                            resolve({
                                success: true,
                                message: `Order placed successfully! Total: $${this.cart.getTotal().toFixed(2)}`
                            });
                        } else {
                            reject(new Error('Payment processing failed'));
                        }
                    }, 1500);
                });
            }

            showNotification(message) {
                // Simple notification
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 80px;
                    right: 20px;
                    background: var(--color-primary);
                    color: white;
                    padding: 12px 24px;
                    border-radius: 8px;
                    z-index: 4000;
                    animation: slideIn 0.3s ease;
                `;
                notification.textContent = message;
                document.body.appendChild(notification);

                setTimeout(() => {
                    notification.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => notification.remove(), 300);
                }, 2000);
            }
        }

        // ============================================
        // Initialize Application
        // ============================================

        const app = new App();
        app.init();
    