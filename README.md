- Scene, Camera, and Renderer Initialization:

The scene, camera, and renderer are created and initialized.
The camera's position is set to view the entire solar system.

- Adding OrbitControls:

OrbitControls is added to the camera to enable orbiting, panning, and zooming functionalities.
enableDamping and dampingFactor are set to provide smooth control movements.

- Texture Loader:

THREE.TextureLoader is used to load textures for the planets and the sun.

- Create Planets and Groups:

The createPlanet function now takes an additional texturePath argument, which is used to load the texture for each planet.
Planets are created with textures and added to their respective groups to facilitate rotation around the sun.

- Create Saturn's Rings:

The createRing function creates a ring geometry and applies a texture to it.
The ring is positioned and rotated to align with Saturn's orientation.

- Animation Loop:

The animate function updates the rotation of each planet's group and calls controls.update() to update the controls on each frame.
The scene is rendered using the camera.

- Window Resize Handling:

When the window is resized, the aspect ratio of the camera is updated, and the renderer's size is adjusted accordingly.
