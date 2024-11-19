const navLinkEls = document.querySelectorAll(".navLink");
const sectionEls = document.querySelectorAll(".section");

let currentSection = 'home';

window.addEventListener("scroll" , () => {
    sectionEls.forEach(sectionEls => {
        if (window.scrollY >= sectionEls.offsetTop)
            {
                currentSection = sectionEls.id;
            }
    });
    navLinkEls.forEach(navLinkEls => {
        if (navLinkEls.href.includes(currentSection))
            {
                document.querySelector('.active').classList.remove('active');
                navLinkEls.classList.add('active');
            }
    });
});
/* GoTo Home */
// Get the button
const goHomeBtn = document.querySelector('.goHomeBtn');

// Function to show the button when scrolling
window.onscroll = function() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    goHomeBtn.style.display = 'flex'; // Show the button
  } else {
    goHomeBtn.style.display = 'none'; // Hide the button
  }
};

// Scroll to the top of the page
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Send Message */
function sendEmail()
{
    Email.send({
    SecureToken : "b6b8ff9f-d5e3-4362-b578-adf662aff832",
    To : "omprakashbehera.cse@gmail.com",
    From : document.getElementById("email").value,
    Subject : document.getElementById("subject-send").value,
    Body : document.getElementById("message-send").value
}).then(
      message => alert(message)
);
}