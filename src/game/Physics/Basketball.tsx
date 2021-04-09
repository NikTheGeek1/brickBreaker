import 'cannon/build/cannon.min';
import * as THREE from 'three/build/three.module';
import Main from "../Main";
import PhysicsMain from './PhysicsMain';
import CANNON from "cannon";


class Basketball {

    private targetShape!: CANNON.Sphere;
    public targetBody!: CANNON.Body;
    private physicsMain: PhysicsMain;
    private main: Main;

    constructor(main: Main, physicsMain: PhysicsMain) {
        this.physicsMain = physicsMain;
        this.main = main;
    }

    private createSphere(): void {
        this.targetShape = new CANNON.Sphere(1);
        this.targetBody = new CANNON.Body({ mass: 1 });
        this.targetBody.addShape(this.targetShape);
        this.targetBody.position.x = this.main.targetInstance.target.position.x;
        this.targetBody.position.y = this.main.targetInstance.target.position.y;
        this.targetBody.position.z = this.main.targetInstance.target.position.z;
        this.physicsMain.world.addBody(this.targetBody);
    }

    public init():void {
        this.createSphere();
    }
}

export default Basketball;