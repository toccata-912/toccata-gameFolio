# Asset Directory Guide for Toccata's GameDev Portfolio

Drop your media files into these dedicated directories. The website supports local images (`.png`, `.jpg`, `.webp`), looping video clips (`.mp4`, `.webm`, `.gif`), and embedded YouTube videos.

---

### Folder Structure Overview

```text
toccata-gameFolio/
├── pictures/
│   └── pfp.png                     <-- Profile Picture (Already Linked in Hero!)
│
└── assets/
    ├── systems/                    <-- Media for Section 1 (Systems Catalogue)
    │   ├── combat.mp4 (or .gif)
    │   ├── inventory.mp4 (or .gif)
    │   ├── pet-math.mp4 (or .gif)
    │   └── ...
    │
    ├── games/                      <-- Media for Section 2 (Full Games)
    │   ├── rogue-blade.png (or .mp4)
    │   ├── echoes-eden.png (or .mp4)
    │   └── velocity-rush.png (or .mp4)
    │
    ├── random/                     <-- Media for Section 3 (UI, 3D, 2D)
    │   ├── rpg-hud.png
    │   ├── weapons-3d.png
    │   ├── shaders.mp4 (or .gif)
    │   └── radial-menu.png (or .mp4)
    │
    └── videos/                     <-- Optional standalone long gameplay reels
```

---

### How to embed each media type in `index.html`:

#### 1. Local Video / GIF (Recommended for Systems)
Looping, muted, autoplaying video clips give the smoothest 60 FPS performance without bulky `.gif` file sizes:

```html
<!-- In any crt-media-frame box: -->
<div class="crt-media-frame">
  <video src="assets/systems/combat.mp4" autoplay loop muted playsinline class="media-video"></video>
</div>
```

Or if you have a `.gif`:
```html
<div class="crt-media-frame">
  <img src="assets/systems/combat.gif" alt="Combat System Preview" class="media-img" />
</div>
```

#### 2. Local Screenshot or Picture (Great for Games & 3D / UI)
```html
<div class="crt-media-frame">
  <img src="assets/games/rogue-blade.png" alt="Rogue Blade Gameplay" class="media-img" />
</div>
```

#### 3. YouTube Video Embed (Responsive 16:9)
Replace the video frame with a standard YouTube embed:
```html
<div class="crt-media-frame video-responsive">
  <iframe 
    src="https://www.youtube-nocookie.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=YOUR_VIDEO_ID" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>
```
*(Tip: Replace `YOUR_VIDEO_ID` with the code at the end of your YouTube URL, e.g. `dQw4w9WgXcQ`)*
