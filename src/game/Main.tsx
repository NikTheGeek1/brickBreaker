import * as THREE from 'three/build/three.module';
import Walls from './Walls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Basketball from './Basketball';
import Stats from 'three/examples/jsm/libs/stats.module';
import Mousepicker from './Mousepicker';
import Shield from './Shield';
import Lights from './Lights';
import Shadows from './Shadows';
import BallTrajectory from './BallTrajectory';
import Target from './Target';
import CameraKeyListeners from './CameraKeyListeners';
import BallAndTarget from '../utils/BallAndTarget';

class Main {

    public canvas: HTMLCanvasElement;
    public scene!: THREE.Scene;
    public camera!: THREE.PerspectiveCamera;
    public renderer!: THREE.WebGLRenderer;
    public wallsInstance!: Walls;
    public basketballInstance!: Basketball;
    public orbitControlls!: OrbitControls;
    public shieldInstance!: Shield;
    public mousePickerInstance!: Mousepicker;
    public lightsInstance!: Lights;
    public shadowsInstance!: Shadows;
    public targetInstance!: Target;
    public ballTrajectory!: BallTrajectory;
    private stats!: Stats;
    private ballAndTarget!: BallAndTarget;


    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    private onWindowResize(): void {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private createScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color("black");
    }

    private createCamera(): void {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
        this.camera.position.y = 5;
        this.camera.position.z = 30;
    }

    private createRenderer(): void {
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private createOrbitControlls(): void {
        this.orbitControlls = new OrbitControls(this.camera, this.canvas);
        this.orbitControlls.enableRotate = false;
        this.orbitControlls.enablePan = false;
    }

    private createStats(): void {
        this.stats = Stats();
        document.body.appendChild(this.stats.dom);
    }

    private createWalls(): void {
        this.wallsInstance = new Walls(this);
        this.wallsInstance.init();
    }

    private createBasketball(): void {
        this.basketballInstance = new Basketball(this);
        this.basketballInstance.init();
    }

    private createMousepicker(): void {
        this.mousePickerInstance = new Mousepicker(this);
        this.mousePickerInstance.inti();
    }

    private createShield(): void {
        this.shieldInstance = new Shield(this);
        this.shieldInstance.init();
    }

    private createLights(): void {
        this.lightsInstance = new Lights(this);
        this.lightsInstance.init();
    }

    private createShadows(): void {
        this.shadowsInstance = new Shadows(this);
        this.shadowsInstance.init();
    }

    private createBallTrajectory(): void {
        this.ballTrajectory = new BallTrajectory(this);
        this.ballTrajectory.init();
    }

    private createTargetInstance(): void {
        this.targetInstance = new Target(this);
        this.targetInstance.init();
    }

    private registerCamerKeyListeners():void {
        new CameraKeyListeners(this).registerListeners();
    }

    private createBallAndTargetInstance(): void {
        this.ballAndTarget = new BallAndTarget(this);
    }

    private animate(): void {
        this.ballTrajectory.calculateTrajectory();
        this.ballAndTarget.isBallInTarget();
        // this.lightsInstance.changeLightColours();
        // this.lightsInstance.updateHelpers();
        // this.shadowsInstance.updateShadowHelpers();
        requestAnimationFrame(this.animate.bind(this));
        this.stats.update();
        this.renderer.render(this.scene, this.camera);
    }

    // initialise 3D default methods
    public init(): void {
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this.createScene();
        this.createCamera();
        this.createRenderer();
        // this.createOrbitControlls();
        this.createStats();
        this.createWalls();
        this.createBasketball();
        // this.createMousepicker();
        this.createShield();
        this.createLights();
        this.createTargetInstance();
        this.registerCamerKeyListeners();
        // this.createShadows();
        this.createBallTrajectory();
        this.createBallAndTargetInstance();
        this.ballAndTarget.init();
        this.animate();
    }



}

export default Main;