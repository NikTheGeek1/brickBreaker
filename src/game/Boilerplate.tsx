import * as THREE from 'three';

class Boilerplate {

    public canvas: HTMLCanvasElement;
    public scene!: THREE.Scene;
    public camera!: THREE.Camera;
    public renderer!: THREE.Renderer;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    private createScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color("black");
    }

    private createCamera(): void {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
        this.camera.position.z = 2;
    }

    private createRenderer(): void {
        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }


    

    private animate(): void {
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }

    public init():void {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.animate();
    }



}

export default Boilerplate;