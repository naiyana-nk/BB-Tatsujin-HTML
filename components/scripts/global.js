// ! Function to load HTML file into element START
function loadHTML(file, elementId) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch((error) => console.error("Error loading " + file + ":", error));
}

loadHTML("header.html", "header-placeholder");
loadHTML("footer.html", "footer-placeholder");
// ! Function to load HTML file into element END

//! Mobile Nav Menu START
function toggleMenu() {
  const nav = document.getElementById("mainNav");
  nav.classList.toggle("active");
}

// Close mobile menu when clicking outside
document.addEventListener("click", function (event) {
  const nav = document.getElementById("mainNav");
  const toggle = document.querySelector(".mobile-menu-toggle");

  if (!nav.contains(event.target) && !toggle.contains(event.target)) {
    nav.classList.remove("active");
  }
});

// Close mobile menu when clicking a link
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("mainNav").classList.remove("active");
  });
});
//! Mobile Nav Menu END