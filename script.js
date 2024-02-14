const chargeLevel = document.getElementById("charge-level");
const charge = document.getElementById("charge");
const chargingTimeRef = document.getElementById("charging-time");

window.onload = () => {
  // For browsers that don't support battery status API
  if(!navigator.getBattery) {
    alert("Battery Status API is not supported in your browser");
    return false;
  }
};

navigator.getBattery().then((battery) => {
  function updateAllBatteryInfo() {
    updateChargingInfo();
    updateLevelInfo();
  }

  updateAllBatteryInfo();

  // When the charging status changes
  battery.addEventListener("chargingchange", () => {
    updateAllBatteryInfo();
  });

  // When the battery level changes
  battery.addEventListener("levelchange", () => {
    updateAllBatteryInfo();
  })

  function updateChargingInfo() {
    if(battery.charging) {
      charge.classList.add("active");
      chargingTimeRef.innerText = "";
    } else {
      charge.classList.remove("active");

      // Display time left to discharge only when it is an integer value i.e not infinity
      if (parseInt(battery.dischargingTime)) {
        console.log(battery.dischargingTime);
        let hr = parseInt(battery.dischargingTime / 3600);
        let min = parseInt(battery.dischargingTime / 60 - hr * 60);
        chargingTimeRef.innerText = `${hr}hr ${min}min remaining`;
      }
    }
  }

  // Update battery level
  function updateLevelInfo() {
    let batteryLevel = `${parseInt(battery.level * 100)}%`;
    charge.style.width = batteryLevel;
    chargeLevel.textContent = batteryLevel
  }
});
