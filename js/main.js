/**
 * Main Interactive Portfolio Script
 * - Smooth navigation & mobile drawer
 * - Interactive System Spec Widget (Click card -> Opens detailed architectural breakdown)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Close mobile nav on click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
      }
    });
  });

  // Systems Technical Specifications (Widget Database)
  const systemsSpecs = {
    'sys-combat': {
      title: 'Server-Authoritative Melee & Hitbox System',
      platform: 'Roblox Luau • Anti-Exploit Combat Networking',
      overview: 'A high-speed melee combat architecture built to eliminate client spoofing, reach-extender exploits, and hit desync over high-latency connections.',
      howItWasMade: [
        '<strong>Client-Side Prediction:</strong> Client immediately triggers attack animations, swing trails, and screen juice without waiting for a server round-trip, keeping inputs feeling instant.',
        '<strong>Snapshot Interpolation & Ping Compensation:</strong> The client sends an attack packet with target timestamps. The server rolls back victim bounding positions by attacker latency to confirm reach accuracy.',
        '<strong>Server-Cast Line-of-Sight:</strong> Multi-point raycasts verify unobstructed line of sight between attacker PrimaryPart and victim bounding box to prevent wall-hacking.',
        '<strong>Combo State Machine:</strong> Server tracks player action states to enforce cooldown windows and combo chains, blocking rapid-fire macro tools.'
      ],
      technologies: ['Luau', 'RaycastParams', 'TweenService', 'State Machine', 'Client Prediction']
    },
    'sys-inventory': {
      title: 'Production Inventory & Data Sync Pipeline',
      platform: 'Roblox Luau • ProfileService & ReplicaService',
      overview: 'A bulletproof, transactional inventory and player data backend engineered for high concurrent player counts where duplication and data loss cannot occur.',
      howItWasMade: [
        '<strong>Session-Locking Guard:</strong> Uses ProfileService to prevent multiple game servers from loading the same profile simultaneously during rapid player teleportation.',
        '<strong>Atomic Item Operations:</strong> All item moves, swaps, and trade transactions are performed in isolated atomic locks. If any assert fails, the state rolls back cleanly.',
        '<strong>Optimized Client Replication:</strong> Integrates ReplicaService to replicate only modified sub-keys instead of transmitting entire data dictionaries on every update.',
        '<strong>Data Migration Schema:</strong> Version-tagged player profiles automatically apply patch migrations when updates add new item formats or adjust stats.'
      ],
      technologies: ['ProfileService', 'ReplicaService', 'Luau Strict Typing', 'Rojo']
    },
    'sys-ability': {
      title: 'ScriptableObject Ability & Buff Framework',
      platform: 'Unity C# • Data-Driven Architecture',
      overview: 'A decoupled combat ability and status effect system allowing game designers to construct spells, passives, and buffs without modifying core codebase.',
      howItWasMade: [
        '<strong>Data-Driven Definitions:</strong> Spells and passives are authored as ScriptableObject assets containing cooldown, cost, animations, and timeline event tracks.',
        '<strong>Polymorphic Action Execution:</strong> Uses an execution node pattern where abilities composite modular tasks (e.g., SpawnProjectile, ApplyBuff, AreaOfEffect).',
        '<strong>Dynamic Status Effect Pipeline:</strong> Stackable buffs/debuffs (burn, freeze, speed modifiers) utilize ticking tickables that recalculate final character stat values in real-time.',
        '<strong>Input Buffering:</strong> Pre-buffers abilities activated mid-animation, automatically executing them the frame recovery frames finish.'
      ],
      technologies: ['C#', 'ScriptableObjects', 'Input System', 'Unity URP']
    },
    'sys-pet': {
      title: 'Client-Replicated Pet Follower Physics',
      platform: 'Roblox Luau • Spring Dynamics & Curve Math',
      overview: 'A lightweight pet companion follower that bypasses traditional server physics constraints to allow hundreds of active pets in a server with zero network lag.',
      howItWasMade: [
        '<strong>Server-Side Target Assignment:</strong> The server only tracks slot offsets (e.g., Pet Slot #1 is positioned 3 studs behind and 2 studs to the right of the character).',
        '<strong>Client-Side Spring Simulation:</strong> Each client simulates pet movement locally using Hooke’s Law spring-damper equations inside <code>RunService.RenderStepped</code>.',
        '<strong>Bezier Arching & Bobbing:</strong> Procedural floating bob and banking tilts when the player turns sharply or enters airborne states.',
        '<strong>LOD Distance Culling:</strong> Automatically throttles update rates for pets belonging to players further away to preserve mobile frame rates.'
      ],
      technologies: ['Luau Math', 'RenderStepped', 'Spring Damper', 'Bezier Curves']
    },
    'sys-dialogue': {
      title: 'Branching Node Dialogue & Quest Trigger System',
      platform: 'Roblox Luau • Graph Nodes & UI Signals',
      overview: 'A responsive dialogue and NPC interaction tree supporting player choices, reputation requirements, animated typewriter text, and quest triggers.',
      howItWasMade: [
        '<strong>Node Graph Structure:</strong> Dialogue trees are structured as nested Luau tables with condition predicates (e.g., <code>hasItem(id)</code> or <code>reputation > 50</code>).',
        '<strong>Rich-Text Typewriter Engine:</strong> Custom text streamer parsing UTF-8 characters and BBCode tags without breaking format tags mid-animation.',
        '<strong>Signal-Driven Quests:</strong> Dialog choices fire observer events that quest controllers listen to, cleanly decoupling UI from mission state machines.'
      ],
      technologies: ['Luau', 'Signal / GoodSignal', 'UI Tweens', 'RichText']
    },
    'sys-ai': {
      title: 'Hierarchical AI Perception & State Machine',
      platform: 'Unity C# • Enemy Tactical AI',
      overview: 'An intelligent enemy controller combining field-of-view perception, acoustic alert propagation, and hierarchical state machines for stealth and combat encounters.',
      howItWasMade: [
        '<strong>Hierarchical State Machine (HFSM):</strong> Cleanly separates root states (Peaceful, Suspicious, Combat) into granular child behaviors (Investigate, Flank, Retreat).',
        '<strong>Vision & Hearing Sensor Cones:</strong> Raycast vision checks combined with an acoustic alert event bus that draws nearby guards when weapons fire or footfalls land.',
        '<strong>Dynamic NavMesh Pathfinding:</strong> Intelligent waypoint traversal with path smoothing, dynamic obstacle avoidance, and line-of-sight flanking routines.'
      ],
      technologies: ['C#', 'NavMesh', 'HFSM Pattern', 'Sensory Cones']
    }
  };

  // Modal / Widget Elements
  const modalOverlay = document.getElementById('systemWidgetModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  function openSystemWidget(systemId) {
    const data = systemsSpecs[systemId];
    if (!data) return;

    modalBody.innerHTML = `
      <div class="widget-header">
        <span class="widget-pill">${data.platform}</span>
        <h3 class="widget-title">${data.title}</h3>
      </div>

      <div class="widget-section">
        <h4><i class="fa-solid fa-align-left"></i> System Overview</h4>
        <p>${data.overview}</p>
      </div>

      <div class="widget-section">
        <h4><i class="fa-solid fa-code-branch"></i> How The System Was Made</h4>
        <ul>
          ${data.howItWasMade.map(point => `<li>${point}</li>`).join('')}
        </ul>
      </div>

      <div class="widget-section">
        <h4><i class="fa-solid fa-microchip"></i> Key Architecture & Tools</h4>
        <div class="tech-tag-row">
          ${data.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeSystemWidget() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Attach click listener to each system card
  document.querySelectorAll('.system-card').forEach(card => {
    card.addEventListener('click', () => {
      const systemId = card.getAttribute('data-system-id');
      openSystemWidget(systemId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeSystemWidget);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeSystemWidget();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeSystemWidget();
    }
  });
});
