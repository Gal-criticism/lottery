# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **3D Interactive Lottery Web Application** designed for corporate annual dinner events. It displays participants as rotating 3D cards arranged in a sphere, with animated drawing sequences and prize management capabilities.

**Technology Stack:**
- Frontend: Three.js + Vanilla JavaScript + Webpack 4
- Backend: Node.js + Express
- Data: Excel-based participant import/export

## Development Commands

### Frontend (product directory)
```bash
cd product

# Development with hot reload
npm run dev

# Production build
npm run build

# Start production server (after build)
npm run serve
```

### Backend (server directory)
```bash
cd server

# Install dependencies
npm install

# Start standalone server (port configurable)
node server.js [port]
```

### Full Application Setup
```bash
# Install all dependencies
cd server && npm install
cd ../product && npm install

# Build and run
cd product
npm run build
npm run serve
```

### Docker Deployment
```bash
# Build image
docker build -t lottery .

# Run container (exposes port 8080)
docker run -p 8080:8080 lottery

# Or use docker-compose
docker-compose up -d
```

## Architecture Overview

### Client-Server Separation
- **Frontend** (`product/`): 3D visualization using Three.js CSS3DRenderer
- **Backend** (`server/`): Express API for data management and Excel processing
- **Communication**: RESTful API endpoints for lottery operations

### Key Application Flow
1. **Data Loading**: Excel participant data (`server/data/users.xlsx`) loaded into 3D sphere
2. **3D Visualization**: Cards arranged using spherical coordinates with TrackballControls navigation
3. **Lottery Process**: Sequential prize drawing from lowest to highest tier with animations
4. **State Management**: Persistent storage of results with reset capabilities

### Core Modules
- `product/src/lottery/index.js` - Main application controller and lottery logic
- `product/src/lottery/config.js` - Frontend configuration constants
- `server/config.js` - Prize definitions and company branding
- `server/server.js` - Express API endpoints and Excel data processing

## Configuration

### Prize Setup
Edit `server/config.js`:
```javascript
const prizes = [
  {
    type: 1,           // Unique identifier
    count: 2,          // Number of prizes
    text: "特等奖",     // Prize name
    title: "神秘大礼",  // Prize description
    img: "../img/secrit.jpg" // Image path
  }
];

const EACH_COUNT = [1, 1, 5]; // How many to draw per round
const COMPANY = "MoShang";     // Company name on cards
```

### Participant Data
Update `server/data/users.xlsx` with participant information. File format and location cannot be changed.

### Prize Images
Add prize images to `product/src/img/` directory and reference in config.js.

## API Endpoints

The Express server provides REST endpoints for:
- `/users` - Get participant data
- `/prizes` - Get prize configuration
- `/lottery` - Lottery drawing operations
- `/export` - Export results to Excel
- `/reset` - Reset lottery state

## Development Notes

### Frontend Architecture
- Uses Three.js CSS3DRenderer for 3D card display (not WebGL)
- TWEEN.js handles smooth animations between states
- Modular structure with separate files for canvas utilities, prize management
- Event-driven architecture for user interactions

### State Management
- Server maintains lottery state in memory with file persistence
- Results automatically saved and persist through server restarts
- Only manual reset button clears lottery data
- Winners excluded from subsequent drawings

### Build System
- Webpack 4 with Babel transpilation for ES6+ support
- PostCSS with Autoprefixer for CSS processing
- Development server with hot reload on port 8080
- Production builds to `product/dist/` directory

## Testing and Debugging

- No formal test suite - manual testing through browser
- Use browser DevTools for frontend debugging
- Server logs output to console
- Excel import errors logged to error data structures