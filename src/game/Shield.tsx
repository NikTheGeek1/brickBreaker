import * as THREE from 'three/build/three.module';
import Main from './Main';

class Shield {

    private main: Main;
    private plane!: THREE.Mesh;
    private raycaster!: THREE.Raycaster;

    constructor(main: Main) {
        this.main = main;
    }

    private createRaycaster(): void {
        this.raycaster = new THREE.Raycaster();
    }

    private createPlane(): void {
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, wireframe: true });
        const geometry = new THREE.PlaneGeometry(5, 5, 2, 2);
        this.plane = new THREE.Mesh(geometry, material);
        this.main.scene.add(this.plane);
    }

    private registerEventListener(): void {
        document.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
    }

    private mouseMoveHandler(e: MouseEvent): void {
        const x = (e.clientX / this.main.renderer.domElement.clientWidth) * 2 - 1;
        const y = -(e.clientY / this.main.renderer.domElement.clientHeight) * 2 + 1;
        this.raycaster.setFromCamera({
            x: x,
            y: y
        }, this.main.camera);
        const coords = this.raycaster.ray.at(this.main.camera.position.z, new THREE.Vector3());
        this.plane.position.set(coords.x, coords.y, 1);
    }

    public shieldBallColisionDetector(ballX: number, ballY: number, ballZ: number): boolean {
        const shieldX = this.plane.position.x;
        const shieldY = this.plane.position.y;
        const shieldZ = this.plane.position.z;
        
        const shieldX1 = shieldX - (5/2);
        const shieldX2 = shieldX + (5/2);

        const shieldY1 = shieldY - (5/2);
        const shieldY2 = shieldY + (5/2);

        if (ballX >= shieldX1 && ballX <= shieldX2 && 
            ballY >= shieldY1 && ballY <= shieldY2 &&
            ballZ > shieldZ && ballZ < shieldZ + 1) {
                return true;
            }
        return false;
    }


    public init(): void {
        this.createPlane();
        this.createRaycaster();
        this.registerEventListener();
    }
}


export default Shield;