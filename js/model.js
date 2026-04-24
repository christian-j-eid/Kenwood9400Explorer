import * as THREE from 'three';

// ── Unit scale: 1 unit ≈ 10 mm ──
// KR-9400 is approximately 480 × 160 × 420 mm
const W = 48, H = 16, D = 42;
const HW = W / 2, HH = H / 2, HD = D / 2; // 24, 8, 21

// Front face of the body sits at z = +HD = 21
// Front panel (slightly proud) face sits at z ≈ 22.5
const FZ = 22.5;

// ── Material helpers ──
function stdMat(color, metalness, roughness, extra = {}) {
  return new THREE.MeshStandardMaterial({ color, metalness, roughness, ...extra });
}

const MAT = {
  chassis:   () => stdMat(0x1a1a1e, 0.55, 0.70),
  panel:     () => stdMat(0xc4c4c8, 0.82, 0.25),
  knob:      () => stdMat(0x1e1e1e, 0.45, 0.40),
  knobRing:  () => stdMat(0x888888, 0.80, 0.30),
  dialBg:    () => stdMat(0x1c1000, 0.05, 0.85, { emissive: new THREE.Color(0x5a3800), emissiveIntensity: 0.35 }),
  dialScale: () => stdMat(0xddbb44, 0.10, 0.80),
  dialPtr:   () => stdMat(0xff3300, 0.10, 0.60),
  vuFace:    () => stdMat(0xf4ead4, 0.00, 0.90, { emissive: new THREE.Color(0x9c6820), emissiveIntensity: 0.18 }),
  vuFrame:   () => stdMat(0x111111, 0.30, 0.80),
  vuNeedle:  () => stdMat(0x111111, 0.10, 0.90),
  vuGlass:   () => new THREE.MeshPhysicalMaterial({ color: 0x99bbdd, metalness: 0, roughness: 0.0, transparent: true, opacity: 0.18, transmission: 0.7 }),
  switchBody:() => stdMat(0x2a2a2a, 0.40, 0.55),
  switchCap: () => stdMat(0x333333, 0.30, 0.50),
  powerBtn:  () => stdMat(0x990000, 0.50, 0.35, { emissive: new THREE.Color(0x440000), emissiveIntensity: 0.3 }),
  jackMetal: () => stdMat(0x888888, 0.85, 0.25),
  pcbGreen:  () => stdMat(0x1a4020, 0.05, 0.85),
  tunerPcb:  () => stdMat(0x152a1a, 0.05, 0.85),
  pcbTrace:  () => stdMat(0x4a7a30, 0.50, 0.45),
  transformer:() => stdMat(0x111111, 0.50, 0.75),
  xfmrBand:  (c) => stdMat(c, 0.15, 0.80),
  capBody:   () => stdMat(0x0e0e66, 0.20, 0.70),
  capStripe: () => stdMat(0x5555aa, 0.10, 0.80),
  heatsink:  () => stdMat(0x888888, 0.70, 0.30),
  transistor:() => stdMat(0x1a1a1a, 0.70, 0.40),
  foot:      () => stdMat(0x2a2a2a, 0.20, 0.90),
  lidMetal:  () => stdMat(0x181818, 0.55, 0.65, { side: THREE.DoubleSide }),
  ventSlot:  () => stdMat(0x050505, 0.30, 0.90),
};

// ── Small geometry helpers ──
function box(w, h, d) { return new THREE.BoxGeometry(w, h, d); }
function cyl(rt, rb, h, seg = 32) { return new THREE.CylinderGeometry(rt, rb, h, seg); }
function torus(r, tube, seg = 8, tseg = 32) { return new THREE.TorusGeometry(r, tube, seg, tseg); }

export class StereoModel {
  constructor(scene) {
    this.scene = scene;
    this.root  = new THREE.Group();
    scene.add(this.root);

    this._interactive = [];   // { mesh, id }
    this._internals   = [];   // meshes hidden until lid opens
    this.vuNeedles    = [];   // animated

    this.lidPivot     = null;
    this.lidOpen      = false;
    this._lidAngle    = 0;
    this._lidTarget   = 0;
    this._lidAnimating = false;

    this.internalLight = new THREE.PointLight(0xfff6e0, 0, 60, 1.5);
    this.internalLight.position.set(0, 4, 0);
    this.root.add(this.internalLight);
  }

