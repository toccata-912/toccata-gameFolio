/**
 * Retro 1980s/90s Desktop GUI Engine (Mobile Dynamic Edition)
 * Handles:
 * - Mobile responsive navigation hamburger toggle
 * - Procedural 1-Bit Dithered avatar (canvas pixel drawing)
 * - Platform switcher (Roblox vs. Unity systems, defaults to Roblox)
 * - Modal spec inspector widget on clicking system cards
 * - One-click Discord handle copy button
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. MOBILE RESPONSIVE HAMBURGER NAVIGATION
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const menubarNav = document.getElementById('menubarNav');

  if (mobileMenuBtn && menubarNav) {
    mobileMenuBtn.addEventListener('click', () => {
      menubarNav.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    menubarNav.querySelectorAll('.menu-item').forEach(link => {
      link.addEventListener('click', () => {
        menubarNav.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenuBtn.contains(e.target) && !menubarNav.contains(e.target)) {
        menubarNav.classList.remove('open');
      }
    });
  }

  // 2. PROCEDURAL 1-BIT DITHERED AVATAR (MacPaint style)
  const canvas = document.getElementById('avatarCanvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Dithered background (Bayer-like alternating pixel pattern)
    const imgData = ctx.createImageData(w, h);
    const data = imgData.data;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const isDither = (x + y) % 3 === 0;
        const color = isDither ? 0 : 255;
        data[idx] = color;     // R
        data[idx + 1] = color; // G
        data[idx + 2] = color; // B
        data[idx + 3] = 255;   // Alpha
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // 1-Bit Pixel Face & Headset (Brutalist dark silhouette)
    ctx.fillStyle = '#1E232A';

    // Head base silhouette
    ctx.fillRect(36, 32, 56, 68);

    // Face inner cut
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(40, 36, 48, 60);

    // Sunglasses
    ctx.fillStyle = '#1E232A';
    ctx.fillRect(44, 52, 18, 12);
    ctx.fillRect(66, 52, 18, 12);
    ctx.fillRect(60, 56, 8, 4); // Bridge

    // Glare on sunglasses
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(46, 54, 4, 4);
    ctx.fillRect(68, 54, 4, 4);

    // Smirk
    ctx.fillStyle = '#1E232A';
    ctx.fillRect(52, 80, 24, 4);
    ctx.fillRect(72, 76, 4, 4);

    // Headphones
    ctx.fillRect(30, 48, 8, 24);
    ctx.fillRect(90, 48, 8, 24);
    ctx.fillRect(34, 28, 60, 6);
  }

  // 3. PLATFORM SWITCHER (ROBLOX VS. UNITY SYSTEMS, DEFAULT TO ROBLOX)
  const filterBtns = document.querySelectorAll('.seg-btn');
  const systemCards = document.querySelectorAll('.system-subwindow[data-platform]');
  const countBadge = document.getElementById('systemCountBadge');
  const scrollPane = document.getElementById('systemsScrollPane');

  function setPlatformFilter(platform) {
    // Update active button state
    filterBtns.forEach(btn => {
      const isActive = btn.getAttribute('data-platform') === platform;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    let visibleCount = 0;
    systemCards.forEach(card => {
      const cardPlatform = card.getAttribute('data-platform');
      if (cardPlatform === platform) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Reset scroll position to top on filter change
    if (scrollPane) scrollPane.scrollTop = 0;

    // Update count indicator
    if (countBadge) {
      const platformName = platform === 'roblox' ? 'Roblox' : 'Unity';
      countBadge.textContent = `Showing ${visibleCount} ${platformName} Systems`;
    }
  }

  // Attach button click listeners
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const platform = btn.getAttribute('data-platform');
      setPlatformFilter(platform);
    });
  });

  // Initialize default to Roblox
  setPlatformFilter('roblox');

  // 4. DISCORD COPY TO CLIPBOARD BUTTON
  const copyBtn = document.getElementById('copyDiscordBtn');
  const discordHandle = document.getElementById('discordHandle');

  if (copyBtn && discordHandle) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = discordHandle.textContent.replace('@', '').trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '[ Copied! ✓ ]';
        copyBtn.style.backgroundColor = '#22C55E';
        copyBtn.style.color = '#FFFFFF';

        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.backgroundColor = '';
          copyBtn.style.color = '';
        }, 2000);
      }).catch(() => {
        copyBtn.textContent = '[ Press Ctrl+C ]';
      });
    });
  }

  // 5. TECHNICAL SPECIFICATIONS DATABASE (SYSTEM INSPECTOR WIDGET)
  const systemDatabase = {
    'sys-vehicle': {
      title: 'Modular Vehicle Building & Assembly System',
      platform: 'Platform: Roblox Luau // Physics & Construction Architecture',
      overview: 'An interactive sandbox vehicle construction framework featuring real-time grid snapping, directional part rotation, attachment point constraint generation, and seat/motor controller binding.',
      breakdown: [
        'Grid & Attachment Snapping: Custom raycast placement system with local-space bounding calculations, face snapping, and anti-overlap collision guards.',
        'Dynamic Constraint Assembly: Automatically constructs Welds, CylindricalConstraints, and SpringConstraints when linking wheels, motors, and chassis parts upon vehicle spawn.',
        'Client-Server Architecture: Client previews holographic placement locally; server validates piece inventory, positions, and instantiates the physics-active assembly.',
        'Seat Control & Throttle Integration: Custom vehicle seat driver mapping player WASD input directly into motor torque, steering servos, and suspension dampening.'
      ],
      tags: ['Luau', 'Physics Constraints', 'Grid Placement', 'Client Prediction', 'Vehicle Physics']
    },
    'sys-vehicle-save': {
      title: 'Vehicle Save & Load Serialization Pipeline',
      platform: 'Platform: Roblox Luau // DataStores & Profile Architecture',
      overview: 'A robust serialization and deserialization backend that encodes custom player-built vehicles, assemblies, and part graphs into lightweight compressed formats suitable for DataStore saving.',
      breakdown: [
        'Hierarchical Part Serialization: Traverses the entire vehicle Model tree, encoding relative CFrame offsets, part IDs, custom colors, and material attributes into a compressed array.',
        'Slot-Based Save Management: Supports multiple named vehicle save slots with thumbnail generation data, part count quotas, and cost validation.',
        'Atomic DataStore Transactions: Wraps save operations with session checks and retry mechanisms (UpdateAsync) to protect against data loss during server shutdowns.',
        'Reconstruction & Constraint Rebuilding: On load, rebuilds the physical model at the builder spawn pad, instantiates physics constraints, and connects drive logic seamlessly.'
      ],
      tags: ['Luau', 'DataStores', 'Serialization', 'CFrame Math', 'Save/Load Pipeline']
    },
    'sys-painting': {
      title: 'Part Painting & Surface Material System',
      platform: 'Platform: Roblox Luau // Tooling & Interactive Systems',
      overview: 'An interactive cosmetic customizer allowing players to dynamically paint vehicle and structure components with custom color palettes, hex inputs, and surface material properties.',
      breakdown: [
        'Targeted Raycast Highlighting: Highlights the targeted vehicle part on hover with an active outline/selection box, determining part ownership and validity.',
        'Dynamic Palette & Swatch Binding: Custom UI offering pre-selected color swatches, RGB spectrum sliders, and Roblox Enum.Material selections.',
        'Server-Authoritative Application: Client dispatches color/material payloads; server validates builder permissions and range before mutating part attributes.',
        'State Persistence Link: Mutated color and material properties update the vehicle assembly schema in real-time so changes persist across save and load sessions.'
      ],
      tags: ['Luau', 'Raycasting', 'Materials & Shaders', 'Networking', 'Customizer UI']
    },
    'sys-zombie-defence': {
      title: 'Zombie Defence Engine: Gunplay, Barricades & Custom AI',
      platform: 'Platform: Roblox Luau // Combat, Construction & AI Architecture',
      overview: 'A complete round-based survival defense system combining client-predicted gun mechanics, dynamic barricade/turret building, and custom zombie pathfinding that adapts to real-time player structures.',
      breakdown: [
        'Fast-Paced Gunplay: Raycast weapon controller featuring client prediction, recoil spring-math, ammo/reload state machines, and server damage verification with headshot multipliers.',
        'Real-Time Defensive Building: Snap-to-grid barricade and trap placement with structural integrity health pools, destruction physics, and repair interactions.',
        'Custom Zombie Pathfinding & Obstacle Flow: Custom pathfinding algorithm that navigates towards players while dynamically recalculating around or choosing to bash through newly placed barricades.',
        'Performance Horde Management: Throttles AI sensor ticks on distant zombies and utilizes bulk raycast pooling to ensure 60 FPS performance even during massive horde waves.'
      ],
      tags: ['Luau', 'Raycast Weapons', 'Custom Pathfinding', 'Horde AI', 'Building Mechanics']
    },
    'sys-lego-building': {
      title: 'Modular Stud Building & Physics Destruction System',
      platform: 'Platform: Roblox Luau // Voxel/Stud Physics & Structural Graphing',
      overview: 'A Lego-inspired modular building and dynamic structural destruction system featuring real-time stud grid alignment, multi-part connectivity graphing, and physics-driven explosive fracturing.',
      breakdown: [
        'Stud Grid Alignment & Attachment: Strict modular stud-and-tube snapping with rotational orientation checks, allowing brick placement in all 6 standard axes.',
        'Structural Graph & Island Detection: Maintains an adjacency graph of connected bricks; when critical support bricks are destroyed, severed sections dynamically un-weld and become physical unanchored debris.',
        'Explosive Impulse & Debris Physics: Projectile impact shockwaves calculate directional force vectors, detaching bricks within the blast radius and simulating dynamic tumble physics.',
        'Performance Memory Pooling: Reusable brick instances and automated debris lifetime culling prevent physics engine stall even with hundreds of fractured bricks.'
      ],
      tags: ['Luau', 'Modular Building', 'Destruction Physics', 'Adjacency Graph', 'Debris Simulation']
    },
    'sys-sidescroll-car': {
      title: '2.5D Side-Scrolling Vehicle Physics Engine',
      platform: 'Platform: Roblox Luau // 2D Constraint Physics & Camera Mathematics',
      overview: 'A physics-driven 2.5D side-scrolling driving system restricting vehicle degrees of freedom to a single 2D plane while maintaining realistic suspension damping, center-of-gravity pitch controls, and dynamic camera framing.',
      breakdown: [
        'Planar Motion Locking: Utilizes PlaneConstraints and custom orientation dampers to lock the vehicle to a strict 2D coordinate track without tipping sideways off the map.',
        'Simulated Wheel & Spring Suspension: CylindricalConstraints and SpringConstraints tuned to deliver realistic compression, rebound damping, and hill climbing traction.',
        'Airborne Pitch & Balance Control: Player directional inputs apply angular impulses while airborne, enabling flips, wheelie balancing, and smooth hill landing alignment.',
        'Smooth Tracking 2.5D Camera: Dynamic lerp camera with speed-based lookahead offset, zoom out on high velocities, and vertical bounding dampening.'
      ],
      tags: ['Luau', '2.5D Physics', 'Vehicle Constraints', 'Spring Dynamics', 'Camera Tracking']
    },
    'sys-traffic': {
      title: 'Autonomous Traffic AI & Road Node Network',
      platform: 'Platform: Roblox Luau // AI Waypoints & Graph Navigation',
      overview: 'An intelligent autonomous urban traffic simulation where NPC vehicles navigate connected road networks, follow traffic regulations, detect collisions, and yield at intersections.',
      breakdown: [
        'Node-Based Road Graph: Directional graph representation of roads, turns, and multiple lanes, allowing cars to choose dynamic random routes or targeted destinations.',
        'Forward Raycast Proximity Sensor: Multi-tier raycasts detect forward obstacles, braking when approaching slower traffic and coming to a smooth stop at red lights or blockages.',
        'Intersection Priority & Yield Protocol: Intersections manage reservation tokens preventing gridlock; cars detect incoming cross-traffic and yield until clear.',
        'Adaptive Speed & Lane Changes: Autonomous cars accelerate to the local road speed limit and query adjacent lanes for passing opportunities when blocked.'
      ],
      tags: ['Luau', 'AI Navigation', 'Graph Networks', 'Traffic Simulation', 'Raycast Proximity']
    },
    'sys-acrobatic-car': {
      title: 'Acrobatic Aerial Car & Stunt Physics Framework',
      platform: 'Platform: Roblox Luau // Aerobatics, Torque & Vehicle Dynamics',
      overview: 'An arcade-style high-agility vehicle controller inspired by Rocket League, empowering vehicles with mid-air pitch, roll, and yaw torque, double jumps, boost acceleration, and auto-righting ground recovery.',
      breakdown: [
        'Mid-Air Orientation Thrusters: Applies AngularVelocity and VectorForce impulses when wheels lose ground contact, giving the player responsive airborne acrobatics.',
        'Multi-Jump & Impulse Dodges: State machine tracking ground contact allowing timed double jumps and directional dodge flips with physics impulse bursts.',
        'Rocket Boost & Particle Dynamics: High-velocity LinearVelocity thruster system with trail emitters, velocity clamping, and fuel depletion/recharge logic.',
        'Ground Snap & Landing Assists: Proximity raycasts detect landing angles, optionally applying torque correction to land wheels-down seamlessly without rollover spinouts.'
      ],
      tags: ['Luau', 'Arcade Vehicle Physics', 'Airborne Torque', 'Impulse Mechanics', 'Stunt Engine']
    },
    'sys-combat': {
      title: 'Server-Authoritative Melee & Hitbox Pipeline',
      platform: 'Platform: Roblox Luau // Strict Netcode',
      overview: 'High-speed multiplayer combat architecture engineered to eliminate range-extenders, client hit spoofing, and high-latency sync issues.',
      breakdown: [
        'Client-Side Prediction: Client triggers attack swing and sound immediately for responsive feedback.',
        'Server Timestamp Validation: Attack payload snapshot includes ping offset; server rewinds positions.',
        'Raycast Line-of-Sight: Multi-point server casts verify zero obstacle occlusion between entities.',
        'Combo State Machine: Server guards combo chain windows, blocking rapid-fire macro execution.'
      ],
      tags: ['Luau', 'RaycastParams', 'Replication', 'Prediction', 'State Machine']
    },
    'sys-inventory': {
      title: 'Production Inventory & Data Pipeline',
      platform: 'Platform: Roblox Luau // ProfileService + Replica',
      overview: 'Session-locking datastore wrapper for high-concurrency games where item duplication or loss is unacceptable.',
      breakdown: [
        'Session-Locking Guard: Prevents simultaneous profile loading across multiple servers during teleports.',
        'Atomic Transaction Log: Inventory swaps execute in an atomic try-catch block with rollback protection.',
        'Incremental Replication: Uses ReplicaService to sync mutated indices instead of entire tables.',
        'Migration Guards: Versioning schema applies automatic schema updates to older player data.'
      ],
      tags: ['ProfileService', 'ReplicaService', 'Luau Types', 'Session Lock']
    },
    'sys-ability': {
      title: 'Modular Ability & Status Effect Pipeline',
      platform: 'Platform: Unity C# // ScriptableObjects',
      overview: 'Decoupled data-driven combat abilities with cooldown buffering and polymorphic actions.',
      breakdown: [
        'ScriptableObject Blueprints: Designers author spells, costs, and timeline events without C# code changes.',
        'Action Compositing: Modular execution nodes (SpawnProjectile, ApplyBuff, AreaOfEffect).',
        'Dynamic Buff Stacks: Tickable modifier pipeline recalculating character stats continuously.',
        'Pre-Buffering: Inputs triggered mid-animation automatically fire upon recovery frame.'
      ],
      tags: ['C#', 'ScriptableObjects', 'Buffering', 'Input System']
    },
    'sys-pet': {
      title: 'Client-Replicated Pet Follower Physics',
      platform: 'Platform: Roblox Luau // Hooke\'s Law Math',
      overview: 'Smooth spring-damper companion physics simulated strictly on client RenderStepped with zero server overhead.',
      breakdown: [
        'Zero Server Constraints: Eliminates AlignPosition/BodyMovers from consuming server physics cycles.',
        'RenderStepped Spring Math: Hooke\'s Law damping provides natural bobbing, banking, and bounce.',
        'Bezier Curve Travel: Flying pets navigate curved paths around obstacles when catching up.',
        'Distance LOD Culling: Throttles calculation ticks on far entities to protect mobile frame rates.'
      ],
      tags: ['Luau Math', 'Spring Damping', 'RenderStepped', 'LOD']
    },
    'sys-dialogue': {
      title: 'Branching Node Dialogue & Quest Engine',
      platform: 'Platform: Roblox Luau // Graph Nodes',
      overview: 'Signal-driven dialogue tree with rich-text typewriter animation and quest state hooks.',
      breakdown: [
        'Node Graph Parser: Nested table structure evaluating player prerequisites (reputation, items).',
        'UTF-8 Typewriter: Safely streams text without splitting multibyte characters or BBCode markup.',
        'Observer Signals: Choice nodes dispatch event signals directly to decoupled quest managers.'
      ],
      tags: ['Luau', 'GoodSignal', 'UI Tween', 'RichText']
    },
    'sys-ai': {
      title: 'Hierarchical AI Perception & FSM',
      platform: 'Platform: Unity C# // Tactical Enemy AI',
      overview: 'Tactical state machine with raycast vision cones and acoustic listener events.',
      breakdown: [
        'Hierarchical FSM: Decouples root states (Peaceful, Suspicious, Combat) into child routines.',
        'Sensory Perception: Vision frustum raycasting combined with an acoustic alert event bus.',
        'NavMesh Path Flanking: Dynamic waypoint traversal with path smoothing and cover alignment.'
      ],
      tags: ['C#', 'NavMesh', 'HFSM', 'Perception Cones']
    }
  };

  // 6. MODAL INSPECTOR LOGIC
  const modalOverlay = document.getElementById('specModalOverlay');
  const modalHeading = document.getElementById('specModalHeading');
  const modalPlatform = document.getElementById('specModalPlatform');
  const modalOverview = document.getElementById('specModalOverview');
  const modalList = document.getElementById('specModalList');
  const modalTags = document.getElementById('specModalTags');
  const modalClose = document.getElementById('specModalClose');
  const modalDoneBtn = document.getElementById('specModalDoneBtn');

  function openSpecModal(systemId) {
    const data = systemDatabase[systemId];
    if (!data || !modalOverlay) return;

    modalHeading.textContent = data.title;
    modalPlatform.textContent = data.platform;
    modalOverview.textContent = data.overview;

    modalList.innerHTML = data.breakdown.map(item => `<li>${item}</li>`).join('');
    modalTags.innerHTML = data.tags.map(t => `<span class="retro-tag">${t}</span>`).join('');

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeSpecModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      modalOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.system-subwindow').forEach(card => {
    card.addEventListener('click', () => {
      const sysId = card.getAttribute('data-system-id');
      openSpecModal(sysId);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeSpecModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeSpecModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeSpecModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeSpecModal();
    }
  });
});
