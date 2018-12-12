// example import asset
// import imgPath from './assets/img.jpg';

// TODO : add Dat.GUI
// TODO : add Stats
import Tube from "./Tube";
var OrbitControls = require("three-orbit-controls")(THREE);
import * as dat from "dat.gui";
import textureColor from "src/assets/Blue_MarbleCOLOR.jpg";
import texture2Color from "src/assets/AzulejosCOLOR.jpg";
import poisson from "src/assets/poisson.png";
import { TweenLite } from "gsap/TweenMax";
import browserCheck from "src/utils/browserCheck";

export default class App {
  constructor() {
    this.container = document.createElement("div");
    this.container.id = "main";
    document.body.appendChild(this.container);
    document.body.classList.add(browserCheck());

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 1;

    // this.controls = new OrbitControls(this.camera);

    var size = 10;
    var divisions = 10;

    var gridHelper = new THREE.GridHelper(size, divisions);

    // DAT.GUI Related Stuff

    var gui = new dat.GUI();

    // var cam = gui.addFolder("Camera");
    // cam.add(this.camera.position, "y", 0.1, 10).listen();
    // cam.open();

    this.scene = new THREE.Scene();

    this.scene.add(gridHelper);
    this.backgroundTiles = [];
    this.animatedTiles = [];
    this.backgroundTiles.push(textureColor);
    this.backgroundTiles.push(texture2Color);
    this.backgroundTiles.map((texture, index) => {
      let textureLoaded = new THREE.TextureLoader().load(texture);
      let tube = new Tube(textureLoaded, 0, index, 0, 5, 10);
      this.scene.add(tube.mesh);
      return tube;
    });

      this.animatedTiles.push(poisson);
      this.animatedTiles.map((texture, index) => {
        let textureLoaded = new THREE.TextureLoader().load(texture);
        let tube = new Tube(textureLoaded, 0, index, 0, 2, 4);
        this.scene.add(tube.mesh);
        return tube;
      });
    // create the particle variables
    this.particleCount = 1800;

    var particles = new THREE.Geometry();
    var pMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.2,
      map: new THREE.TextureLoader().load(textureColor),
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    // now create the individual particles
    for (var p = 0; p < this.particleCount; p++) {
      // create a particle with random
      // position values, -250 -> 250
      var particle = new THREE.Vector3();
      particle.x = THREE.Math.randFloatSpread(20);
      particle.y = THREE.Math.randFloatSpread(20);
      particle.z = THREE.Math.randFloatSpread(20);
      particle.velocity = new THREE.Vector3(
        0, // x
        -Math.random(), // y: random vel
        0
      );
      // add it to the geometry
      particles.vertices.push(particle);
    }

    // create the particle system
    this.particleSystem = new THREE.Points(particles, pMaterial);

    // add it to the scene
    this.scene.add(this.particleSystem);

    let ambientLight = new THREE.AmbientLight(0x505050);
    this.scene.add(ambientLight);

    let pointLight = new THREE.PointLight(0xffffff, 1, 10);
    this.scene.add(pointLight);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    window.addEventListener("resize", this.onWindowResize.bind(this), false);
    this.onWindowResize();
    let handleWheel = e => {
      if (Object.values(document.body.classList).includes("isFirefox")) {
        this.scrolling(e.deltaY); //we divide by 100 because it's too fast
      } else {
        this.scrolling(e.deltaY / 100); //we divide by 100 because it's too fast
      }
    };
    window.addEventListener("wheel", handleWheel.bind(this));
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  scrolling(scroll) {
    TweenLite.to(this.camera.position, 0.3, {
      ease: Power1.easeOut,
      y: this.camera.position.y - scroll
    });
  }

  render() {
    // this.particleSystem.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
