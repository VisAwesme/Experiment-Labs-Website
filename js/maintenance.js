// only do maintenance mode if like... something major on the site is broken, idfk
function isMaintenanceMode() {
  return false; // change this to false to disable maintenance mode
}

if (isMaintenanceMode()) {
  window.location.href = "503maintence.html";
}

