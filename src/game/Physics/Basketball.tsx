import 'cannon/build/cannon.min';
import Main from "../Main";
import PhysicsMain from './PhysicsMain';
import CANNON from "cannon";
import * as THREE from 'three/build/three.module';
import basketballImg from '../../assets/textures/basketball.webp';

class Basketball {

    private main: Main;
    public basketballBodies!: CANNON.Body[];
    public basketballs!: THREE.Mesh[];
    private physicsMain: PhysicsMain;
    private material!: THREE.MeshPhongMaterial;
    private texture!: THREE.Texture;

    constructor(main: Main, physicsMain: PhysicsMain) {
        this.physicsMain = physicsMain;
        this.main = main;
        this.basketballBodies = [];
        this.basketballs = []
    }

    private createTexture(): void {
        this.texture = new THREE.TextureLoader().load(basketballImg);
    }

    private createMaterial(): void {
        this.material = new THREE.MeshPhongMaterial({ map: this.texture });
    }

    private createSphere(): void {
        const geometry = new THREE.SphereGeometry(1, 16, 16);
        const basketball = new THREE.Mesh(geometry, this.material);
        this.basketballs.push(basketball);
        basketball.position.copy(this.main.camera.position);
        this.main.scene.add(basketball);

        const ballShape = new CANNON.Sphere(1);
        const ballBody = new CANNON.Body({ mass: 1 });
        ballBody.addShape(ballShape);
        ballBody.position.x = basketball.position.x;
        ballBody.position.y = basketball.position.y;
        ballBody.position.z = basketball.position.z;
        this.physicsMain.world.addBody(ballBody);
        this.basketballBodies.push(ballBody);
        this.applyVelocity();
    }

    private applyVelocity(): void {
        const velocity = new THREE.Vector3(0, 0, -1);
        velocity.applyQuaternion(this.main.camera.quaternion);
        velocity.multiplyScalar(50);
        this.basketballBodies[this.basketballBodies.length - 1].velocity.set(velocity.x, velocity.y, velocity.z);
        this.basketballBodies[this.basketballBodies.length - 1].angularVelocity.set((Math.random() * 10) + 1, (Math.random() * 10) + 1, (Math.random() * 10) + 1);
    }

    private onClick(): void {
        if (this.main.controlsInstance.areControlsLocked) {
            this.createSphere();
        }
    }

    public copyPhysicsToRealWorld(): void {
        this.basketballs.forEach((basketball, i) => {
            basketball.position.set(
                this.basketballBodies[i].position.x,
                this.basketballBodies[i].position.y,
                this.basketballBodies[i].position.z
            );
            basketball.quaternion.set(
                this.basketballBodies[i].quaternion.x,
                this.basketballBodies[i].quaternion.y,
                this.basketballBodies[i].quaternion.z,
                this.basketballBodies[i].quaternion.w,
            );
        });
    }

    private registerEventListeners(): void {
        document.addEventListener('click', this.onClick.bind(this), false);

    }

    public init(): void {
        this.registerEventListeners();
        this.createTexture();
        this.createMaterial();
    }
}

export default Basketball;