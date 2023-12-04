// 1. for navbar
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  mobileMenuBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });
});

// 2. for slidebar

// JavaScript to handle image clicks
document.querySelectorAll("#imageSlider img").forEach((img) => {
  img.addEventListener("click", () => {
    const link = img.nextElementSibling;
    link.classList.remove("hidden");
  });
});

// 3. for map
let mymap;
let currentMarker;
let destinationMarker;
let polyline;

function initMap() {
  mymap = L.map("map").setView([0, 0], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(mymap);

  // Get current location
  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latlng = [position.coords.latitude, position.coords.longitude];
        if (currentMarker) {
          mymap.removeLayer(currentMarker);
        }
        currentMarker = L.marker(latlng)
          .addTo(mymap)
          .bindPopup("You are here")
          .openPopup();
      },
      function (error) {
        console.error("Error getting geolocation:", error);
      }
    );
  }

  // Call function to get current location
  getCurrentLocation();

  // Initialize geocoder control
  const geocoder = L.Control.geocoder({
    defaultMarkGeocode: false,
  })
    .on("markgeocode", function (e) {
      if (destinationMarker) {
        mymap.removeLayer(destinationMarker);
      }
      if (polyline) {
        mymap.removeLayer(polyline);
      }
      destinationMarker = L.marker(e.geocode.center)
        .addTo(mymap)
        .bindPopup(e.geocode.name)
        .openPopup();

      // Draw polyline between current location and destination
      const currentLatLng = currentMarker.getLatLng();
      const destinationLatLng = destinationMarker.getLatLng();
      const latlngs = [currentLatLng, destinationLatLng];
      polyline = L.polyline(latlngs, { color: "red" }).addTo(mymap);
      mymap.fitBounds([currentLatLng, destinationLatLng]);
    })
    .addTo(mymap);
}

// Initialize map on page load
window.onload = function () {
  initMap();
};

//4.JavaScript to toggle the more details section

function toggleDetails() {
  const vehicleDetails = document.getElementById("vehicleDetails");
  vehicleDetails.classList.toggle("hidden");
}
