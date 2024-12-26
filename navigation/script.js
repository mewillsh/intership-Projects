// Scroll event listener to change navbar background color and collapse it on scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('active');
    } else {
        navbar.classList.remove('active');
    }
});

// Function to toggle the navigation menu on small screens
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Optional: Smooth scrolling when clicking on menu links
document.querySelectorAll('.navbar ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Close the menu after clicking a link (for mobile)
        if (window.innerWidth <= 768) {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.remove('active');
        }
    });
});
