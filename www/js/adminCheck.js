var adminOnly = document.getElementById("adminOnly");
if (localStorage.getItem("accountLevel") == "Admin") {
  // Show Admin Controls
  adminOnly.classList.remove("none");
} else {
  // Do Nothing
};