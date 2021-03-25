import * as THREE from 'three';
import GUIs from './GUI/GUIs';

class Boilerplate {

    public canvas: HTMLCanvasElement;
    public scene!: THREE.Scene;
    public camera!: THREE.Camera;
    public renderer!: THREE.Renderer;
    public sphere!: THREE.Mesh;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    // These are boilerplate three.js methods to create a scene, camera, render and animation
    // Animate is called recursively to render the animation continuously

    private createScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color("black");
    }

    private createCamera(): void {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
        this.camera.position.z = 2;
    }

    private createRenderer(): void {
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // initalise a sphere - black in colour 

    private createSphere(): void {
        const geometry = new THREE.SphereGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        this.sphere = new THREE.Mesh(geometry, material);
        this.scene.add(this.sphere);
    }


    private animate(): void {
        this.sphere.rotation.x += 0.01;
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }


    // initialise 3D default methods

    public init(): void {
        this.createScene();
        this.createCamera();
        this.createRenderer();

        this.createSphere();
        new GUIs(this).generateGUIs();
        this.animate();
    }



}

export default Boilerplate;