# COSMIC: Interactive 3D Solar System

#### Overview

This project is an interactive 3D model of the solar system built with Three.js, integrated into a Flask web application. The project features an intuitive sidebar that displays detailed information about each planet, including physical characteristics, distance from the Sun, and an accompanying GIF and audio file. The application supports enhanced touch interaction via Hammer.js, making it suitable for both desktop and mobile devices.

#### Features

- **3D Solar System Model**: An interactive 3D model of the solar system using Three.js.
- **Planet Information Sidebar**: Displays detailed information, including a table of physical characteristics and a GIF for each planet.
- **Audio Integration**: Each planet has an associated audio file that can be played when the planet is selected.
- **Mobile Friendly**: Includes a close button for the sidebar and enhanced touch gestures with Hammer.js.
- **Touch Gesture Controls**: Pinch to zoom, swipe to rotate, and tap to select a planet.

#### Prerequisites

- Python 3.x
- Flask
- Three.js (included via CDN)
- Hammer.js (included via CDN)

#### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/alanmaizon/cosmic.git
   cd solar-system
   ```

2. **Install Flask**:
   ```bash
   pip install flask
   ```

3. **Download Necessary Assets**:
   Place the following files in the `static` directory:
   - Planet textures (e.g., `earth.jpg`, `mars.jpg`)
   - GIFs for each planet (e.g., `earth.gif`, `mars.gif`)
   - Audio files for each planet (e.g., `earth.mp3`, `mars.mp3`)
   - `nasa.otf` font file (optional)

4. **Run the Flask application**:
   ```bash
   flask run
   ```
   The application will be available at `http://127.0.0.1:5000`.

#### File Structure

```plaintext
solar-system/
│
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── three.min.js
│   │   ├── OrbitControls.js
│   │   ├── script.js
│   │   └── hammer.min.js
│   ├── textures/
│   │   ├── earth.jpg
│   │   ├── mars.jpg
│   │   └── ... (other textures)
│   ├── gifs/
│   │   ├── earth.gif
│   │   └── ... (other GIFs)
│   ├── audio/
│   │   ├── earth.mp3
│   │   └── ... (other audio files)
│   └── fonts/
│       └── nasa.otf
│
├── templates/
│   └── index.html
│
└── app.py
```

#### Usage

- **Desktop**: Click on a planet to view detailed information in the sidebar. Use the mouse to rotate the scene and the scroll wheel to zoom.
- **Mobile**: Tap on a planet to view its details. Swipe to rotate the solar system, pinch to zoom, and tap the close button to hide the sidebar.

#### Future Enhancements

- Add more detailed planetary data.
- Implement additional touch gestures for more intuitive controls.
- Add animation effects when selecting or transitioning between planets.

---

## Test and Debugging Report

### 1. **Initial Setup and Configuration**

- **Issue**: Setting up the Flask application and integrating Three.js and Hammer.js.
  - **Solution**: Verified that all required assets (textures, GIFs, audio files) were correctly placed in the `static` directory. Configured Flask to serve these static files.

### 2. **3D Model Rendering**

- **Issue**: Three.js was throwing a warning: `THREE.Quaternion: .inverse() has been renamed to invert()`.
  - **Solution**: Updated the Three.js code to use `.invert()` instead of `.inverse()`. This resolved the deprecation warning.

### 3. **Audio File Loading**

- **Issue**: Audio files were not loading, resulting in 404 errors.
  - **Solution**: Verified that the audio files were correctly placed in the `static/audio/` directory. Also ensured the file paths in the code were correct. 

### 4. **Hammer.js Gesture Integration**

- **Issue**: Gestures were not responding as expected on mobile devices.
  - **Solution**: Adjusted the sensitivity of gestures in Hammer.js settings. Added media queries to handle different screen sizes and ensure smooth interaction.

### 5. **Sidebar Behavior on Mobile**

- **Issue**: Sidebar was too large on smaller screens, and the close button was not visible.
  - **Solution**: Implemented a media query to show the close button only on screens smaller than 768px. Adjusted the sidebar size and made the background translucent to improve readability.

### 6. **Table Display Issues**

- **Issue**: The table displaying planet information was not displaying correctly on mobile devices.
  - **Solution**: Added responsive CSS to ensure the table was scrollable on smaller screens. Made the background translucent to enhance readability while preserving the 3D scene visibility.

