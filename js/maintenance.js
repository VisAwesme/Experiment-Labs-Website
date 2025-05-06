// only do maintenance mode if like... something major on the site is broken, idfk
function isMaintenanceMode() {
  return true; // change this to false to disable maintenance mode
}

if (isMaintenanceMode()) {
  window.location.href = "pages/errors/503maintence.html";
}

