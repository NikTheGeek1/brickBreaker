import * as THREE from 'three/build/three.module';
import Walls from './Walls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Basketball from './Basketball';
import Stats from 'three/examples/jsm/libs/stats.module';
import Mousepicker from './Mousepicker';
import Shield from './Shield';
import Lights from './Lights';
import Shadows from './Shadows';

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
    private stats!: Stats;


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
        this.camera.position.z = 20;
    }

    private createRenderer(): void {
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private createOrbitControlls(): void {
        this.orbitControlls = new OrbitControls(this.camera, this.canvas);
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

    private animate(): void {
        this.basketballInstance.basketball.position.x += this.basketballInstance.basketballXIncrement;
        this.basketballInstance.basketball.position.y += this.basketballInstance.basketballYIncrement;
        this.basketballInstance.basketball.position.z += this.basketballInstance.basketballZIncrement;

        if (this.basketballInstance.basketball.position.x < this.wallsInstance.planes[0].position.x ||
            this.basketballInstance.basketball.position.x > this.wallsInstance.planes[1].position.x) {
            this.basketballInstance.basketballXIncrement *= -1;
        }
        if (this.basketballInstance.basketball.position.y < this.wallsInstance.planes[2].position.y ||
            this.basketballInstance.basketball.position.y > this.wallsInstance.planes[3].position.y) {
            this.basketballInstance.basketballYIncrement *= -1;
        }
        if (this.basketballInstance.basketball.position.z < this.wallsInstance.planes[4].position.z ||
            this.basketballInstance.basketball.position.z > this.wallsInstance.planes[5].position.z) {
            this.basketballInstance.basketballZIncrement *= -1;
        }

        if (this.shieldInstance.shieldBallColisionDetector(
            this.basketballInstance.basketball.position.x,
            this.basketballInstance.basketball.position.y,
            this.basketballInstance.basketball.position.z
        )) {
            this.basketballInstance.basketballXIncrement *= -1;
            // this.basketballInstance.basketballYIncrement *= -1;
            this.basketballInstance.basketballZIncrement *= -1;
        }

        this.lightsInstance.changeLightColours();
        this.lightsInstance.updateHelpers();
        this.shadowsInstance.updateShadowHelpers();
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
        this.createOrbitControlls();
        this.createStats();
        this.createWalls();
        this.createBasketball();
        this.createMousepicker();
        this.createShield();
        this.createLights();
        this.createShadows();
        this.animate();
    }



}

export default Main;