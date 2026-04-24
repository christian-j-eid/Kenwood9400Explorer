import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { COMPONENTS } from './data.js';

class StereoExplorer {
  constructor() {
    this.canvas   = document.getElementById('canvas');
    this.renderer = null;
    this.scene    = null;
    this.camera   = null;
    this.controls = null;
    // Stub until the GLB finishes loading
    this.model = {
      tick() {},
      getInteractiveMeshes() { return []; },
      getIdForMesh()         { return null; },
      highlight()            {},
      unhighlight()          {},
    };
    this.clock    = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this.pointer   = new THREE.Vector2();

    // Track mousedown position to distinguish clicks from drags
    this._mouseDownX = 0;
    this._mouseDownY = 0;

    this._init();
  }

  _init() {
    this._setupRenderer();
    this._setupScene();
    this._setupCamera();
    this._setupLights();
    this._setupGround();
    this._setupControls();
    this._buildModel();
    this._bindUI();
    this._animate();
  }

  // ── Renderer ─────────────────────────────────────────────────────────────────

  _setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
  }

  // ── Scene & environment ───────────────────────────────────────────────────────

  _setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x09090c);
    this.scene.fog = new THREE.FogExp2(0x09090c, 0.006);
  }

  _setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      44,
      window.innerWidth / window.innerHeight,
      0.1,
      600,
    );
    this.camera.position.set(60, 45, 30);
    this.camera.lookAt(0, 0, 0);
    this._defaultCameraPos = this.camera.position.clone();
    this._defaultTarget    = new THREE.Vector3(0, 0, 0);
  }

  _setupLights() {
    // Low ambient base
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.28));

    // Key light — warm, upper-right-front
    const key = new THREE.DirectionalLight(0xfff8e8, 2.0);
    key.position.set(28, 48, 42);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    const sc = key.shadow.camera;
    sc.near = 0.5; sc.far = 200;
    sc.left = -70; sc.right = 70; sc.top = 60; sc.bottom = -60;
    key.shadow.bias = -0.001;
    this.scene.add(key);

    // Fill light — cool, upper-left
    const fill = new THREE.DirectionalLight(0xb8ccff, 0.65);
    fill.position.set(-35, 30, 20);
    this.scene.add(fill);

    // Rim / back light
    const rim = new THREE.DirectionalLight(0xffffff, 0.35);
    rim.position.set(0, 10, -55);
    this.scene.add(rim);
  }

  _setupGround() {
    // Subtle reflective floor
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(500, 500),
      new THREE.MeshStandardMaterial({ color: 0x0d0d14, metalness: 0.15, roughness: 0.92 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -8.8;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Grid
    const grid = new THREE.GridHelper(400, 60, 0x1a1a2e, 0x141420);
    grid.position.y = -8.75;
    this.scene.add(grid);
  }

  // ── Orbit controls ───────────────────────────────────────────────────────────

  _setupControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping  = true;
    this.controls.dampingFactor  = 0.055;
    this.controls.minDistance    = 28;
    this.controls.maxDistance    = 160;
    this.controls.maxPolarAngle  = Math.PI * 0.62;
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  // ── Model ─────────────────────────────────────────────────────────────────────

  async _buildModel() {
    const loader = new GLTFLoader();
    const gltf   = await loader.loadAsync('model/Kenwood9400v0.glb');
    const root   = gltf.scene;

    // Center and scale to fit the scene (~50 units wide)
    const bbox   = new THREE.Box3().setFromObject(root);
    const center = bbox.getCenter(new THREE.Vector3());
    const size   = bbox.getSize(new THREE.Vector3());
    const scale  = 50 / Math.max(size.x, size.y, size.z);
    root.scale.setScalar(scale);
    root.position.sub(center.multiplyScalar(scale));

    root.traverse(obj => {
      if (obj.isMesh) {
        obj.castShadow    = true;
        obj.receiveShadow = true;
      }
    });

    this.scene.add(root);

    const interactive = [];
    let highlighted = null;

    root.traverse(obj => {
      if (obj.isMesh && COMPONENTS[obj.name]) {
        interactive.push({ mesh: obj, id: obj.name });
      }
    });

    this.model = {
      root,
      tick() {},
      getInteractiveMeshes() {
        return interactive.map(e => e.mesh);
      },
      getIdForMesh(mesh) {
        return interactive.find(e => e.mesh === mesh)?.id ?? null;
      },
      highlight(mesh) {
        if (highlighted === mesh) return;
        this.unhighlight();
        highlighted = mesh;
        mesh.userData._origMaterial = mesh.material;
        mesh.material = mesh.material.clone();
        mesh.material.emissive.setHex(0xaaaaaa);
        mesh.material.emissiveIntensity = 0.30;
      },
      unhighlight() {
        if (!highlighted) return;
        highlighted.material.dispose();
        highlighted.material = highlighted.userData._origMaterial;
        highlighted = null;
      },
    };
  }

  // ── UI bindings ───────────────────────────────────────────────────────────────

  _bindUI() {
    window.addEventListener('resize', () => this._onResize());

    // Distinguish click vs drag
    this.canvas.addEventListener('mousedown', e => {
      this._mouseDownX = e.clientX;
      this._mouseDownY = e.clientY;
    });

    this.canvas.addEventListener('mouseup', e => {
      const dx = Math.abs(e.clientX - this._mouseDownX);
      const dy = Math.abs(e.clientY - this._mouseDownY);
      if (dx < 5 && dy < 5) this._onClick(e);
    });

    this.canvas.addEventListener('mousemove', e => this._onHover(e));

    // Reset view
    document.getElementById('btn-reset').addEventListener('click', () => {
      this.controls.target.copy(this._defaultTarget);
      this.camera.position.copy(this._defaultCameraPos);
      this.controls.update();
    });

    // Close panel
    document.getElementById('panel-close').addEventListener('click', () => {
      this._hidePanel();
    });

    // Light / dark mode toggle
    document.getElementById('btn-theme').addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light');
      document.getElementById('btn-theme').textContent = isLight ? 'Dark Mode' : 'Light Mode';
      const bgColor = isLight ? 0xf5f0e8 : 0x09090c;
      this.scene.background = new THREE.Color(bgColor);
      this.scene.fog = new THREE.FogExp2(bgColor, 0.006);
    });
  }

  // ── Interaction ───────────────────────────────────────────────────────────────

  _updatePointer(e) {
    this.pointer.x =  (e.clientX / window.innerWidth)  * 2 - 1;
    this.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  _raycast() {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const meshes = this.model.getInteractiveMeshes();
    const hits   = this.raycaster.intersectObjects(meshes, false);
    return hits.length > 0 ? hits[0].object : null;
  }

  _onHover(e) {
    this._updatePointer(e);
    const hit     = this._raycast();
    const tooltip = document.getElementById('tooltip');

    if (hit) {
      this.model.highlight(hit);
      const id   = this.model.getIdForMesh(hit);
      const comp = COMPONENTS[id];
      if (comp) {
        tooltip.textContent = comp.name;
        tooltip.style.left  = e.clientX + 'px';
        tooltip.style.top   = e.clientY + 'px';
        tooltip.classList.add('visible');
        this.canvas.style.cursor = 'pointer';
      }
    } else {
      this.model.unhighlight();
      tooltip.classList.remove('visible');
      this.canvas.style.cursor = '';
    }
  }

  _onClick(e) {
    this._updatePointer(e);
    const hit = this._raycast();

    if (!hit) {
      this._hidePanel();
      return;
    }

    const id = this.model.getIdForMesh(hit);
    if (id && COMPONENTS[id]) this._showPanel(id);
  }

  // ── Info panel ────────────────────────────────────────────────────────────────

  _showPanel(id) {
    const comp = COMPONENTS[id];

    document.getElementById('panel-badge').textContent = comp.category;
    document.getElementById('panel-title').textContent = comp.name;
    document.getElementById('panel-body').textContent  = comp.description;

    const tipsEl = document.getElementById('panel-tips');
    const listEl = document.getElementById('panel-tips-list');

    if (comp.tips && comp.tips.length > 0) {
      listEl.innerHTML = comp.tips.map(t => `<li>${t}</li>`).join('');
      tipsEl.classList.add('visible');
    } else {
      tipsEl.classList.remove('visible');
    }

    document.getElementById('info-panel').classList.add('open');
  }

  _hidePanel() {
    document.getElementById('info-panel').classList.remove('open');
  }

  // ── Resize ────────────────────────────────────────────────────────────────────

  _onResize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  // ── Render loop ───────────────────────────────────────────────────────────────

  _animate() {
    requestAnimationFrame(() => this._animate());
    const elapsed = this.clock.getElapsedTime();
    this.controls.update();
    this.model.tick(elapsed);
    this.renderer.render(this.scene, this.camera);
  }
}

new StereoExplorer();
