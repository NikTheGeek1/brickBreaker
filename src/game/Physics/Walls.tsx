import 'cannon/build/cannon.min';
import * as THREE from 'three/build/three.module';
import PhysicsMain from './PhysicsMain';
import CANNON from "cannon";


class Walls {

    private physicsMain: PhysicsMain;
    private planes!: CANNON.Body[];

    constructor(physicsMain: PhysicsMain) {
        this.physicsMain = physicsMain;
        this.planes = [];
    }

    private createWalls():void {
        const planeShape = new CANNON.Box(new CANNON.Vec3(30, 30, 0.1));

        // LEFT
        this.planes.push(new CANNON.Body({ mass: 0}));
        this.planes[0].addShape(planeShape);
        this.physicsMain.world.addBody(this.planes[0]);
        this.planes[0].position.set(-15, 5, 0);
        this.planes[0].quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2);
        // RIGHT
        this.planes.push(new CANNON.Body({ mass: 0}));
        this.planes[1].addShape(planeShape);
        this.physicsMain.world.addBody(this.planes[1]);
        this.planes[1].position.set(15, 5, 0);
        this.planes[1].quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2);
        // BOTTOM
        this.planes.push(new CANNON.Body({ mass: 0}));
        this.planes[2].addShape(planeShape);
        this.physicsMain.world.addBody(this.planes[2]);
        this.planes[2].position.set(0, -10, 0);
        this.planes[2].quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        // TOP
        this.planes.push(new CANNON.Body({ mass: 0}));
        this.planes[3].addShape(planeShape);
        this.physicsMain.world.addBody(this.planes[3]);
        this.planes[3].position.set(0, 20, 0);
        this.planes[3].quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
        // BACK
        this.planes.push(new CANNON.Body({ mass: 0}));
        this.planes[4].addShape(planeShape);
        this.physicsMain.world.addBody(this.planes[4]);
        this.planes[4].position.set(0, 5, -15);
        this.planes[4].quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI * 2);
        // FRONT
        this.planes.push(new CANNON.Body({ mass: 0}));
        this.planes[5].addShape(planeShape);
        this.physicsMain.world.addBody(this.planes[5]);
        this.planes[5].position.set(0, 5, 15);
        this.planes[5].quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI);


    }

    public init():void {
        this.createWalls();
    }
}


export default Walls;