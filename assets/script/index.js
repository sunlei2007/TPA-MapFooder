'use strict';

const modalSpinner = document.querySelector(".dialog-spinner");
let map;

window.onload = function () {
    //Load mapbox
    loadMap();
    //get user location
    getLocation();
}
function getLocation() {
    if (navigator.geolocation) {
        modalSpinner.showModal();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                modalSpinner.close();
                console.log(position.coords);
                const arrData = [position.coords.longitude, position.coords.latitude];
                //Jump to current location
                map.jumpTo({ center: arrData }); 
                //Add current position marker
                addMarker(arrData);
                //Add restorant  position
                addFoodPosition();
               
            },
            (error) => {
                console.log(error.message);
            },
            { enableHighAccuracy: true });
    } else {
        console.log("Geolocation is not supported by your browser");
    }
}
function loadMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiMTM5MTg4NTY2IiwiYSI6ImNsYmdyb3JleTBjYW4zb3M0Zjh6azA4NnQifQ.BtD-5ZjCqwNzGUtJ6Gk1ag';
    map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [0, 0], // starting position [lng, lat]
        zoom: 13, // starting zoom
    });
}
function addFoodPosition() {
    map.addSource('places', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Holy Spice East Indian Cuisine</strong><div><span style="color:orange;font-size:20px">&#9733;</span><span style="color:orange;font-size:20px">&#9733;</span><span style="color:orange;font-size:20px">&#9733;</span></div ><p>The Ice Room is a unique tasting experience exclusive to The Canadian Icehouse.This expertly crafted, sub-zero tasting room is composed entirely of hand-crafted ice and snow and is kept at an ideal temperature of -35°C to hold the purity of our products without contamination.</p><p><i class="fa-solid fa-calendar-days" style=""></i>12:00-6:00 p.m.</p>'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-97.1919452, 49.8198169]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>The Canadian Brewhouse</strong><div><span style="color:orange;font-size:20px">&#9733;</span><span style="color:orange;font-size:20px">&#9733;</span><span style="color:orange;font-size:20px">&#9733;</span><span style="color:orange;font-size:20px">&#9733;</span></div ><p>The Ice Room is a unique tasting experience exclusive to The Canadian Icehouse.This expertly crafted, sub-zero tasting room is composed entirely of hand-crafted ice and snow and is kept at an ideal temperature of -35°C to hold the purity of our products without contamination.</p><p><i class="fa-solid fa-calendar-days" style=""></i>12:00-6:00 p.m.</p>'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-97.1972457, 49.8204824]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Ben & Florentine</strong><div><span style="color:orange;font-size:20px">&#9733;</span><span style="color:orange;font-size:20px">&#9733;</span><span style="color:orange;font-size:20px">&#9733;</span><span style="color:orange;font-size:20px">&#9733;</span><span style="color:orange;font-size:20px">&#9733;</span></div ><p>The Ice Room is a unique tasting experience exclusive to The Canadian Icehouse.This expertly crafted, sub-zero tasting room is composed entirely of hand-crafted ice and snow and is kept at an ideal temperature of -35°C to hold the purity of our products without contamination.</p><p><i class="fa-solid fa-calendar-days" style=""></i>12:00-6:00 p.m.</p>'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-97.1980487, 49.819388]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Holy Spice East Indian Cuisine</strong><div><span style="color:orange;font-size:20px">&#9733;</span><span style="color:orange;font-size:20px">&#9733;</span><span style="color:orange;font-size:20px">&#9733;</span></div ><p>The Ice Room is a unique tasting experience exclusive to The Canadian Icehouse.This expertly crafted, sub-zero tasting room is composed entirely of hand-crafted ice and snow and is kept at an ideal temperature of -35°C to hold the purity of our products without contamination.</p><p><i class="fa-solid fa-calendar-days" style=""></i>12:00-6:00 p.m.</p>'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-97.194957, 49.8228392]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Holy Spice East Indian Cuisine</strong><div><span style="color:orange;font-size:20px">&#9733;</span><span style="color:orange;font-size:20px">&#9733;</span><span style="color:orange;font-size:20px">&#9733;</span></div ><p>The Ice Room is a unique tasting experience exclusive to The Canadian Icehouse.This expertly crafted, sub-zero tasting room is composed entirely of hand-crafted ice and snow and is kept at an ideal temperature of -35°C to hold the purity of our products without contamination.</p><p><i class="fa-solid fa-calendar-days" style=""></i>12:00-6:00 p.m.</p>'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-97.1990624, 49.8215007]
                    }
                }
            ]
        }
    });
    // Add a layer showing the places.
    map.addLayer({
        'id': 'places',
        'type': 'circle',
        'source': 'places',
        'paint': {
            'circle-color': '#4264fb',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        }
    });

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'places', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
}
function addMarker(arrCoord) {
    map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

    map.addSource('dot-point', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': arrCoord // icon position [lng, lat]
                    }
                }
            ]
        }
    });
    map.addLayer({
        'id': 'layer-with-pulsing-dot',
        'type': 'symbol',
        'source': 'dot-point',
        'layout': {
            'icon-image': 'pulsing-dot'
        }
    });
}
const size = 100;

// This implements `StyleImageInterface`
// to draw a pulsing dot icon on the map.
const pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // When the layer is added to the map,
    // get the rendering context for the map canvas.
    onAdd: function () {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
    },

    // Call once before every frame where the icon will be used.
    render: function () {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;

        const radius = (size / 2) * 0.3;
        const outerRadius = (size / 2) * 0.7 * t + radius;
        const context = this.context;

        // Draw the outer circle.
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
        );
        context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
        context.fill();

        // Draw the inner circle.
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 100, 100, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // Update this image's data with data from the canvas.
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
        ).data;

        // Continuously repaint the map, resulting
        // in the smooth animation of the dot.
        map.triggerRepaint();

        // Return `true` to let the map know that the image was updated.
        return true;
    }
};


