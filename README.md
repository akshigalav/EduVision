# EduVision AR – AI-Powered Augmented Reality Learning Assistant

EduVision AR is an interactive, web-based educational platform designed for spatial 3D learning and Web-based Augmented Reality (WebAR). It enables students to inspect complex anatomical and scientific concepts directly in the browser without requiring native app installations.

---

## Features

- **Phase 1: Modern Learning Interface**
  - Dark-mode, glassmorphic educational web portal.
  - Comprehensive curricula for Biology, Physics, Chemistry, and Mathematics.
  - Topic exploration pages with pedagogical concept breakdowns.

- **Phase 2: Interactive 3D Model Viewer (Three.js)**
  - WebGL-powered 3D organ rendering for the **Human Heart**.
  - **OrbitControls:** 360° mouse drag/touch rotation, pinch/scroll zoom, and camera reset.
  - **Cardiac Chambers Breakdown:** Dedicated interactive panels and 3D pinned hotspots for:
    - Left Atrium
    - Right Atrium
    - Left Ventricle
    - Right Ventricle
  - **Built-in Procedural Fallback:** Interactive 4-chamber anatomical 3D heart with rhythmic *lub-dub* pulse.
  - **Custom Model Support:** Drop any `.glb` or `.gltf` model into `public/models/heart.glb`.

- **Phase 3: Web-Based Augmented Reality (MindAR)**
  - Pure in-browser image tracking using **MindAR.js** and **Three.js**.
  - Camera viewfinder with cyberpunk scanning reticle and corner brackets.
  - Automatically anchors the 3D Human Heart model directly onto predefined target cards.
  - Target lock audio feedback using the Web Audio API.
  - **Simulation Mode:** Test the AR experience in virtual mode even without a physical webcam or printed card.
  - Downloadable & printable target cards located in `public/targets/`.

---

## Tech Stack

- **Frontend:** React 19, Vite, React Router v7
- **3D Graphics:** Three.js
- **Augmented Reality:** MindAR (Image Tracking)
- **Icons:** Lucide React
- **Styling:** Vanilla CSS with custom design system

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) (v18, v20, or v22+ recommended)
- Modern web browser (Chrome, Edge, or Safari) with webcam support

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/akshigalav/EduVision.git
   cd EduVision
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   - **Frontend & AI Backend together (Recommended):**
     ```bash
     npm run dev:all
     ```
   - **Frontend only:**
     ```bash
     npm run dev
     ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

> **Note on AI Tutor**: EduBot runs in Curriculum Demo Mode out of the box with zero configuration. To activate live Gemini 2.5 generation, either add `GEMINI_API_KEY=your_key` in `server/.env` or click the "Add Key" button in the chat interface.

---

## Project Structure

```
eduvision-ar/
├── public/
│   ├── models/            # 3D GLTF/GLB models (e.g. heart.glb)
│   ├── targets/           # MindAR target card images and compiled .mind files
│   └── favicon.svg
├── src/
│   ├── assets/            # Static image assets
│   ├── components/        # Reusable UI & 3D components
│   │   ├── HeartModelViewer.jsx
│   │   ├── HeartModelViewer.css
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── data/              # Subject, topic, and cardiac chamber data
│   │   ├── heartData.js
│   │   └── learningData.js
│   ├── pages/             # Route pages
│   │   ├── Home.jsx
│   │   ├── Subjects.jsx
│   │   ├── Topics.jsx
│   │   ├── Learning.jsx   # 3D Interactive Topic Page
│   │   └── ARView.jsx     # WebAR Viewfinder Page
│   ├── utils/
│   │   └── createHeart3DModel.js
│   ├── App.jsx            # Routing configuration
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

## How to Test the AR Feature

1. Navigate to `http://localhost:5173/learn/human-heart`.
2. Click **"Try AR"** below the 3D model viewport.
3. Allow camera permissions when prompted.
4. **Using a Phone or Printed Card:**
   - Click **"Target Card"** at top right.
   - Display `public/targets/heart-target.png` on your phone screen or print it.
   - Point your webcam at the image card. The 3D heart model will anchor to it.
5. **Using Virtual Simulation Mode:**
   - Click the **"Simulate"** button at top right to test the 3D heart model anchored to a virtual card.

---

## License

This project is licensed under the MIT License.
