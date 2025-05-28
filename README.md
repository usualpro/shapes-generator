# Shapes Generator

A minimalist visual editor. This project allows users to create and manipulate a scene composed of random rectangular shapes using TypeScript, React, and the Canvas 2D API (via react-konva). The editor features a responsive interface with a canvas for rendering shapes and a control panel for user interactions.

## Features

- **Add Random Rectangles**: Generate rectangular shapes with random position, rotation, dimensions, and color, utilizing the full canvas space.
- **Change Rectangle Colors**: Modify the color of rectangles dynamically.
- **Play Animation**: Rotate all shapes 360° clockwise around their centers with a user-specified duration.
- **Set Animation Duration**: Specify the animation duration in seconds via a control panel input.
- **Download Scene Data**: Export the scene's data as a JSON file.
- **Import Scene Data**: Import the scene's data and display the rectangular shapes.
- **Responsive Design**: The interface adapts to window resizing, ensuring usability across different screen sizes.

## Tech Stack

- **TypeScript**: For type-safe JavaScript development.
- **React**: For building the user interface and managing component state.
- **react-konva**: For rendering and manipulating shapes on a 2D canvas.
- **GSAP**: For smooth animation of shape rotations.
- **Zustand**: For lightweight state management.
- **Tailwind CSS & DaisyUI**: For styling the control panel and ensuring a responsive layout.
- **Zod**: For input validation (e.g., animation duration).
- **Vite**: For fast development and production builds.
- **ESLint**: For code linting and maintaining code quality.

## Prerequisites

- **Node.js**: Version 18 or higher.
- **npm**: Version 8 or higher (comes with Node.js).

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/usualpro/shapes-generator.git
   cd shapes-generator
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (or another port if specified).

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Preview the Production Build**:
   ```bash
   npm run preview
   ```

6. **Lint the Code**:
   ```bash
   npm run lint
   ```

## Usage

1. **Add a Rectangle**: Click the "Add Rectangle" button to add a new rectangular shape with random properties to the canvas.
2. **Change Colors**: Select a rectangle to modify its color (implementation-specific, e.g., via a color picker or predefined options).
3. **Set Animation Duration**: Enter a duration (in seconds) in the duration field to control the speed of the rotation animation.
4. **Play Animation**: Click the "Play Animation" button to rotate all shapes 360° clockwise around their centers.
5. **Download Scene**: Click the "Download Project" button to export the current scene as a JSON file.

## Project Structure

- **`src/`**: Contains the source code, including React components, state management, and TypeScript types.
- **`public/`**: Static assets for the project.
- **`dist/`**: Output directory for production builds.
- **`vite.config.ts`**: Vite configuration for the build process.

## Notes
- The scene data is not persisted between page reloads, as specified.
- Rectangles may overlap, and their properties (position, rotation, dimensions, color) are randomized within the canvas bounds.
- The duration field is validated to ensure a non-empty numeric input.