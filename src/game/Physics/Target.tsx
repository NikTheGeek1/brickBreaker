import 'cannon/build/cannon.min';
import * as THREE from 'three/build/three.module';
import Main from "../Main";
import PhysicsMain from './PhysicsMain';
import CANNON from "cannon";

class Target  {

    private targetShape!: CANNON.Trimesh;
    public targetBody!: CANNON.Body;
    private physicsMain: PhysicsMain;
    private main: Main;

    constructor(main: Main, physicsMain: PhysicsMain) {
        this.main = main;
        this.physicsMain = physicsMain;
    }

    private createTrimesh(geometry: THREE.BufferGeometry): CANNON.Trimesh {
        const vertices = (geometry as THREE.BufferGeometry).attributes.position.array;
        const indices = Object.keys(vertices).map(Number);
        return new CANNON.Trimesh(vertices as [], indices);
    }

    private createTarget(): void {
        this.targetShape = this.createTrimesh(this.main.targetInstance.target.geometry);
        this.targetBody = new CANNON.Body({ mass: 0 });
        this.targetBody.addShape(this.targetShape);
        this.targetBody.position.x = this.main.targetInstance.target.position.x;
        this.targetBody.position.y = this.main.targetInstance.target.position.y;
        this.targetBody.position.z = this.main.targetInstance.target.position.z;
        this.physicsMain.world.addBody(this.targetBody);
    }

    public init():void {
        this.createTarget();
    }
}


export default Target;