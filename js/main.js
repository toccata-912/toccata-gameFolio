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