  build() {
    this._buildBody();
    this._buildFrontPanel();
    this._buildFrontControls();
    this._buildLid();
    this._buildInternals();
  }

  // ── External body ───────────────────────────────────────────────────────────

  _buildBody() {
    const body = new THREE.Mesh(box(W, H, D), MAT.chassis());
    body.castShadow = true;
    body.receiveShadow = true;
    this.root.add(body);

    // Side vent stripes (left and right faces)
    for (let side of [-1, 1]) {
      for (let i = 0; i < 6; i++) {
        const vent = new THREE.Mesh(box(0.3, H - 4, 1.4), MAT.ventSlot());
        vent.position.set(side * (HW + 0.01), 0, -4 + i * 2.8);
        this.root.add(vent);
      }
    }

    // Bottom feet (four corners)
    const feetPos = [
      [-HW + 3, -HH - 0.8,  HD - 4],
      [ HW - 3, -HH - 0.8,  HD - 4],
      [-HW + 3, -HH - 0.8, -HD + 4],
      [ HW - 3, -HH - 0.8, -HD + 4],
    ];
    feetPos.forEach(p => {
      const foot = new THREE.Mesh(cyl(1.6, 1.9, 1.6, 10), MAT.foot());
      foot.position.set(...p);
      this.root.add(foot);
    });
  }

  // ── Front panel plate ────────────────────────────────────────────────────────

  _buildFrontPanel() {
    // Brushed aluminum front panel, slightly proud of the body
    const panel = new THREE.Mesh(box(W - 1.5, H - 1.5, 1.5), MAT.panel());
    panel.position.set(0, 0, HD + 0.75);
    panel.castShadow = true;
    this.root.add(panel);
  }

  // ── Front-panel controls ─────────────────────────────────────────────────────

  _buildFrontControls() {
    this._buildTuningSection();
    this._buildVUMeters();
    this._buildKnobsAndSwitches();
  }

  _buildTuningSection() {
    // Dark amber tuning-scale window — left two-fifths of the panel
    const dialBg = new THREE.Mesh(box(17, 8, 0.4), MAT.dialBg());
    dialBg.position.set(-13.5, 2.5, FZ + 0.2);
    this.root.add(dialBg);

    // Frequency scale tick marks
    for (let i = 0; i < 14; i++) {
      const tall = i % 4 === 0;
      const tick = new THREE.Mesh(box(0.12, tall ? 1.8 : 0.9, 0.1), MAT.dialScale());
      tick.position.set(-21 + i * 1.42 + 0.5, tall ? 2.9 : 2.55, FZ + 0.45);
      this.root.add(tick);
    }

    // Two horizontal guide lines across the scale
    for (let y of [1.6, 3.4]) {
      const line = new THREE.Mesh(box(16, 0.08, 0.08), MAT.dialScale());
      line.position.set(-13.5, y, FZ + 0.44);
      this.root.add(line);
    }

    // Tuning pointer (red vertical line)
    const ptr = new THREE.Mesh(box(0.18, 7.2, 0.1), MAT.dialPtr());
    ptr.position.set(-10, 2.5, FZ + 0.5);
    this.root.add(ptr);

    // Tuning knob (large, bottom-center of dial section) — interactive
    const tuningKnob = this._knob(3.0, 1.8, [-3, -4, FZ + 1.5], 'tuning-dial');
    this.root.add(tuningKnob);

    // Band selector (FM/AM) small rectangular switch
    const bandSw = new THREE.Mesh(box(3.5, 3, 1.0), MAT.switchBody());
    bandSw.position.set(-21, -3, FZ + 0.5);
    this.root.add(bandSw);
    const bandCap = new THREE.Mesh(box(3.2, 1.1, 0.5), MAT.switchCap());
    bandCap.position.set(-21, -2, FZ + 1.0);
    this.root.add(bandCap);
  }

