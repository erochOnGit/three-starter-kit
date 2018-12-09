export default class Boid {
  constructor(position, velocity) {
    this.position = position || new THREE.Vector3(0, 1, 0);
    this.velocity = velocity || new THREE.Vector3(0.0, 0.001, 0.0);
    this.acceleration = new THREE.Vector3();
    this.alignement = new THREE.Vector3();
    this.geometry = new THREE.SphereGeometry(0.1, 32, 32);
    // this.geometry = new THREE.ConeGeometry(0.1, 0.4, 8);
    this.material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    //the distance of perception of others boids
    this.perception = 0.7;
    this.maxForce = new THREE.Vector3(0.02, 0.02, 0.02);
    this.edge = 5;
  }

  align(boids) {
    let steering = new THREE.Vector3();
    let total = 0;
    boids.forEach(boid => {
      let distance = this.position.distanceTo(boid.position);
      if (boid != this && distance < this.perception) {
        steering.add(boid.velocity);
        total++;
      }
    });
    if (total > 0) {
      steering.divideScalar(total);
      steering.sub(this.velocity);
      //   steering.min(this.maxForce);
      // if (steering.length() > 0.05) {
      //   steering.divideScalar(steering.length() - 0.05);
      //   console.log("Modified length", steering.length());
      // }
      //   console.log(steering);
    }
    return steering;
  }

  flock(boids) {
    this.alignement = this.align(boids);
    if (this.alignement.length() < 0.0001) {
      this.alignement.multiplyScalar(1000);
    } else if (this.alignement.length() > 0.01) {
      this.alignement.divideScalar(10);
    }
    this.acceleration = this.alignement;
  }

  update() {
    this.position.add(this.velocity);
    // console.log(this.velocity);
    this.velocity.add(this.acceleration);
    // console.log(this.acceleration);
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
  }

  edges() {
    if (this.position.x > this.edge) {
      this.position.x = -this.edge;
    } else if (this.position.x < -this.edge) {
      this.position.x = this.edge;
    }
    if (this.position.y > this.edge) {
      this.position.y = -this.edge;
    } else if (this.position.y < -this.edge) {
      this.position.y = this.edge;
    }
    if (this.position.z > this.edge) {
      this.position.z = -this.edge;
    } else if (this.position.z < -this.edge) {
      this.position.z = this.edge;
    }
  }
}
