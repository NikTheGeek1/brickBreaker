import 'cannon/build/cannon.min';
import Main from "../Main";
import PhysicsMain from './PhysicsMain';
import CANNON from "cannon";
import * as THREE from 'three/build/three.module';

class Basketball {

    private targetShape!: CANNON.Sphere;
    public ballBody!: CANNON.Body;
    private physicsMain: PhysicsMain;
    private main: Main;
    private velocity!: THREE.Vector3;

    constructor(main: Main, physicsMain: PhysicsMain) {
        this.physicsMain = physicsMain;
        this.main = main;
    }

    private createSphere(): void {
        this.targetShape = new CANNON.Sphere(1);
        this.ballBody = new CANNON.Body({ mass: 1 });
        this.ballBody.addShape(this.targetShape);
        this.ballBody.position.x = this.main.basketballInstance.basketball.position.x;
        this.ballBody.position.y = this.main.basketballInstance.basketball.position.y;
        this.ballBody.position.z = this.main.basketballInstance.basketball.position.z;
        this.physicsMain.world.addBody(this.ballBody);
        }
    
    private createVelocity():void {
        this.velocity = new THREE.Vector3(0, 0, -1);
        this.velocity.applyQuaternion(this.physicsMain.main.camera.quaternion);
        this.velocity.multiplyScalar(50);
        this.ballBody.velocity.set(this.velocity.x, this.velocity.y, this.velocity.z);
        this.ballBody.angularVelocity.set((Math.random() * 10) + 1, (Math.random() * 10) + 1, (Math.random() * 10) + 1);
    }

    public init():void {
        this.createSphere();
        this.createVelocity();
    }
}

export default Basketball;