  _buildVUMeters() {
    // Two VU meters, center of panel
    const positions = [
      { x: -2.8, id: 'vu-left'  },
      { x:  2.8, id: 'vu-right' },
    ];

    positions.forEach(({ x, id }) => {
      // Outer frame
      const frame = new THREE.Mesh(box(5.0, 7.2, 0.5), MAT.vuFrame());
      frame.position.set(x, 3.0, FZ + 0.1);
      this.root.add(frame);

      // Meter face (cream, emissive amber glow)
      const face = new THREE.Mesh(box(4.4, 6.4, 0.25), MAT.vuFace());
      face.position.set(x, 3.0, FZ + 0.35);
      this.root.add(face);
      this._interactive.push({ mesh: face, id });

      // Scale arc lines on face
      for (let i = 0; i < 7; i++) {
        const ang = -0.5 + i * 0.18;
        const markH = i % 3 === 0 ? 0.7 : 0.4;
        const mark = new THREE.Mesh(box(0.09, markH, 0.08), MAT.vuNeedle());
        mark.position.set(x + Math.sin(ang) * 1.8, 3.0 + Math.cos(ang) * 1.8 - 0.5, FZ + 0.5);
        mark.rotation.z = -ang;
        this.root.add(mark);
      }

      // Needle
      const needleGeo = new THREE.BoxGeometry(0.09, 2.6, 0.06);
      const needle = new THREE.Mesh(needleGeo, MAT.vuNeedle());
      // Pivot point at bottom of needle
      needle.geometry.translate(0, 1.3, 0);
      needle.position.set(x, 1.2, FZ + 0.52);
      needle.rotation.z = -0.25;
      this.root.add(needle);
      this.vuNeedles.push(needle);

      // Glass cover
      const glass = new THREE.Mesh(box(4.6, 6.6, 0.15), MAT.vuGlass());
      glass.position.set(x, 3.0, FZ + 0.52);
      this.root.add(glass);
    });
  }

  _buildKnobsAndSwitches() {
    // Large knobs (right section of panel)
    const knobDefs = [
      { id: 'input-selector',  x:  8.5, y:  4.5, r: 2.0, h: 2.0 },
      { id: 'mode-selector',   x: 13.5, y:  4.5, r: 2.0, h: 2.0 },
      { id: 'bass-knob',       x:  8.0, y: -1.5, r: 1.6, h: 1.6 },
      { id: 'treble-knob',     x: 12.5, y: -1.5, r: 1.6, h: 1.6 },
      { id: 'balance-knob',    x: 17.0, y: -1.5, r: 1.6, h: 1.6 },
      { id: 'volume-knob',     x: 19.5, y:  3.0, r: 3.0, h: 2.5 }, // large
    ];
    knobDefs.forEach(({ id, x, y, r, h }) => {
      const k = this._knob(r, h, [x, y, FZ + h * 0.5], id);
      this.root.add(k);
    });

    // Small toggle switches
    const switchDefs = [
      { id: 'loudness-switch', x:  8.0, y: -5.5 },
      { id: 'tape-monitor',    x: 11.5, y: -5.5 },
    ];
    switchDefs.forEach(({ id, x, y }) => {
      const base = new THREE.Mesh(box(2.0, 1.0, 1.6), MAT.switchBody());
      base.position.set(x, y, FZ + 0.8);
      this.root.add(base);
      const cap = new THREE.Mesh(box(1.6, 0.6, 0.7), MAT.switchCap());
      cap.position.set(x - 0.3, y, FZ + 1.6);
      this.root.add(cap);
      this._interactive.push({ mesh: base, id });
    });

    // Power button (bottom-right, red)
    const pwrBtn = new THREE.Mesh(cyl(1.4, 1.4, 0.9, 32), MAT.powerBtn());
    pwrBtn.rotation.x = Math.PI / 2;
    pwrBtn.position.set(22, -5.5, FZ + 0.6);
    this.root.add(pwrBtn);
    this._interactive.push({ mesh: pwrBtn, id: 'power-switch' });

    // Headphone jack (top-right)
    const jackOuter = new THREE.Mesh(cyl(0.85, 0.85, 1.2, 20), MAT.jackMetal());
    jackOuter.rotation.x = Math.PI / 2;
    jackOuter.position.set(21.5, 4.5, FZ + 0.8);
    this.root.add(jackOuter);
    const jackInner = new THREE.Mesh(cyl(0.45, 0.45, 1.4, 20), stdMat(0x000000, 0.1, 0.9));
    jackInner.rotation.x = Math.PI / 2;
    jackInner.position.set(21.5, 4.5, FZ + 0.85);
    this.root.add(jackInner);
    this._interactive.push({ mesh: jackOuter, id: 'headphone-jack' });

    // Small indicator LEDs / pilot lights row
    const ledColors = [0x00cc44, 0xffaa00, 0xffaa00];
    ledColors.forEach((c, i) => {
      const led = new THREE.Mesh(cyl(0.25, 0.25, 0.3, 10), stdMat(c, 0.1, 0.5, { emissive: new THREE.Color(c), emissiveIntensity: 0.8 }));
      led.rotation.x = Math.PI / 2;
      led.position.set(8 + i * 1.6, -3.8, FZ + 0.5);
      this.root.add(led);
    });
  }

