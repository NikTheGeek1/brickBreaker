import Randomness from '../utils/Randomness';
import * as THREE from 'three/build/three.module';
import Main from './Main';

class Target {

    public main: Main;
    public target!: THREE.Mesh;
    public material!: THREE.MeshNormalMaterial;

    constructor(main: Main) {
        this.main = main;
    }

    private createMaterial(): void {
        this.material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
    }

    private createRing(): void {
        const geometry = new THREE.TorusGeometry(5, .5, 10, 10, Math.PI * 2);
        this.target = new THREE.Mesh(geometry, this.material);
        this.easyTarget();
        this.main.scene.add(this.target);
    }

    private easyTarget(): void {
        this.target.position.set(
            Randomness.randomInt(-10, 10),
            Randomness.randomInt(-10, 10), 
            -10);
        this.target.rotation.x = Math.PI / 2;
    }

    public init(): void {
        this.createMaterial();
        this.createRing();
    }


}


export default Target;