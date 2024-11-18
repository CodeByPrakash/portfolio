/* Multi to single page web site*/

// var HomeBTN = document.querySelector(".homeBTN");
// var HomePage = document.querySelector(".home");
// var AboutBTN = document.querySelector(".aboutBTN");
// var AboutPage = document.querySelector(".about");
// var ServiceBTN = document.querySelector(".serviceBTN");
// var ServicePage = document.querySelector(".service");
// var PortfolioBTN = document.querySelector(".portfolioBTN");
// var PortfolioPage = document.querySelector(".portfolio");
// var ContactBTN = document.querySelector(".contactBTN");
// var ContactPage= document.querySelector(".contact");
// var HireMe = document.querySelector(".hire-me");


// if (window.innerWidth < 1283) {

//     HomePage.classList.remove("hidden");
//     AboutPage.classList.remove("hidden");
//     ServicePage.classList.remove("hidden");
//     PortfolioPage.classList.remove("hidden");
//     ContactPage.classList.remove("hidden");
// }
// else {
//     HomeBTN.addEventListener("click" , () => {
//         HomeBTN.classList.add('active');
//         HomePage.classList.remove("hidden");
//         AboutBTN.classList.remove("active");
//         AboutPage.classList.add("hidden");
//         ServicePage.classList.add("hidden");
//         ServiceBTN.classList.remove("active");
//         PortfolioPage.classList.add("hidden");
//         PortfolioBTN.classList.remove("active");
//         ContactPage.classList.add("hidden");
//         ContactBTN.classList.remove("active");
//     });
//     AboutBTN.addEventListener("click" , () => {
//         HomeBTN.classList.remove('active');
//         HomePage.classList.add("hidden");
//         AboutBTN.classList.add("active");
//         AboutPage.classList.remove("hidden");
//         ServicePage.classList.add("hidden");
//         ServiceBTN.classList.remove("active");
//         PortfolioPage.classList.add("hidden");
//         PortfolioBTN.classList.remove("active");
//         ContactPage.classList.add("hidden");
//         ContactBTN.classList.remove("active");
//     });
//     ServiceBTN.addEventListener("click" , () => {
//         HomeBTN.classList.remove('active');
//         HomePage.classList.add("hidden");
//         AboutBTN.classList.remove("active");
//         AboutPage.classList.add("hidden");
//         ServicePage.classList.remove("hidden");
//         ServiceBTN.classList.add("active");
//         PortfolioPage.classList.add("hidden");
//         PortfolioBTN.classList.remove("active");
//         ContactPage.classList.add("hidden");
//         ContactBTN.classList.remove("active");
//     });
//     PortfolioBTN.addEventListener("click" , () => {
//         HomeBTN.classList.remove('active');
//         HomePage.classList.add("hidden");
//         AboutBTN.classList.remove("active");
//         AboutPage.classList.add("hidden");
//         ServicePage.classList.add("hidden");
//         ServiceBTN.classList.remove("active");
//         PortfolioPage.classList.remove("hidden");
//         PortfolioBTN.classList.add("active");
//         ContactPage.classList.add("hidden");
//         ContactBTN.classList.remove("active");
//     });
//     ContactBTN.addEventListener("click" , () => {
//         HomeBTN.classList.remove('active');
//         HomePage.classList.add("hidden");
//         AboutBTN.classList.remove("active");
//         AboutPage.classList.add("hidden");
//         ServicePage.classList.add("hidden");
//         ServiceBTN.classList.remove("active");
//         PortfolioPage.classList.add("hidden");
//         PortfolioBTN.classList.remove("active");
//         ContactPage.classList.remove("hidden");
//         ContactBTN.classList.add("active");
//     });
//     HireMe.addEventListener("click", () => {
//         HomePage.classList.add("hidden");
//         AboutPage.classList.add("hidden");
//         ServicePage.classList.add("hidden");
//         PortfolioPage.classList.add("hidden");
//         ContactPage.classList.remove("hidden");
//         HomeBTN.classList.remove('active');
//         AboutBTN.classList.remove('active');
//         ServiceBTN.classList.remove('active');
//         PortfolioBTN.classList.remove('active');
//         ContactBTN.classList.add('active');
//     });
// }
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
const goHomeBtn = document.getElementById('goHomeBtn');

// Function to show the button when scrolling
window.onscroll = function() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    goHomeBtn.style.display = 'block'; // Show the button
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