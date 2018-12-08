export default class Boid {
  constructor(position) {
    this.position = position || new THREE.Vector3(0, 1, 0);
    this.velocity = new THREE.Vector3();
    this.acceleration = new THREE.Vector3();
    this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    this.material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
  }

  update() {}
}
