const sections = document.querySelectorAll('div.content');
let currentSection = 0;
const header = document.querySelector('header');
let headerHeight = header.offsetHeight;

document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.querySelector(".toggle-button");
    const nav = document.querySelector(".header-right nav");

    // Toggle menu on hamburger button click
    toggleButton.addEventListener("click", function() {
        nav.classList.toggle("active");
        toggleButton.classList.toggle("active");
    });

    // Close menu when clicking on a menu item
    const menuItems = document.querySelectorAll(".header-right nav ul li a");

    menuItems.forEach(function(item) {
        item.addEventListener("click", function() {
            // Close the menu
            nav.classList.remove("active");
            toggleButton.classList.remove("active");

            // Scroll to the section
            const target = item.getAttribute("href").substr(1); // get rid of #
            const section = document.getElementById(target);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});
window.addEventListener('resize', () => {
  headerHeight = header.offsetHeight; // Update header height on window resize
});

window.addEventListener('wheel', (event) => {
  event.preventDefault();
  const deltaY = event.deltaY;
  const direction = deltaY > 0 ? 1 : -1;
  const nextSection = currentSection + direction;

  if (nextSection >= 0 && nextSection < sections.length) {
    scrollToSection(nextSection);
  }
});

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + headerHeight;
  const closestSection = getClosestSection(scrollPosition);

  if (closestSection) {
    currentSection = sections.indexOf(closestSection);
  }
});

function getClosestSection(scrollPosition) {
  let closestSection = null;
  let closestDistance = Infinity;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const distance = Math.abs(scrollPosition - sectionTop);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestSection = section;
    }
  });

  return closestSection;
}

function scrollToSection(index) {
  currentSection = index;
  const targetPosition = sections[index].offsetTop - headerHeight - 8;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

// Add this to fix the header issue
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
