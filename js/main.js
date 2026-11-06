/**
 * Retro 1980s/90s Desktop GUI Engine (Static Page Layout)
 * Handles:
 * - Real-time system clock in top menubar
 * - Procedural 1-Bit Dithered avatar (canvas pixel drawing)
 * - Modal spec inspector widget on clicking system cards
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. REAL-TIME RETRO CLOCK
  const clockEl = document.getElementById('systemClock');
  function updateClock() {
    const now = new Date();
    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString('en-US', { hour12: true });
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

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

    // 1-Bit Pixel Face & Headset (Brutalist black silhouette)
    ctx.fillStyle = '#000000';

    // Head base silhouette
    ctx.fillRect(36, 32, 56, 68);

    // Face inner cut
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(40, 36, 48, 60);

    // Sunglasses
    ctx.fillStyle = '#000000';
    ctx.fillRect(44, 52, 18, 12);
    ctx.fillRect(66, 52, 18, 12);
    ctx.fillRect(60, 56, 8, 4); // Bridge

    // Glare on sunglasses
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(46, 54, 4, 4);
    ctx.fillRect(68, 54, 4, 4);

    // Smirk
    ctx.fillStyle = '#000000';
    ctx.fillRect(52, 80, 24, 4);
    ctx.fillRect(72, 76, 4, 4);

    // Headphones
    ctx.fillRect(30, 48, 8, 24);
    ctx.fillRect(90, 48, 8, 24);
    ctx.fillRect(34, 28, 60, 6);
  }

  // 3. TECHNICAL SPECIFICATIONS DATABASE (SYSTEM INSPECTOR WIDGET)
  const systemDatabase = {
    'sys-combat': {
      title: 'SERVER-AUTHORITATIVE MELEE & HITBOX PIPELINE',
      platform: 'PLATFORM: ROBLOX LUAU // STRICT_NETCODE',
      overview: 'High-speed multiplayer combat architecture engineered to eliminate range-extenders, client hit spoofing, and high-latency sync issues.',
      breakdown: [
        'CLIENT-SIDE PREDICTION: Client triggers attack swing and sound immediately for responsive feedback.',
        'SERVER TIMESTAMP VALIDATION: Attack payload snapshot includes ping offset; server rewinds positions.',
        'RAYCAST LINE-OF-SIGHT: Multi-point server casts verify zero obstacle occlusion between entities.',
        'COMBO STATE MACHINE: Server guards combo chain windows, blocking rapid-fire macro execution.'
      ],
      tags: ['LUAU', 'RAYCAST_PARAMS', 'REPLICATION', 'PREDICTION', 'STATE_MACHINE']
    },
    'sys-inventory': {
      title: 'PRODUCTION INVENTORY & DATA PIPELINE',
      platform: 'PLATFORM: ROBLOX LUAU // PROFILE_SERVICE + REPLICA',
      overview: 'Session-locking datastore wrapper for high-concurrency games where item duplication or loss is unacceptable.',
      breakdown: [
        'SESSION-LOCKING GUARD: Prevents simultaneous profile loading across multiple servers during teleports.',
        'ATOMIC TRANSACTION LOG: Inventory swaps execute in an atomic try-catch block with rollback protection.',
        'INCREMENTAL REPLICATION: Uses ReplicaService to sync mutated indices instead of entire tables.',
        'MIGRATION GUARDS: Versioning schema applies automatic schema updates to older player data.'
      ],
      tags: ['PROFILE_SERVICE', 'REPLICA_SERVICE', 'LUAU_TYPES', 'SESSION_LOCK']
    },
    'sys-ability': {
      title: 'MODULAR ABILITY & STATUS EFFECT PIPELINE',
      platform: 'PLATFORM: UNITY C# // SCRIPTABLE_OBJECTS',
      overview: 'Decoupled data-driven combat abilities with cooldown buffering and polymorphic actions.',
      breakdown: [
        'SCRIPTABLE_OBJECT BLUEPRINTS: Designers author spells, costs, and timeline events without C# code changes.',
        'ACTION COMPOSITING: Modular execution nodes (SpawnProjectile, ApplyBuff, AreaOfEffect).',
        'DYNAMIC BUFF STACKS: Tickable modifier pipeline recalculating character stats continuously.',
        'PRE-BUFFERING: Inputs triggered mid-animation automatically fire upon recovery frame.'
      ],
      tags: ['C#', 'SCRIPTABLE_OBJECTS', 'BUFFERING', 'INPUT_SYSTEM']
    },
    'sys-pet': {
      title: 'CLIENT-REPLICATED PET FOLLOWER PHYSICS',
      platform: 'PLATFORM: ROBLOX LUAU // HOOKES_LAW_MATH',
      overview: 'Smooth spring-damper companion physics simulated strictly on client RenderStepped with zero server overhead.',
      breakdown: [
        'ZERO SERVER CONSTRAINTS: Eliminates AlignPosition/BodyMovers from consuming server physics cycles.',
        'RENDER_STEPPED SPRING MATH: Hooke\'s Law damping provides natural bobbing, banking, and bounce.',
        'BEZIER CURVE TRAVEL: Flying pets navigate curved paths around obstacles when catching up.',
        'DISTANCE LOD CULLING: Throttles calculation ticks on far entities to protect mobile frame rates.'
      ],
      tags: ['LUAU_MATH', 'SPRING_DAMPING', 'RENDER_STEPPED', 'LOD']
    },
    'sys-dialogue': {
      title: 'BRANCHING NODE DIALOGUE & QUEST ENGINE',
      platform: 'PLATFORM: ROBLOX LUAU // GRAPH_NODES',
      overview: 'Signal-driven dialogue tree with rich-text typewriter animation and quest state hooks.',
      breakdown: [
        'NODE GRAPH PARSER: Nested table structure evaluating player prerequisites (reputation, items).',
        'UTF-8 TYPEWRITER: Safely streams text without splitting multibyte characters or BBCode markup.',
        'OBSERVER SIGNALS: Choice nodes dispatch event signals directly to decoupled quest managers.'
      ],
      tags: ['LUAU', 'GOOD_SIGNAL', 'UI_TWEEN', 'RICH_TEXT']
    },
    'sys-ai': {
      title: 'HIERARCHICAL AI PERCEPTION & FSM',
      platform: 'PLATFORM: UNITY C# // TACTICAL_ENEMY_AI',
      overview: 'Tactical state machine with raycast vision cones and acoustic listener events.',
      breakdown: [
        'HIERARCHICAL FSM: Decouples root states (Peaceful, Suspicious, Combat) into child routines.',
        'SENSORY PERCEPTION: Vision frustum raycasting combined with an acoustic alert event bus.',
        'NAVMESH PATH FLANKING: Dynamic waypoint traversal with path smoothing and cover alignment.'
      ],
      tags: ['C#', 'NAVMESH', 'HFSM', 'PERCEPTION_CONES']
    }
  };

  // 4. MODAL INSPECTOR LOGIC
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
