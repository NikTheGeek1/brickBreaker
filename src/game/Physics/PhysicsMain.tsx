import * as THREE from 'three/build/three.module';
import 'cannon/build/cannon.min';
import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import Main from '../Main';
import Target from './Target';
import CANNON from "cannon";
import Basketball from './Basketball';
import DebugRenderer from './DebugRenderer';
import Walls from './Walls';

class PhysicsMain {

    public main: Main;
    public world!: CANNON.World;
    private gui!: GUI;
    private clock: THREE.Clock = new THREE.Clock();
    private targetInstance!: Target;
    private ballInstance!: Basketball;
    private debugRenderer!: DebugRenderer;
    private wallsInstance!: Walls;

    constructor(main: Main) {
        this.main = main;
    }

    private createGUI(): void {
        this.gui = new GUI();
        const physicsFolder = this.gui.addFolder("Physics");
        physicsFolder.add(this.world.gravity, "x", -10.0, 10.0, 0.1);
        physicsFolder.add(this.world.gravity, "y", -10.0, 10.0, 0.1);
        physicsFolder.add(this.world.gravity, "z", -10.0, 10.0, 0.1);
        physicsFolder.open();
    }


    private createWorld(): void {
        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.82, 0);
        //world.solver.iterations = 10
        //world.allowSleep = true
        this.world.broadphase = new CANNON.NaiveBroadphase();
    }


    private crateTargetInstance(): void {
        this.targetInstance = new Target(this.main, this);
        this.targetInstance.init();
    }

    private createBallInstane(): void {
        this.ballInstance = new Basketball(this.main, this);
        this.ballInstance.init();
    }
    private copyPhysicsToRealWorldCoord(): void {

        // Copy coordinates from Cannon.js to Three.js
        this.main.basketballInstance.basketball.position.set(
            this.ballInstance.targetBody.position.x,
            this.ballInstance.targetBody.position.y,
            this.ballInstance.targetBody.position.z
        );
        this.main.basketballInstance.basketball.quaternion.set(
            this.ballInstance.targetBody.quaternion.x,
            this.ballInstance.targetBody.quaternion.y,
            this.ballInstance.targetBody.quaternion.z,
            this.ballInstance.targetBody.quaternion.w
        );
        this.main.targetInstance.target.position.set(
            this.targetInstance.targetBody.position.x,
            this.targetInstance.targetBody.position.y,
            this.targetInstance.targetBody.position.z
        );
        this.main.targetInstance.target.quaternion.set(
            this.targetInstance.targetBody.quaternion.x,
            this.targetInstance.targetBody.quaternion.y,
            this.targetInstance.targetBody.quaternion.z,
            this.targetInstance.targetBody.quaternion.w
        );

    }

    private createDebugRenderer():void {
        this.debugRenderer = new DebugRenderer(this);
    }

    private createWalls():void {
        this.wallsInstance = new Walls(this);
        this.wallsInstance.init();
    }

    public init(): void {
        this.createWorld();
        this.createGUI();
        this.crateTargetInstance();
        this.createBallInstane();
        // this.createDebugRenderer();
        this.createWalls();
    }


    public linkPhysicsToRealWorld(): void {
        let delta = this.clock.getDelta();
        if (delta > .1) delta = .1;
        this.world.step(delta);

        this.copyPhysicsToRealWorldCoord();

        // this.debugRenderer.updateDebugger();
    }





}


export default PhysicsMain;