  // Helper: create a knob group and register as interactive
  _knob(radius, depth, [x, y, z], id) {
    const group = new THREE.Group();
    group.position.set(x, y, z);

    // Body
    const body = new THREE.Mesh(cyl(radius, radius * 0.85, depth, 32), MAT.knob());
    body.rotation.x = Math.PI / 2;
    group.add(body);

    // Grip ring
    const ring = new THREE.Mesh(torus(radius * 0.92, 0.18, 6, 32), MAT.knobRing());
    ring.rotation.x = Math.PI / 2;
    ring.position.z = 0;
    group.add(ring);

    // Indicator line (top of knob)
    const line = new THREE.Mesh(box(0.1, radius * 0.7, 0.06), MAT.dialScale());
    line.position.set(0, radius * 0.55, depth * 0.5 + 0.05);
    group.add(line);

    this._interactive.push({ mesh: body, id });
    return group;
  }

  // ── Lid ─────────────────────────────────────────────────────────────────────

  _buildLid() {
    // Pivot group sits at the top-back edge of the chassis
    this.lidPivot = new THREE.Group();
    this.lidPivot.position.set(0, HH, -HD);
    this.root.add(this.lidPivot);

    // Lid panel — back edge is at pivot (local z = 0), front edge at local z = D
    const lidGeo = box(W - 0.5, 0.9, D);
    const lid = new THREE.Mesh(lidGeo, MAT.lidMetal());
    lid.position.set(0, 0.45, HD);  // offset forward; back edge aligns with pivot
    lid.castShadow = true;
    lid.receiveShadow = true;
    this.lidPivot.add(lid);

    // Vent slots on the lid top surface
    for (let i = 0; i < 9; i++) {
      const vent = new THREE.Mesh(box(W - 10, 1.0, 0.7), MAT.ventSlot());
      vent.position.set(0, 0.9, HD - 4 - i * 3.5);
      this.lidPivot.add(vent);
    }

    // Grip lip at front edge of lid
    const lip = new THREE.Mesh(box(W - 4, 1.4, 0.8), stdMat(0x222222, 0.50, 0.60));
    lip.position.set(0, 0, D - 0.4);  // local: front of lid
    this.lidPivot.add(lip);
  }

  // ── Internal components ───────────────────────────────────────────────────────

