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

// ! Calendar Script START
// Define closed dates
const closedDates = [
  "2025-12-05",
  "2025-12-10",
  "2026-01-01",
  // Add more dates in YYYY-MM-DD format
];

// Helper function to check if a date is closed
function isClosedDate(year, month, day) {
  // Check if it's a weekend (Saturday = 6, Sunday = 0)
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay();

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return true; // Closed on weekends
  }

  // Also check specific closed dates
  const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;
  return closedDates.includes(dateString);
}

let currentDate = new Date();
let selectedDate = null;

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Set month and year in header
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  document.getElementById(
    "monthYear"
  ).textContent = `${monthNames[month]} ${year}`;

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Get today's date for comparison
  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === month && today.getFullYear() === year;
  const todayDate = today.getDate();

  // Clear calendar
  const calendarDays = document.getElementById("calendarDays");
  calendarDays.innerHTML = "";

  // Add previous month's days
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const dayDiv = document.createElement("div");
    dayDiv.className = "calendar-day other-month";
    dayDiv.textContent = day;
    calendarDays.appendChild(dayDiv);
  }

  // Add current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.className = "calendar-day";
    dayDiv.textContent = day;

    // Check if it's a closed date
    if (isClosedDate(year, month, day)) {
      dayDiv.classList.add("closed");
    }

    // Highlight today
    if (isCurrentMonth && day === todayDate) {
      dayDiv.classList.add("today");
    }

    // Add click event
    dayDiv.addEventListener("click", function () {
      // Prevent selecting closed dates
      if (this.classList.contains("closed")) {
        return;
      }

      document.querySelectorAll(".calendar-day").forEach((d) => {
        d.classList.remove("selected");
      });
      if (!this.classList.contains("other-month")) {
        this.classList.add("selected");
        selectedDate = new Date(year, month, day);
      }
    });

    calendarDays.appendChild(dayDiv);
  }

  // Add next month's days to fill the grid
  const totalCells = calendarDays.children.length;
  const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

  for (let day = 1; day <= remainingCells; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.className = "calendar-day other-month";
    dayDiv.textContent = day;
    calendarDays.appendChild(dayDiv);
  }
}

// Navigation buttons
document.getElementById("prevMonth").addEventListener("click", function () {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click", function () {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Initial render
renderCalendar();
// ! Calendar Script END
