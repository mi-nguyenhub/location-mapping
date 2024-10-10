let map;
let marker;
let infoWindow;
let endInfoWindow;
let endMarker;

async function initMap() {
    const [{ Map }, { AdvancedMarkerElement }] = await Promise.all([
        google.maps.importLibrary("marker"),
        google.maps.importLibrary("places"),
    ]);

    // Initialize the map.
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 52.3676, lng: 4.9041 },
        zoom: 9,
        mapId: "4504f8b37365c3d0",
        mapTypeControl: false,
    });

    // Start point variable
    const startingInput = new google.maps.places.PlaceAutocompleteElement();
    startingInput.id = "starting-input";
    const startCard = document.getElementById("starting-point");
    startCard.appendChild(startingInput);
    console.log(startingInput);
    // Create the marker and infowindow
    marker = new google.maps.marker.AdvancedMarkerElement({
        map,
    });
    infoWindow = new google.maps.InfoWindow({});

    let startLocation = null;
    let endLocation = null;

    // Start point addEventListener
    startingInput.addEventListener("gmp-placeselect", async ({ place }) => {
        await place.fetchFields({
            fields: ["displayName", "formattedAddress", "location"],
        });

        startLocation = place.location;

        let content =
            '<div id="infowindow-content">' +
            '<span id="place-displayname" class="title">' +
            place.displayName +
            "</span><br />" +
            '<span id="place-address">' +
            place.formattedAddress +
            "</span>" +
            "</div>";

        updateInfoWindow(content, place.location);
        marker.position = place.location;

        fitMapToBounds(startLocation, endLocation);
    });

    // End point variable
    const endInput = new google.maps.places.PlaceAutocompleteElement();
    endInput.id = "end-input";
    const endCard = document.getElementById("end-point");
    const form = document.getElementById("form");
    endCard.appendChild(endInput);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(form);

    endMarker = new google.maps.marker.AdvancedMarkerElement({
        map,
    });
    endInfoWindow = new google.maps.InfoWindow({});

    // End point addEventListener
    endInput.addEventListener("gmp-placeselect", async ({ place }) => {
        await place.fetchFields({
            fields: ["displayName", "formattedAddress", "location"],
        });

        endLocation = place.location;

        let content =
            '<div id="end-infowindow-content">' +
            '<span id="end-place-displayname" class="end-title">' +
            place.displayName +
            "</span><br />" +
            '<span id="end-place-address">' +
            place.formattedAddress +
            "</span>" +
            "</div>";

        updateEndInfoWindow(content, place.location);
        endMarker.position = place.location;

        fitMapToBounds(startLocation, endLocation);
    });
}

// Helper function to create an info window.
function updateInfoWindow(content, center) {
    infoWindow.setContent(content);
    infoWindow.setPosition(center);
    infoWindow.open({
        map,
        anchor: marker,
        shouldFocus: false,
    });
}

// Helper function to create an end info window.
function updateEndInfoWindow(content, center) {
    endInfoWindow.setContent(content);
    endInfoWindow.setPosition(center);
    endInfoWindow.open({
        map,
        anchor: endMarker,
        shouldFocus: false,
    });
}

// Helper function to fit the map to both start and end locations
// Helper function to fit the map to both start and end locations
function fitMapToBounds(startLocation, endLocation) {
    if (startLocation && endLocation) {
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(startLocation);
        bounds.extend(endLocation);

        const paddingOptions = {
            top: 300, // adjust this value based on the height of your search bar
            right: 50,
            bottom: 50,
            left: 50
        };

        map.fitBounds(bounds, paddingOptions);
    } else if (startLocation) {
        map.setCenter(startLocation);
        map.setZoom(13);
    } else if (endLocation) {
        map.setCenter(endLocation);
        map.setZoom(13);
    }
}


initMap();

const travelOptionsButton = document.getElementById('travelOptionsButton');
const travelOptionsMenu = document.getElementById('travelOptionsMenu');

travelOptionsButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the form from submitting if the button is inside a form
    travelOptionsMenu.classList.toggle('visible');
});

