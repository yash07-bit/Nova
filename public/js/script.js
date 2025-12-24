// ======================
// BOOTSTRAP FORM VALIDATION
// ======================
// This logic is moved here from the boilerplate to keep things centralized
(function () {
  "use strict";
  const forms = document.querySelectorAll(".validated-form");
  Array.from(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// ======================
// AUTO DISMISS FLASH MESSAGES
// ======================
document.addEventListener("DOMContentLoaded", () => {
  const alerts = document.querySelectorAll(".alert-success, .alert-info");
  alerts.forEach((alert) => {
    // We only auto-dismiss success/info.
    // Usually, we want 'error' alerts to stay until the user reads them.
    setTimeout(() => {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
    }, 4000); // 4 seconds
  });
});

// ======================
// CONFIRM DELETE ACTION
// ======================
const deleteButtons = document.querySelectorAll(".btn-delete-confirm");
deleteButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const message =
      btn.getAttribute("data-message") ||
      "Are you sure you want to delete this?";
    if (!confirm(message)) {
      e.preventDefault();
    }
  });
});
