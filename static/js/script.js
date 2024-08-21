const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 50, 100);
camera.lookAt(scene.position);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;

const textureLoader = new THREE.TextureLoader();

const createPlanet = (size, texturePath, distance) => {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const texture = textureLoader.load(texturePath);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const planet = new THREE.Mesh(geometry, material);
    planet.position.x = distance;
    return planet;
};

const createRing = (innerRadius, outerRadius, texturePath, distance) => {
    const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 64);
    const texture = textureLoader.load(texturePath);
    const material = new THREE.MeshBasicMaterial({ 
        map: texture, 
        side: THREE.DoubleSide, 
        transparent: true 
    });
    const ring = new THREE.Mesh(geometry, material);
    ring.position.x = distance;
    ring.rotation.x = -Math.PI / 2;
    return ring;
};

const sun = createPlanet(5, 'static/textures/sun.jpg', 0);
scene.add(sun);

const mercury = createPlanet(1, 'static/textures/mercury.jpg', 8);
const venus = createPlanet(1.2, 'static/textures/venus.jpg', 12);
const earth = createPlanet(1.3, 'static/textures/earth.jpg', 16);
const mars = createPlanet(1, 'static/textures/mars.jpg', 20);
const jupiter = createPlanet(2.5, 'static/textures/jupiter.jpg', 28);
const saturn = createPlanet(2, 'static/textures/saturn.jpg', 35);
const uranus = createPlanet(1.8, 'static/textures/uranus.jpg', 42);
const neptune = createPlanet(1.7, 'static/textures/neptune.jpg', 48);

const saturnRings = createRing(2.5, 4, 'static/textures/saturn_rings.png', 35);

const mercuryGroup = new THREE.Group();
mercuryGroup.add(mercury);
scene.add(mercuryGroup);

const venusGroup = new THREE.Group();
venusGroup.add(venus);
scene.add(venusGroup);

const earthGroup = new THREE.Group();
earthGroup.add(earth);
scene.add(earthGroup);

const marsGroup = new THREE.Group();
marsGroup.add(mars);
scene.add(marsGroup);

const jupiterGroup = new THREE.Group();
jupiterGroup.add(jupiter);
scene.add(jupiterGroup);

const saturnGroup = new THREE.Group();
saturnGroup.add(saturn);
saturnGroup.add(saturnRings);
scene.add(saturnGroup);

const uranusGroup = new THREE.Group();
uranusGroup.add(uranus);
scene.add(uranusGroup);

const neptuneGroup = new THREE.Group();
neptuneGroup.add(neptune);
scene.add(neptuneGroup);

const createSkybox = (texturePath) => {
    const geometry = new THREE.SphereGeometry(1000, 60, 40);
    const texture = textureLoader.load(texturePath);
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide 
    });
    const skybox = new THREE.Mesh(geometry, material);
    return skybox;
};

const skybox = createSkybox('static/textures/galaxy.jpg');
scene.add(skybox);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedPlanet = null;

// Modify the planets array to include audio paths
const planets = [
    { 
        name: 'Mercury', 
        object: mercury, 
        info: 'Mercury is the closest planet to the Sun and the smallest in the Solar System. In English, it is named after the ancient Roman god Mercurius (Mercury), god of commerce and communication, and the messenger of the gods.', 
        audio: 'static/audio/mercury.mp3', 
        gif: 'static/gifs/mercury.gif',
        details: {
            diameter: '4,879 km',
            mass: '3.30 × 10^23 kg',
            moons: '0',
            distanceFromSun: '57.9 million km',
            orbitalPeriod: '88 days',
            surfaceTemperature: '-173 to 427°C',
            gravity: '3.7 m/s²'
        }
    },
    // Add similar objects for Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune...
    { 
        name: 'Venus', 
        object: venus, 
        info: 'Venus is the second planet from the Sun. It is a terrestrial planet and is the closest in mass and size to its orbital neighbour Earth. ', 
        audio: 'static/audio/venus.mp3', 
        gif: 'static/gifs/venus.gif',
        details: {
            diameter: '12,104 km',
            mass: '4.87 × 10^24 kg',
            moons: '0',
            distanceFromSun: '108.2 million km',
            orbitalPeriod: '225 days',
            surfaceTemperature: '462°C',
            gravity: '8.87 m/s²'
        }
    },
    { 
        name: 'Earth', 
        object: earth, 
        info: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. It has one natural satellite, the Moon.', 
        audio: 'static/audio/earth.mp3', 
        gif: 'static/gifs/earth.gif',
        details: {
            diameter: '12,742 km',
            mass: '5.97 × 10^24 kg',
            moons: '1 (The Moon)',
            distanceFromSun: '149.6 million km',
            orbitalPeriod: '365.25 days',
            surfaceTemperature: '-88 to 58°C',
            gravity: '9.8 m/s²'
        }
    },
    { 
        name: 'Mars', 
        object: mars, 
        info: 'Mars is the fourth planet from the Sun and is often referred to as the "Red Planet" due to its reddish appearance. It has two small moons, Phobos and Deimos.', 
        audio: 'static/audio/mars.mp3', 
        gif: 'static/gifs/mars.gif',
        details: {
            diameter: '6,779 km',
            mass: '0.64171 × 10^24 kg',
            moons: '2 (Phobos and Deimos)',
            distanceFromSun: '227.9 million km',
            orbitalPeriod: '687 days',
            surfaceTemperature: '-87 to -5°C',
            gravity: '3.71 m/s²'
        }
    },
    { 
        name: 'Jupiter', 
        object: jupiter, 
        info: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets combined.', 
        audio: 'static/audio/jupiter.mp3', 
        gif: 'static/gifs/jupiter.gif',
        details: {
            diameter: '139,820 km',
            mass: '1.898 × 10^27 kg',
            moons: '79 (including Ganymede, the largest moon in the Solar System)',
            distanceFromSun: '778.5 million km',
            orbitalPeriod: '12 years',
            surfaceTemperature: '-108°C',
            gravity: '24.79 m/s²'
        }
    },
    { 
        name: 'Saturn', 
        object: saturn, 
        info: 'Saturn is the sixth planet from the Sun and is known for its extensive ring system, which is composed mostly of ice particles, rocky debris, and dust.', 
        audio: 'static/audio/saturn.mp3', 
        gif: 'static/gifs/saturn.gif',
        details: {
            diameter: '116,460 km',
            mass: '5.683 × 10^26 kg',
            moons: '83 (including Titan, the second-largest moon in the Solar System)',
            distanceFromSun: '1.434 billion km',
            orbitalPeriod: '29.5 years',
            surfaceTemperature: '-139°C',
            gravity: '10.44 m/s²'
        }
    },
    { 
        name: 'Uranus', 
        object: uranus, 
        info: 'Uranus is the seventh planet from the Sun and is unique in that it rotates on its side. It has a faint ring system and 27 known moons.', 
        audio: 'static/audio/uranus.mp3', 
        gif: 'static/gifs/uranus.gif',
        details: {
            diameter: '50,724 km',
            mass: '8.681 × 10^25 kg',
            moons: '27 (including Titania, Oberon, and Miranda)',
            distanceFromSun: '2.871 billion km',
            orbitalPeriod: '84 years',
            surfaceTemperature: '-195°C',
            gravity: '8.69 m/s²'
        }
    },
    { 
        name: 'Neptune', 
        object: neptune, 
        info: 'Neptune is the eighth and farthest planet from the Sun in the Solar System. It is known for its deep blue color and strong winds.', 
        audio: 'static/audio/neptune.mp3', 
        gif: 'static/gifs/neptune.gif',
        details: {
            diameter: '49,244 km',
            mass: '1.024 × 10^26 kg',
            moons: '14 (including Triton, which has geysers of liquid nitrogen)',
            distanceFromSun: '4.495 billion km',
            orbitalPeriod: '165 years',
            surfaceTemperature: '-201°C',
            gravity: '11.15 m/s²'
        }
    },
                            
];