  _buildInternals() {
    const add = (mesh, id = null) => {
      mesh.visible = false;
      this._internals.push(mesh);
      this.root.add(mesh);
      if (id) this._interactive.push({ mesh, id });
    };

    // Power transformer — large EI-core cylinder, left-rear
    const xfmrBody = new THREE.Mesh(cyl(5.2, 5.2, 7.5, 32), MAT.transformer());
    xfmrBody.position.set(-17, -1.5, -9);
    add(xfmrBody, 'power-transformer');

    // Winding bands (red, blue, black wires visible through wrap)
    [[0xcc2200, -2.5], [0x0033cc, 0], [0x222222, 2.5]].forEach(([c, y]) => {
      const band = new THREE.Mesh(torus(5.3, 0.35, 8, 32), MAT.xfmrBand(c));
      band.position.set(-17, y - 1.5, -9);
      add(band);
    });

    // Main filter capacitors — tall blue cylinders, center-left
    [[-7, -3, -11], [-2, -3, -11]].forEach(([x, y, z], i) => {
      const cap = new THREE.Mesh(cyl(3.0, 3.0, 10, 32), MAT.capBody());
      cap.position.set(x, y, z);
      add(cap, i === 0 ? 'filter-caps' : null);
      if (i !== 0) this._interactive.push({ mesh: cap, id: 'filter-caps' });  // both caps clickable

      // Stripe band at top
      const stripe = new THREE.Mesh(cyl(3.1, 3.1, 2.2, 32, 1, true), MAT.capStripe());
      stripe.position.set(x, y + 3.9, z);
      add(stripe);

      // Top vent cross (+)
      for (let rot of [0, Math.PI / 2]) {
        const vent = new THREE.Mesh(box(5.5, 0.25, 0.5), MAT.capStripe());
        vent.rotation.y = rot;
        vent.position.set(x, y + 5.1, z);
        add(vent);
      }
    });

    // Heatsinks — aluminium fins on inner sides of chassis
    [-1, 1].forEach(side => {
      const sx = side * 19;
      for (let f = 0; f < 9; f++) {
        const fin = new THREE.Mesh(box(0.45, 11, 3.8), MAT.heatsink());
        fin.position.set(sx - side * f * 0.8, -1, -2 + f * 0.3);
        add(fin);
      }
      // Output transistors (4 per side)
      for (let t = 0; t < 4; t++) {
        const trans = new THREE.Mesh(box(1.6, 1.3, 0.7), MAT.transistor());
        trans.position.set(sx - side * 4.5, -3.5 + t * 2.2, -1);
        add(trans, t === 0 ? 'output-transistors' : null);
        if (t !== 0) this._interactive.push({ mesh: trans, id: 'output-transistors' });
      }
    });

    // Main amplifier PCB — large green board, center
    const ampBoard = new THREE.Mesh(box(22, 0.45, 20), MAT.pcbGreen());
    ampBoard.position.set(6, -6.5, -1);
    add(ampBoard, 'amp-board');

    // PCB component silhouettes on amp board
    this._addPcbComponents(ampBoard.position, add);

    // Preamplifier PCB — smaller, toward front
    const preBoard = new THREE.Mesh(box(14, 0.45, 10), MAT.pcbGreen());
    preBoard.position.set(-4, -6.5, 9);
    add(preBoard, 'preamp-board');

    // Tuner PCB — near top-front, shielded aluminum can style
    const tunerBoard = new THREE.Mesh(box(17, 0.45, 8), MAT.tunerPcb());
    tunerBoard.position.set(-9, 1.5, 6);
    add(tunerBoard, 'tuner-board');

    // Tuner shield can (aluminum box over tuner)
    const tunerShield = new THREE.Mesh(box(15, 4, 7), stdMat(0x999999, 0.75, 0.30, { side: THREE.DoubleSide, transparent: true, opacity: 0.55 }));
    tunerShield.position.set(-9, 3.5, 6);
    add(tunerShield);

    // Wiring harness suggestions
    for (let i = 0; i < 4; i++) {
      const wire = new THREE.Mesh(cyl(0.18, 0.18, 12, 6), stdMat(0x111111 + i * 0x111100, 0.2, 0.9));
      wire.rotation.z = Math.PI / 2;
      wire.position.set(-5 + i * 2, -4, 2);
      add(wire);
    }
  }

