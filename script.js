function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const menuItems = document.querySelector('.menu-items');
    const menuLinks = document.querySelectorAll('.menu-items a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        menuItems.classList.toggle('active');
    });

// toggle menu 
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            menuItems.classList.remove('active');
        });
    });


    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && 
            !menuItems.contains(e.target)) {
            hamburger.classList.remove('active');
            menuItems.classList.remove('active');
        }
    });
}


window.onload = function() {
    showProducts();
    setupHamburgerMenu();
    showProducts();

};


function setupBannerSlider() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;

    
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // get first slide
    slides[0].classList.add('active');

    function goToSlide(index) {
        
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Update  slide
        currentSlide = index;
        
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 3000); 
        // Change slide in every 5 seconds
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    
    const bannerSection = document.querySelector('.banner-section');
    bannerSection.addEventListener('mouseenter', stopSlideShow);
    bannerSection.addEventListener('mouseleave', startSlideShow);


    startSlideShow();
}


window.onload = function() {
    setupHamburgerMenu();
    setupBannerSlider();
    showProducts();
};


const ecoProducts = [
    {
        name: "Foaming Handwash Starter Duo Kit",
        price: 719.00,
        brand: "WATERWISE",
        image: "img/pr1.webp",
        description: "Two 250ml concentrated handwash bottles"
    },
    {
        name: "Foaming Handwash Refill Pack",
        price: 269.00,
        brand: "WATERWISE",
        image: "img/pr2.webp",
        description: "3 Concentrated refill sachets"
    },
    {
        name: "Laundry Detergent Sheets",
        price: 359.00,
        brand: "WATERWISE",
        image: "img/pr3.webp",
        description: "Zero waste washing machine sheets"
    },
    {
        name: "Neem Wood Toothbrush",
        price: 399.00,
        brand: "GREENFEELS",
        image: "img/pr4.png",
        description: "Natural plant-based bristles"
    }
    ,
    {
        name: "Bamboo Cutlery Set",
        price: 449.00,
        brand: "GREENFEELS",
        image: "img/pr5.webp",
        description: "Reusable travel cutlery with case"
    },
    {
        name: "Natural Loofah Scrubber",
        price: 199.00,
        brand: "WATERWISE",
        image: "img/pr6.webp",
        description: "Biodegradable kitchen scrubber"
    },
    {
        name: "Organic Cotton Produce Bags",
        price: 599.00,
        brand: "GREENFEELS", 
        image: "img/pr7.webp",
        description: "Set of 6 reusable grocery bags"
    },
    {
        name: "Stainless Steel Water Bottle",
        price: 899.00,
        brand: "WATERWISE",
        image: "img/pr8.png",
        description: "1L insulated eco-friendly bottle"
    }
];


function showProducts() {
    const productContainer = document.querySelector('.product-container');
    ecoProducts.forEach(product => {
        const productBox = document.createElement('div');
        productBox.className = 'product-box';
        productBox.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <span class="brand-name">${product.brand}</span>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">M.R.P Rs. ${product.price.toFixed(2)}</p>
                <button onclick="addToBag('${product.name}')" class="add-btn">Add To Cart</button>
            </div>
        `;
        productContainer.appendChild(productBox);
    });
}


let bagItems = 0;

function addToBag(productName) {
    bagItems++;
    document.querySelector('.bag-count').textContent = bagItems;
    alert(`Added ${productName} to your bag!`);
}

// Product impact calculations
const productImpacts = {
    handwash: {
        conventional: 250, // grams CO2 per bottle
        eco: 50,
        plastic: 30 // grams of plastic per bottle
    },
    toothbrush: {
        conventional: 160,
        eco: 30,
        plastic: 20
    },
    detergent: {
        conventional: 400,
        eco: 100,
        plastic: 50
    },
    bottles: {
        conventional: 300,
        eco: 0,
        plastic: 40
    }
};

function calculateProductImpact() {
    const productType = document.getElementById('product-type').value;
    const conventionalQty = Number(document.getElementById('conventional-usage').value) || 0;
    const ecoQty = Number(document.getElementById('eco-usage').value) || 0;

    const impact = productImpacts[productType];
    
    // Calculate monthly savings
    const carbonSaved = (conventionalQty * impact.conventional) - (ecoQty * impact.eco);
    const plasticSaved = (conventionalQty * impact.plastic) - (ecoQty * impact.plastic);

    // Display results
    const monthlyDisplay = document.getElementById('monthly-impact');
    const yearlyDisplay = document.getElementById('yearly-impact');
    const suggestionsDisplay = document.getElementById('product-suggestions');

    monthlyDisplay.innerHTML = `
        <h3>Monthly Environmental Impact Savings:</h3>
        <p>🌱 Carbon Footprint: ${carbonSaved}g CO2</p>
        <p>🌍 Plastic Waste: ${plasticSaved}g</p>
    `;

    yearlyDisplay.innerHTML = `
        <h3>Yearly Environmental Impact Savings:</h3>
        <p>🌱 Carbon Footprint: ${carbonSaved * 12}g CO2</p>
        <p>🌍 Plastic Waste: ${plasticSaved * 12}g</p>
    `;

    // Product suggestions based on usage
    let suggestions = [];
    if (conventionalQty > ecoQty) {
        suggestions.push(`Switch to our eco-friendly ${productType} to reduce your impact!`);
        suggestions.push(`You could save ${carbonSaved * 12}g of CO2 per year!`);
        suggestions.push(`Prevent ${plasticSaved * 12}g of plastic waste yearly!`);
    } else if (conventionalQty === 0 && ecoQty > 0) {
        suggestions.push("Great job using eco-friendly products!");
        suggestions.push("Check out our other sustainable products!");
    }

    suggestionsDisplay.innerHTML = `
        <h4>Recommendations:</h4>
        <ul>
            ${suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
        </ul>
    `;
}


function submitForm(event) {
    event.preventDefault();
    alert('Thank you for reaching out! We will contact you soon.');
    event.target.reset();
}
