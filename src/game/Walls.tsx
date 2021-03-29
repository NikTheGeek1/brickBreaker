import * as THREE from 'three/build/three.module';
import Main from './Main';
import wallImg from '../assets/textures/street-wall.jpeg';
import streetImg from '../assets/textures/street.jpeg';
import skyImg from '../assets/textures/sky.jpeg';

class Walls {
    private main: Main;
    public planes: THREE.Mesh[];
    public wallMaterial!: THREE.MeshBasicMaterial;
    public streetMaterial!: THREE.MeshBasicMaterial;
    public skyMaterial!: THREE.MeshBasicMaterial;
    public wallTexture!: THREE.Texture;
    public skyTexture!: THREE.Texture;
    public streetTexture!: THREE.Texture;


    constructor(main: Main) {
        this.main = main;
        this.planes = [];
    }

    private createMaterials(): void {
        this.wallMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false, map: this.wallTexture}); // TODO: Add a street material for the bottom wall, sky for the top
        this.streetMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false, map: this.streetTexture}); // TODO: Add a street material for the bottom wall, sky for the top
        this.skyMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false, map: this.skyTexture}); // TODO: Add a street material for the bottom wall, sky for the top
    }

    private createWalls(): void {
        const geometry = new THREE.PlaneGeometry(30, 30, 30, 30);
        for (let _ = 0; _ < 6; _++) {
            let material;
            if (_ < 2 || _ > 3) material = this.wallMaterial;
            else if (_ === 2) material = this.streetMaterial;
            else if (_ === 3) material = this.skyMaterial;
            this.planes.push(new THREE.Mesh(geometry, material));
        }

        // Left
        this.planes[0].position.set(-15, 5, 0);
        this.planes[0].rotation.y = Math.PI / 2;
        // Right
        this.planes[1].position.set(15, 5, 0);
        this.planes[1].rotation.y = -Math.PI / 2;
        // Bottom
        this.planes[2].position.set(0, -10, 0);
        this.planes[2].rotation.x = -Math.PI / 2;
        // Top
        this.planes[3].position.set(0, 20, 0);
        this.planes[3].rotation.x = Math.PI / 2;
        // Back
        this.planes[4].position.set(0, 5, -15);
        this.planes[4].rotation.x = Math.PI * 2 ;
        // Front
        this.planes[5].position.set(0, 5, 15);
        this.planes[5].rotation.x = -Math.PI ;

        this.planes.forEach(plane => this.main.scene.add(plane));
    }

    private createTextrues(): void {
        this.wallTexture = new THREE.TextureLoader().load(wallImg);
        this.streetTexture = new THREE.TextureLoader().load(streetImg);
        this.skyTexture = new THREE.TextureLoader().load(skyImg);
    }

    public init(): void {
        this.createTextrues();
        this.createMaterials();
        this.createWalls();
    }

}


export default Walls;