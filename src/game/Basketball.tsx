import * as THREE from 'three/build/three.module';
import Main from './Main';
import basketballImg from '../assets/textures/basketball.webp';
import { GUI } from "three/examples/jsm/libs/dat.gui.module";

type sphereData = { radius?: number, widthSegments?: number, heightSegments?: number, phiStart?: number, phiLength?: number, thetaStart?: number, thetaLength?: number };
class Basketball {
    // private main: Main;
    // public basketball!: THREE.Mesh;
    // private material!: THREE.MeshPhongMaterial;
    // private texture!: THREE.Texture;
    // public basketballXIncrement: number;
    // public basketballYIncrement: number;
    // public basketballZIncrement: number;

    // private GUI!: GUI;
    // private sphereData: sphereData;

    // constructor(main: Main) {
    //     this.main = main;
    //     this.sphereData = {
    //         radius: 1,
    //         widthSegments: 5,
    //         heightSegments: 5,
    //         phiStart: Math.PI * 2,
    //         phiLength: Math.PI * 2,
    //         thetaStart: Math.PI,
    //         thetaLength: Math.PI
    //     };
    //     this.basketballXIncrement = 0.01;
    //     this.basketballYIncrement = 0.01;
    //     this.basketballZIncrement = .12;
    // }


    // private createTexture(): void {
    //     this.texture = new THREE.TextureLoader().load(basketballImg);
    // }

    // private createMaterial(): void {
    //     this.material = new THREE.MeshPhongMaterial({ map: this.texture });
    // }

    // private createBasketball(): void {
    //     const geometry = new THREE.SphereGeometry(); // TODO: add the correct properties
    //     this.basketball = new THREE.Mesh(geometry, this.material);
    //     this.basketball.position.z = this.main.shieldInstance.plane.position.z;
    //     this.basketball.position.y = this.main.shieldInstance.plane.position.y;
    //     this.basketball.position.x = this.main.shieldInstance.plane.position.x;
    //     this.main.scene.add(this.basketball);
    // }

    // private createGUI(): void {
    //     this.GUI = new GUI();
    // }

    // private createSphereGUI(): void {
    //     const sphereFolder = this.GUI.addFolder("Basketball");
    //     const rotationFolder = sphereFolder.addFolder("Rotation");
    //     rotationFolder.add(this.basketball.rotation, "x", 0, Math.PI * 2, 0.01);
    //     rotationFolder.add(this.basketball.rotation, "y", 0, Math.PI * 2, 0.01);
    //     rotationFolder.add(this.basketball.rotation, "z", 0, Math.PI * 2, 0.01);

    //     const positionFolder = sphereFolder.addFolder("Postion");
    //     positionFolder.add(this.basketball.position, "x", 1, 10, 0.01);
    //     positionFolder.add(this.basketball.position, "y", 1, 10, 0.01);
    //     positionFolder.add(this.basketball.position, "z", 1, 10, 0.01);

    //     const scaleFolder = sphereFolder.addFolder("Scale");
    //     scaleFolder.add(this.basketball.scale, "x", 1, 10, 0.01);
    //     scaleFolder.add(this.basketball.scale, "y", 1, 10, 0.01);
    //     scaleFolder.add(this.basketball.scale, "z", 1, 10, 0.01);

    //     sphereFolder.add(this.material, 'wireframe');
    //     sphereFolder.add(this.basketball, "visible", true);

    //     const spherePropertiesFolder = sphereFolder.addFolder("Properties");
    //     spherePropertiesFolder.add(this.sphereData, 'radius', .1, 30).onChange(this.regenerateSphereGeometry.bind(this));
    //     spherePropertiesFolder.add(this.sphereData, 'widthSegments', 1, 32).onChange(this.regenerateSphereGeometry.bind(this));
    //     spherePropertiesFolder.add(this.sphereData, 'heightSegments', 1, 32).onChange(this.regenerateSphereGeometry.bind(this));
    //     spherePropertiesFolder.add(this.sphereData, 'phiStart', 0, Math.PI * 2).onChange(this.regenerateSphereGeometry.bind(this));
    //     spherePropertiesFolder.add(this.sphereData, 'phiLength', 0, Math.PI * 2).onChange(this.regenerateSphereGeometry.bind(this));
    //     spherePropertiesFolder.add(this.sphereData, 'thetaStart', 0, Math.PI).onChange(this.regenerateSphereGeometry.bind(this));
    //     spherePropertiesFolder.add(this.sphereData, 'thetaLength', 0, Math.PI).onChange(this.regenerateSphereGeometry.bind(this));
    // }

    // private regenerateSphereGeometry(): void {
    //     const newGeometry = new THREE.SphereGeometry(
    //         this.sphereData.radius, this.sphereData.widthSegments,
    //         this.sphereData.heightSegments, this.sphereData.phiStart,
    //         this.sphereData.phiLength, this.sphereData.thetaStart,
    //         this.sphereData.thetaLength
    //     );
    //     this.basketball.geometry.dispose();
    //     this.basketball.geometry = newGeometry;
    // }


    // public init(): void {
    //     this.createTexture();
    //     this.createMaterial();
    //     this.createBasketball();
    //     this.createGUI();
    //     this.createSphereGUI();
    // }

}

export default Basketball;