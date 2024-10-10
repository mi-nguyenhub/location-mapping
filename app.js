let map;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
        center: { lat: 52.3547607, lng: 4.7391546 },
        zoom: 10,
    });
}

initMap();