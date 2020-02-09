var adminOnly = document.getElementById("adminOnly");
if (localStorage.getItem("accountLevel") == "Admin") {
  adminOnly.classList.remove("none");
} else {};