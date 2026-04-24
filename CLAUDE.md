# Kenwood KR-9400 — 3D Explorer

A web-based 3D interactive viewer for a Kenwood KR-9400 vintage stereo receiver (1975, 120W/ch).

## Goal
Let users explore the receiver in 3D, open the top cover, click components, and read descriptions of how each part works plus diagnostic tips.

## Stack
Plain HTML/CSS/JS — no build step. Three.js r160 loaded via importmap from CDN.

## Project Files
- `index.html` — entry point with importmap
- `css/style.css` — dark hi-fi themed UI
- `js/data.js` — component database (17 components with descriptions + diagnostic tips)
- `js/model.js` — `StereoModel` class: procedural Three.js geometry of the KR-9400
- `js/app.js` — `StereoExplorer` class: scene, camera, lights, orbit controls, raycasting, UI
- `model/Kenwood9400v0.glb` — Blender-exported GLB model (added 2026-04-24)

## How to Run
```
python3 -m http.server 8742
```
Must be served over HTTP — importmaps don't work over `file://`.

## Current State (2026-04-24)
- First version complete: external components, interactive lid open/close, internal components visible when lid opens, VU needle animation
- Blender GLB model (`Kenwood9400v0.glb`) has been added — integration with the Three.js scene is the next step
- Planned: more detailed model, diagnostic mode, model accuracy improvements