### 7. **Testing Across Devices**

- **Tested on**:
  - **Desktop**: Windows, macOS (Chrome, Firefox, Safari)
  - **Mobile**: iOS, Android (Safari, Chrome)
- **Results**: 
  - Touch gestures were responsive and intuitive on mobile.
  - 3D rendering was smooth across tested devices.
  - Audio files played correctly and stopped when switching planets.
  - The sidebar was fully functional, with the close button visible and responsive on mobile.

### 8. **Future Testing Considerations**

- **Performance**: Test with a higher number of objects and more complex shaders to assess performance on lower-end devices.
- **Cross-Browser Compatibility**: Test additional browsers, especially on older versions, to ensure consistent behavior.

--

## Future development plan

### 1. **Planetary Animations and Orbital Paths**
   - **Orbital Paths**: Add visual orbital paths around the Sun for each planet. This helps users understand the relative distances and motion of the planets within the solar system.
   - **Animations**: Animate the planets' rotation around their axes and revolution around the Sun to simulate real-time motion. This could be slowed down to be visually engaging while still educational.

### 2. **Dynamic Lighting**
   - Introduce dynamic lighting to simulate the Sun's illumination on the planets. This would create more realistic shadows and highlights, enhancing the visual appeal.
   - Implement day-night cycles for planets like Earth, showing the transition from day to night.

### 3. **Educational Content Integration**
   - **Tooltips**: Add tooltips that appear when users hover over or tap on planets, providing quick facts or trivia.
   - **Interactive Quizzes**: Integrate short quizzes or educational challenges related to the solar system. Users could answer questions based on the information displayed in the sidebar.

### 4. **Expand Audio and Visual Elements**
   - **Ambient Space Sounds**: Add ambient space sounds or background music that plays continuously while exploring the solar system. This could make the experience more immersive.
   - **Planetary Sounds**: Expand on the audio feature by including unique sounds or audio narrations that provide interesting facts about each planet when selected.

### 5. **VR and AR Support**
   - **Virtual Reality (VR)**: Consider adding VR support using WebXR, allowing users to explore the solar system in virtual reality with a headset.
   - **Augmented Reality (AR)**: Implement AR features using libraries like `AR.js` or `A-Frame`, enabling users to visualize the solar system in their physical environment through their smartphone cameras.

### 6. **Responsive UI Improvements**
   - **Advanced UI Adjustments**: Implement more advanced UI adjustments for different screen sizes, such as collapsible menus or floating buttons, to make the interface more user-friendly on various devices.
   - **Dark Mode**: Introduce a dark mode toggle, which could be especially useful for users exploring the solar system in low-light environments.

### 7. **Data Visualization and Comparisons**
   - **Interactive Charts**: Include interactive charts or graphs that compare different planetary characteristics, such as size, mass, and distance from the Sun.
   - **Scale Models**: Allow users to switch between scale models and exaggerated models (e.g., to better visualize smaller planets like Mercury or larger planets like Jupiter).

### 8. **Save and Share Features**
   - **Save Views**: Let users save specific views or configurations of the solar system to revisit later. This could be particularly useful in educational settings.
   - **Sharing Options**: Provide social media sharing options, allowing users to share snapshots or interesting facts about planets directly from the app.

### 9. **Backend Enhancements**
   - **Database Integration**: Integrating a database to store user preferences, quiz scores, or even dynamically fetched planetary data (e.g., from NASA APIs).
   - **User Accounts**: Implement user accounts where users can save their progress, track their learning, and customize their experience.

### 10. **Performance Optimization**
   - **Lazy Loading**: Implement lazy loading for textures and models to improve initial load times, especially on slower connections.
   - **Web Workers**: Utilize Web Workers to handle complex calculations or rendering tasks, keeping the main thread responsive.

### 11. **Accessibility Features**
   - **Screen Reader Support**: Ensure that the app is accessible to visually impaired users by adding ARIA labels and screen reader support.
   - **Keyboard Navigation**: Implement comprehensive keyboard navigation for users who rely on keyboards instead of touch or mouse input.

### 12. **Community and Collaboration**
   - **Open Source**: Making the project open source to encourage community contributions. This could lead to new features, improvements, and educational content.
   - **Collaborations**: Reach out to educators or planetariums who might be interested in using your project as a teaching tool or part of their exhibitions.