  _addPcbComponents(boardPos, add) {
    // Electrolytic caps on amp board
    const capPos = [
      [boardPos.x - 5, boardPos.y + 1.8, boardPos.z + 3],
      [boardPos.x - 2, boardPos.y + 1.8, boardPos.z + 3],
      [boardPos.x + 3, boardPos.y + 1.8, boardPos.z - 4],
    ];
    capPos.forEach(([x, y, z]) => {
      const c = new THREE.Mesh(cyl(0.6, 0.6, 2.2, 12), stdMat(0x333366, 0.2, 0.7));
      c.position.set(x, y, z);
      add(c);
    });

    // TO-3 driver transistors
    [[boardPos.x + 2, boardPos.y + 1.5, boardPos.z + 6],
     [boardPos.x + 5, boardPos.y + 1.5, boardPos.z + 6]].forEach(([x, y, z]) => {
      const t = new THREE.Mesh(cyl(0.8, 0.8, 0.6, 8), stdMat(0x444444, 0.7, 0.35));
      t.rotation.x = Math.PI / 2;
      t.position.set(x, y, z);
      add(t);
    });

    // PCB trace lines
    for (let i = 0; i < 5; i++) {
      const tr = new THREE.Mesh(box(0.18, 0.06, 16), MAT.pcbTrace());
      tr.position.set(boardPos.x - 6 + i * 2.8, boardPos.y + 0.25, boardPos.z);
      add(tr);
    }
  }

  // ── Lid toggle ───────────────────────────────────────────────────────────────

  toggleLid() {
    this.lidOpen = !this.lidOpen;
    this._lidTarget   = this.lidOpen ? -1.85 : 0;
    this._lidAnimating = true;

    if (this.lidOpen) {
      this._internals.forEach(m => { m.visible = true; });
    }
    return this.lidOpen;
  }

  // ── Animation tick (call every frame) ────────────────────────────────────────

  tick(elapsed) {
    // Lid animation (exponential ease)
    if (this._lidAnimating) {
      this._lidAngle += (this._lidTarget - this._lidAngle) * 0.07;
      if (Math.abs(this._lidTarget - this._lidAngle) < 0.001) {
        this._lidAngle = this._lidTarget;
        this._lidAnimating = false;
        if (!this.lidOpen) {
          this._internals.forEach(m => { m.visible = false; });
          this.internalLight.intensity = 0;
        }
      }
      this.lidPivot.rotation.x = this._lidAngle;

      // Fade internal light as lid opens
      const progress = this.lidOpen
        ? Math.max(0, -this._lidAngle / 1.85)
        : 1 - Math.max(0, -this._lidAngle / 1.85);
      this.internalLight.intensity = progress * 2.2;
    }

    // VU needle sway (simulates audio playing)
    this.vuNeedles.forEach((needle, i) => {
      const phase = i * 0.85;
      const base  = Math.sin(elapsed * 1.1 + phase) * 0.18;
      const twitch = Math.sin(elapsed * 4.3 + phase * 2.3) * 0.06;
      needle.rotation.z = -0.22 + base + twitch;
    });
  }

  // ── Interaction helpers ──────────────────────────────────────────────────────

  getInteractiveMeshes() {
    return this._interactive
      .filter(({ mesh }) => mesh.visible !== false)
      .map(({ mesh }) => mesh);
  }

  getIdForMesh(mesh) {
    const entry = this._interactive.find(i => i.mesh === mesh);
    return entry ? entry.id : null;
  }

  highlight(mesh) {
    if (this._highlighted === mesh) return;
    this.unhighlight();
    this._highlighted        = mesh;
    this._origEmissiveColor  = mesh.material.emissive.getHex();
    this._origEmissiveIntens = mesh.material.emissiveIntensity || 0;
    mesh.material.emissive.setHex(0xaaaaaa);
    mesh.material.emissiveIntensity = 0.30;
  }

  unhighlight() {
    if (!this._highlighted) return;
    this._highlighted.material.emissive.setHex(this._origEmissiveColor  ?? 0x000000);
    this._highlighted.material.emissiveIntensity =  this._origEmissiveIntens ?? 0;
    this._highlighted = null;
  }
}
