'use strict';


// Dynamically load each section
  const sections = ['header', 'topbar', 'event', 'footer', 'food', 'special_dish', 'testimonials'];
  sections.forEach(section => {
    fetch(`${section}.html`)
      .then(response => response.text())
      .then(data => {
        document.getElementById(section).innerHTML = data;
      });
  });


/**
 * PRELOAD
 */
const preloader = document.querySelector("[data-preaload]");

if (preloader) {
  window.addEventListener("load", function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
  });
}



/**
 * Add event listener on multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
  if (elements.length > 0) {
    for (let i = 0, len = elements.length; i < len; i++) {
      elements[i].addEventListener(eventType, callback);
    }
  } else {
    console.warn("No elements found to add event listeners.");
  }
};

/**
 * NAVBAR
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

if (navbar && overlay) {
  const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
  };

  addEventOnElements(navTogglers, "click", toggleNavbar);
}

fetch('header.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('header').innerHTML = data;

        // Add active class dynamically after loading navbar
        const navLinks = document.querySelectorAll('.navbar-link');
        const currentUrl = window.location.href;

        navLinks.forEach(link => {
          if (link.href === currentUrl) {
            link.classList.add('active'); // Add active class
          }
        });
      });


/**
 * HEADER
 */
window.onload = () => {
  const header = document.querySelector("[data-header]");
  const topbar = document.querySelector("[data-topbar]");

  if (header && topbar) {
    let lastScrollPos = 0;

    const hideElements = function () {
      const isScrollBottom = window.scrollY > lastScrollPos;

      if (isScrollBottom && window.scrollY > 50) {
        header?.classList.add("hide");
        topbar?.classList.add("hide");
      } else {
        header?.classList.remove("hide");
        topbar?.classList.remove("hide");
      }

      lastScrollPos = window.scrollY;
    };

    window.addEventListener("scroll", hideElements);
  }
};




/**
 * HERO SLIDER
 */
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

if (heroSlider && heroSliderItems.length > 0) {
  let currentSlidePos = 0;
  let lastActiveSliderItem = heroSliderItems[0];

  const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
  };

  const slideNext = function () {
    if (currentSlidePos >= heroSliderItems.length - 1) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }
    updateSliderPos();
  };

  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = heroSliderItems.length - 1;
    } else {
      currentSlidePos--;
    }
    updateSliderPos();
  };

  heroSliderNextBtn?.addEventListener("click", slideNext);
  heroSliderPrevBtn?.addEventListener("click", slidePrev);

  let autoSlideInterval;

  const autoSlide = function () {
    autoSlideInterval = setInterval(slideNext, 7000);
  };

  addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
    clearInterval(autoSlideInterval);
  });

  addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

  window.addEventListener("load", autoSlide);
}

/**
 * PARALLAX EFFECT
 */
const parallaxItems = document.querySelectorAll("[data-parallax-item]");

if (parallaxItems.length > 0) {
  window.addEventListener("mousemove", function (event) {
    let x = (event.clientX / window.innerWidth) * 10 - 5;
    let y = (event.clientY / window.innerHeight) * 10 - 5;

    x = x - x * 2;
    y = y - y * 2;

    for (let i = 0, len = parallaxItems.length; i < len; i++) {
      const speed = Number(parallaxItems[i].dataset.parallaxSpeed);
      parallaxItems[i].style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0px)`;
    }
  });
}

/**
 * MEAL, FOOD, TIME -->(type)
 */
const mealTypeDropdown = document.getElementById("mealType");
const foodTypeDropdown = document.getElementById("foodType");
const timeDropdown = document.getElementById("timeDropdown");

if (mealTypeDropdown && foodTypeDropdown && timeDropdown) {
  // Define food items for each meal type
  const foodItems = {
    breakfast: [
      { value: "pancakes", text: "Pancakes" },
      { value: "omelette", text: "omelette" },
      { value: "cereal", text: "Cereal" },
      { value: "French Toast", text: "French Toast" },
      { value: "Crêpe Suzette", text: "Crêpe Suzette"},
    ],
    lunch: [
      { value: "pasta", text: "Pasta" },
      { value: "Biryani", text: "Biryani" },
      { value: "Thai Red Curry", text: "Thai Red Curry" },
      { value: "Shrimp Rice Bowl", text: "Shrimp Rice Bowl" },
      { value: "Shrimp Stir-Fried Noodles", text: "Shrimp Stir-Fried Noodles"},
    ],
    dinner: [
      { value: "sushi", text: "Sushi" },
      { value: "Wagyu Steak", text: "Wagyu Steak" },
      { value: "Beef Wellingtonteak", text: "Beef Wellington" },
      { value: "Tuna Tartare", text: "Tuna Tartare" },
      { value: "Char-Grilled Wings", text: "Char-Grilled Wings"},
    ],
  };

  // Define meal times for each meal type
  const mealTimes = {
    breakfast: [
      { value: "08:30am", text: "8:30 AM" },
      { value: "09:00am", text: "9:00 AM" },
      { value: "09:30am", text: "9:30 AM" },
      { value: "10:00am", text: "10:00 AM" },
      { value: "10:30am", text: "10:30 AM" },
      { value: "11:00am", text: "11:00 AM" },
    ],
    lunch: [
      { value: "01:30pm", text: "1:30 PM" },
      { value: "02:00pm", text: "2:00 PM" },
      { value: "02:30pm", text: "2:30 PM" },
      { value: "03:00pm", text: "3:00 PM" },
      { value: "03:30pm", text: "3:30 PM" },
      { value: "04:00pm", text: "4:00 PM" },
      { value: "05:00pm", text: "5:00 PM" },
    ],
    dinner: [
      { value: "06:00pm", text: "6:00 PM" },
      { value: "06:30pm", text: "6:30 PM" },
      { value: "07:00pm", text: "7:00 PM" },
      { value: "07:30pm", text: "7:30 PM" },
      { value: "08:00pm", text: "8:00 PM" },
      { value: "08:30pm", text: "8:30 PM" },
      { value: "09:00pm", text: "9:00 PM" },
      { value: "09:30pm", text: "9:30 PM" },
      { value: "10:00pm", text: "10:00 PM" },
    ],
  };

  // Event listener for when Meal Type is selected
  mealTypeDropdown.addEventListener("change", (event) => {
    const selectedMeal = event.target.value;

    // Clear existing food and time options
    foodTypeDropdown.innerHTML = '<option value="" disabled selected>Select Food</option>';
    timeDropdown.innerHTML = '<option value="" disabled selected>Select Time</option>';

    // Populate new food options based on selected meal
    if (foodItems[selectedMeal]) {
      foodItems[selectedMeal].forEach((food) => {
        const option = document.createElement("option");
        option.value = food.value;
        option.textContent = food.text;
        foodTypeDropdown.appendChild(option);
      });
    }

    // Populate new time options based on selected meal
    if (mealTimes[selectedMeal]) {
      mealTimes[selectedMeal].forEach((time) => {
        const option = document.createElement("option");
        option.value = time.value;
        option.textContent = time.text;
        timeDropdown.appendChild(option);
      });
    }
  });
}

// Get the button and the confirmation message
const bookButton = document.getElementById("bookButton");
const confirmationMessage = document.getElementById("confirmationMessage");

// Add an event listener to the button to display a message when clicked
bookButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the form from submitting (if inside a form)

  // Hide the button text and show the confirmation message
  confirmationMessage.style.display = "block";
  bookButton.style.display = "none"; // Hide the button after it's clicked
});