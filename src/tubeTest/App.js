// example import asset
// import imgPath from './assets/img.jpg';

// TODO : add Dat.GUI
// TODO : add Stats
import Tube from "./Tube";
var OrbitControls = require("three-orbit-controls")(THREE);
import * as dat from "dat.gui";
import textureColor from "../assets/Blue_MarbleCOLOR.jpg";
import texture2Color from "../assets/AzulejosCOLOR.jpg";
import { TweenMax } from "gsap/TweenMax";

export default class App {
  constructor() {
    // this.container = document.querySelector("#main");
    this.container = document.createElement("div");
    this.container.id = "main";
    document.body.appendChild(this.container);

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

    // let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    // let material = new THREE.MeshNormalMaterial();
    // this.mesh = new THREE.Mesh(geometry, material);
    // this.scene.add(this.mesh);

    // this.geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    var texture = new THREE.TextureLoader().load(textureColor);
    var texture2 = new THREE.TextureLoader().load(texture2Color);
    let tube = new Tube(texture);
    this.scene.add(tube.mesh);
    // this.material = new THREE.MeshBasicMaterial();
    // this.torus = new THREE.Mesh(this.geometry, this.material);
    // this.scene.add(this.torus);

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
    this.time = 0;
    this.cameraDestination = this.camera.position.y;
    console.log(this.camera.position.y);
    let handleWheel = e => {
      this.scrolling(e.deltaY);
    };
    this.scrollEasing = 2;
    window.addEventListener("wheel", handleWheel.bind(this));
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  scrolling(scroll) {
    let amount = this.camera.position.y + scroll / 100;
    console.log(amount);
    this.camera.position.y = amount;
  }
  // // t = currentTime
  // // b = beginnig value
  // // c = change value (delta between `from` and `to`)
  // // d = duration
  // easeOutBack(t, b, c, d, s) {
  //   if (s == undefined) s = 1.70158;
  //   return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  // }
  render() {
    // this.camera.position.y =
    //   (this.cameraDestination - this.camera.position.y) * this.scrollEasing;

    // console.log();
    this.time += 0.01;
    // this.camera.position.y = Math.sin(this.time) * 2;

    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
