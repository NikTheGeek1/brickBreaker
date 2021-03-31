import * as THREE from 'three/build/three.module';
import Main from './Main';

class Mousepicker {

    private main: Main;
    private raycaster!: THREE.Raycaster;
    private intersects: THREE.Intersection[];
    private pickableObjects: THREE.Mesh[];
    private intersectedObject: THREE.Object3D | null;
    private originalMaterials: { [id: string]: THREE.Material | THREE.Material[] };
    private highlightedMaterial: THREE.MeshBasicMaterial;

    constructor(main: Main) {
        this.main = main;
        this.pickableObjects = [this.main.basketballInstance.basketball];
        this.intersects = new Array();
        this.intersectedObject = null;
        this.originalMaterials = {
            [this.main.basketballInstance.basketball.name]: this.main.basketballInstance.basketball.material,
        };
        this.highlightedMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00ff00 });
    }

    private createRaycaster(): void {
        this.raycaster = new THREE.Raycaster();        
    }

    private registerEventListener(): void {
        document.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
    }

    private mouseMoveHandler(e: MouseEvent): void {
        this.raycaster.setFromCamera({
            x: (e.clientX / this.main.renderer.domElement.clientWidth) * 2 - 1,
            y: -(e.clientY / this.main.renderer.domElement.clientHeight) * 2 + 1
        }, this.main.camera);
        this.intersects = this.raycaster.intersectObjects(this.pickableObjects, false);
    
        if (this.intersects.length > 0) {
            this.intersectedObject = this.intersects[0].object;
        } else {
            this.intersectedObject = null;
        }
        this.pickableObjects.forEach((o: THREE.Mesh, i) => {
            if (this.intersectedObject?.name === o.name) {
                this.pickableObjects[i].material = this.highlightedMaterial;
            } else {
                this.pickableObjects[i].material = this.originalMaterials[o.name];
            }
        });
    }

    public inti(): void {
        this.createRaycaster();
        this.registerEventListener();
    }
}


export default Mousepicker;