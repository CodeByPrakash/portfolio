const navLinkEls = document.querySelectorAll(".navLink");
const sectionEls = document.querySelectorAll('.section');
const goHomeBtn = document.querySelector('.goHomeBtn'); // Button to go home

let currentSection = 'home';

window.addEventListener("scroll", () => {
    sectionEls.forEach(sectionEl => {
        if (window.scrollY >= sectionEl.offsetTop - 150) { // Adjust for offset if needed
            currentSection = sectionEl.id;
        }
    });

    navLinkEls.forEach(navLinkEl => {
        if (navLinkEl.href.includes(currentSection)) {
            const activeEl = document.querySelector('.active');
            if (activeEl) activeEl.classList.remove('active');
            navLinkEl.classList.add('active');
        }
    });
});

/* Show/Hide "Go to Home" Button */
window.onscroll = () => {
    if (goHomeBtn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            goHomeBtn.style.display = 'flex'; // Show the button
        } else {
            goHomeBtn.style.display = 'none'; // Hide the button
        }
    }
};

// Scroll to the top of the page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

if (goHomeBtn) {
    goHomeBtn.addEventListener('click', scrollToTop); // Add event listener to button
}
