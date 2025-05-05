function isMaintenanceMode() {
  return true; // Change this to false to disable maintenance mode
}

if (isMaintenanceMode()) {
  window.location.href = "503maintence?.html";
}
