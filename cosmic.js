// Create the scene, renderer, and initial camera
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a camera and set its position
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 50, 100);
camera.lookAt(scene.position);

// Add OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping (inertia)
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false; // Prevent panning up/down when zooming in/out

const textureLoader = new THREE.TextureLoader();

// Create a planet with texture
const createPlanet = (size, texturePath, distance) => {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const texture = textureLoader.load(texturePath);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const planet = new THREE.Mesh(geometry, material);
    planet.position.x = distance;
    return planet;
};

// Create a ring with texture
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

// Create the sun
const sun = createPlanet(5, 'textures/sun.jpg', 0);
scene.add(sun);

// Create the planets
const mercury = createPlanet(1, 'textures/mercury.jpg', 8);
const venus = createPlanet(1.2, 'textures/venus.jpg', 12);
const earth = createPlanet(1.3, 'textures/earth.jpg', 16);
const mars = createPlanet(1, 'textures/mars.jpg', 20);
const jupiter = createPlanet(2.5, 'textures/jupiter.jpg', 28);
const saturn = createPlanet(2, 'textures/saturn.jpg', 35);
const uranus = createPlanet(1.8, 'textures/uranus.jpg', 42);
const neptune = createPlanet(1.7, 'textures/neptune.jpg', 48);

// Create Saturn's rings
const saturnRings = createRing(2.5, 4, 'textures/saturn_rings.png', 35);

// Create groups for each planet to make them rotate around the sun
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
saturnGroup.add(saturnRings); // Add rings to Saturn's group
scene.add(saturnGroup);

const uranusGroup = new THREE.Group();
uranusGroup.add(uranus);
scene.add(uranusGroup);

const neptuneGroup = new THREE.Group();
neptuneGroup.add(neptune);
scene.add(neptuneGroup);

// Add a skybox with a galaxy texture
const createSkybox = (texturePath) => {
    const geometry = new THREE.SphereGeometry(1000, 60, 40);
    const texture = textureLoader.load(texturePath);
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide // Make the material visible from inside the sphere
    });
    const skybox = new THREE.Mesh(geometry, material);
    return skybox;
};

const skybox = createSkybox('textures/galaxy.jpg');
scene.add(skybox);

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);

    // Rotate each planet around the sun
    mercuryGroup.rotation.y += 0.01;
    venusGroup.rotation.y += 0.008;
    earthGroup.rotation.y += 0.006;
    marsGroup.rotation.y += 0.005;
    jupiterGroup.rotation.y += 0.003;
    saturnGroup.rotation.y += 0.002;
    uranusGroup.rotation.y += 0.0015;
    neptuneGroup.rotation.y += 0.001;

    controls.update(); // Update the controls

    renderer.render(scene, camera);
};

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Start the animation
animate();