document.addEventListener('mousedown', onDocumentMouseDown, false);

function onDocumentMouseDown(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(planets.map(p => p.object));

    if (intersects.length > 0) {
        const selected = intersects[0].object;
        selectedPlanet = planets.find(p => p.object === selected);
        
        if (selectedPlanet) {
            displayPlanetInfo(selectedPlanet);
        }
    }
}

// Global variables for audio
let currentAudio = null;

// Function to play audio for a selected planet
function playPlanetAudio(audioPath) {
    // Stop any currently playing audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // Create a new audio element and play it
    currentAudio = new Audio(audioPath);
    currentAudio.play();
}

// Updated displayPlanetInfo function to include audio
function displayPlanetInfo(planet) {
    const sidebar = document.getElementById('sidebar');
    const planetName = document.getElementById('planetName');
    const planetInfo = document.getElementById('planetInfo');
    const planetGif = document.getElementById('planetGif');
    const planetDetailsTable = document.getElementById('planetDetails');

    planetName.textContent = planet.name;
    planetInfo.textContent = planet.info;
    planetGif.src = planet.gif;

    // Populate the details table
    planetDetailsTable.innerHTML = `
        <tr><th>Diameter</th><td>${planet.details.diameter}</td></tr>
        <tr><th>Mass</th><td>${planet.details.mass}</td></tr>
        <tr><th>Moons</th><td>${planet.details.moons}</td></tr>
        <tr><th>Distance from Sun</th><td>${planet.details.distanceFromSun}</td></tr>
        <tr><th>Orbital Period</th><td>${planet.details.orbitalPeriod}</td></tr>
        <tr><th>Surface Temperature</th><td>${planet.details.surfaceTemperature}</td></tr>
        <tr><th>Gravity</th><td>${planet.details.gravity}</td></tr>
    `;

    sidebar.style.display = 'block';

    if (selectedPlanet) {
        scene.remove(selectedPlanet.label);
    }

    planet.label = createLabel(planet.name);
    planet.label.position.copy(planet.object.position);
    planet.label.position.y += 3;

    scene.add(planet.label);

    // Play the audio associated with the selected planet
    playPlanetAudio(planet.audio);
}




document.addEventListener('mousedown', onDocumentMouseDown, false);

function onDocumentMouseDown(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(planets.map(p => p.object));

    if (intersects.length > 0) {
        const selected = intersects[0].object;
        selectedPlanet = planets.find(p => p.object === selected);
        
        if (selectedPlanet) {
            displayPlanetInfo(selectedPlanet);
        }
    }
}

function createLabel(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = 'Bold 20px Arial';
    context.fillStyle = 'white';
    context.fillText(text, 0, 20);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);

    return sprite;
}

const animate = () => {
    requestAnimationFrame(animate);

    mercuryGroup.rotation.y += 0.01;
    venusGroup.rotation.y += 0.008;
    earthGroup.rotation.y += 0.006;
    marsGroup.rotation.y += 0.005;
    jupiterGroup.rotation.y += 0.003;
    saturnGroup.rotation.y += 0.002;
    uranusGroup.rotation.y += 0.0015;
    neptuneGroup.rotation.y += 0.001;

    if (selectedPlanet && selectedPlanet.label) {
        selectedPlanet.label.position.copy(selectedPlanet.object.position);
        selectedPlanet.label.position.y += 3;
    }

    controls.update();
    renderer.render(scene, camera);
};

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

animate();
