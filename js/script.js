
// BVI3124 - Beginner Portfolio JavaScript
document.addEventListener("DOMContentLoaded", function () {

  // 1. Copyright year
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  // 2. Mobile menu
  const menu = document.getElementById("menuToggle");
  const links = document.getElementById("navLinks");

  if (menu && links) {
    menu.onclick = function () {
      const open = links.classList.toggle("open");
      menu.textContent = open ? "✕" : "☰";
      menu.setAttribute("aria-expanded", String(open));
    };
  }

  // 3. Dark / light theme
  const theme = document.getElementById("themeToggle");
  let mode = "dark";

  try {
    mode = localStorage.getItem("theme") || "dark";
  } catch (error) {
    mode = "dark";
  }

  function setTheme() {
    document.documentElement.dataset.theme = mode;
    if (theme) theme.textContent = mode === "dark" ? "☀" : "☾";
  }

  setTheme();

  if (theme) theme.onclick = function () {
    mode = mode === "dark" ? "light" : "dark";
    setTheme();
    try { localStorage.setItem("theme", mode); } catch (error) {}
  };

  // 4. Time-based greeting
  const greeting = document.getElementById("greeting");

  if (greeting) {
    const hour = new Date().getHours();
    greeting.textContent = hour < 12 ? "Good morning!" :
                           hour < 18 ? "Good afternoon!" : "Good evening!";
  }

  // 5. Typing animation
  const typing = document.getElementById("typingText");

  if (typing) {
    const message = "Keep Learning, Keep Improving";
    let i = 0;

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      typing.textContent = "";
      function type() {
        typing.textContent = message.slice(0, ++i);
        if (i < message.length) setTimeout(type, 80);
      }
      type();
    }
  }

  // 6. About Me - Read More
  const readBtn = document.getElementById("readMoreBtn");
  const extra = document.getElementById("readMoreContent");

  if (readBtn && extra) readBtn.onclick = function () {
    extra.hidden = !extra.hidden;
    readBtn.textContent = extra.hidden ? "Read More" : "Read Less";
    readBtn.setAttribute("aria-expanded", String(!extra.hidden));
  };

  // 7. Skills tabs
  document.querySelectorAll(".tab-btn").forEach(function (btn) {
    btn.onclick = function () {
      document.querySelectorAll(".tab-btn").forEach(function (b) {
        const active = b === btn;
        b.classList.toggle("active", active);
        b.setAttribute("aria-pressed", String(active));
      });

      document.querySelectorAll(".skill-panel").forEach(function (panel) {
        panel.hidden = panel.id !== btn.dataset.tab;
      });
    };
  });

  // 8. Skill bars
  document.querySelectorAll(".bar").forEach(function (bar) {
    const level = Math.max(0, Math.min(100, Number(bar.dataset.level)));
    bar.style.width = level + "%";
  });

  // 9. Project filters
  document.querySelectorAll(".filter").forEach(function (btn) {
    btn.onclick = function () {
      document.querySelectorAll(".filter").forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });

      document.querySelectorAll(".project").forEach(function (card) {
        card.hidden = btn.dataset.filter !== "all" &&
                      card.dataset.category !== btn.dataset.filter;
      });
    };
  });

  // 10. Project details popup
  const projectDialog = document.getElementById("projectDialog");

  const projects = {
    plc: ["PLC–COBOT Integration",
      "My role was collaborative robot programming. PLC-to-robot communication was successfully tested."],
    xeno: ["Smart Poultry Care System Xeno",
      "A completed Arduino Mega and ESP32 system for feeding, manure removal, monitoring and data logging."],
    flood: ["Malaysia Flood Risk Forecast Dashboard",
      "A Python and Streamlit dashboard for rainfall forecasts and flood-risk visualisation."]
  };

  if (projectDialog) {
    document.querySelectorAll(".details").forEach(function (btn) {
      btn.onclick = function () {
        const info = projects[btn.dataset.project];
        document.getElementById("projectTitle").textContent = info[0];
        document.getElementById("projectText").textContent = info[1];
        projectDialog.showModal();
      };
    });

    document.getElementById("closeProject").onclick =
      function () { projectDialog.close(); };
  }

  // 11. Certificate image popup
  const certificateDialog = document.getElementById("certificateDialog");

  if (certificateDialog) {
    document.querySelectorAll(".certificate-btn").forEach(function (btn) {
      btn.onclick = function () {
        const preview = document.getElementById("certificatePreview");
        preview.src = "images/certificates/" + btn.dataset.image;
        preview.alt = btn.dataset.title;
        certificateDialog.showModal();
      };
    });

    document.getElementById("closeCertificate").onclick =
      function () { certificateDialog.close(); };
  }

  // 12. Experience accordion
  document.querySelectorAll(".accordion-btn").forEach(function (btn) {
    btn.onclick = function () {
      const content = document.getElementById(btn.getAttribute("aria-controls"));
      content.hidden = !content.hidden;
      btn.setAttribute("aria-expanded", String(!content.hidden));
    };
  });

  // 13. Contact form validation
  const form = document.getElementById("contactForm");

  if (form) form.onsubmit = function (event) {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");
    const status = document.getElementById("formStatus");

    const checks = [
      [name, "nameError", name.value.trim().length >= 2,
       "Name must have at least 2 characters."],
      [email, "emailError",
       /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()),
       "Enter a valid email address."],
      [subject, "subjectError", subject.value.trim().length >= 3,
       "Subject must have at least 3 characters."],
      [message, "messageError", message.value.trim().length >= 10,
       "Message must have at least 10 characters."]
    ];

    let valid = true;

    checks.forEach(function (check) {
      const [input, errorId, passed, text] = check;
      document.getElementById(errorId).textContent = passed ? "" : text;
      input.setAttribute("aria-invalid", String(!passed));
      if (!passed) valid = false;
    });

    if (!valid) {
      status.textContent = "Please correct the errors above.";
      return;
    }

    status.textContent = "Validation successful. Please send the email in your email application.";

    const body = "Name: " + name.value.trim() +
                 "\nEmail: " + email.value.trim() +
                 "\n\nMessage:\n" + message.value.trim();

    window.location.href = "mailto:imr.hakim013@gmail.com?subject=" +
      encodeURIComponent(subject.value.trim()) +
      "&body=" + encodeURIComponent(body);
  };

});
