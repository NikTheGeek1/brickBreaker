import * as THREE from 'three/build/three.module';
import Main from './Main';

class Shadows {

    private main: Main;
    private shadowHelpers: THREE.CameraHelper[];


    constructor(main: Main) {
        this.main = main;
        this.shadowHelpers = [];

    }

    private configureLights(): void {
        this.main.lightsInstance.spotLights.forEach((sptLight: THREE.SpotLight) => {
            sptLight.castShadow = true;
            sptLight.castShadow = true;
            sptLight.shadow.mapSize.width = 512;
            sptLight.shadow.mapSize.height = 512;
            sptLight.shadow.camera.near = 0.5;
            sptLight.shadow.camera.far = 100;
        });
    }

    private configureRenderer(): void {
        this.main.renderer.shadowMap.enabled = true;
        this.main.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // this.main.renderer.shadowMap.type = THREE.BasicShadowMap;
        // this.main.renderer.shadowMap.type = THREE.PCFShadowMap;
        // this.main.renderer.shadowMap.type = THREE.VSMShadowMap;
    }


    private createShadowHelpers(): void {
        this.main.lightsInstance.spotLights.forEach((sptLight: THREE.SpotLight) => {
            const helper = new THREE.CameraHelper(sptLight.shadow.camera);
            this.shadowHelpers.push(helper);
            this.main.scene.add(helper);
        });
    }

    public updateShadowHelpers(): void {
        this.shadowHelpers.forEach((helper: THREE.CameraHelper) => {
            helper.update();
        });
    }

    private configureBasketball(): void {
        this.main.basketballInstance.basketball.castShadow = true;
        this.main.basketballInstance.basketball.receiveShadow = true;
    }

    private configureShield(): void {
        this.main.shieldInstance.plane.receiveShadow = true;
        this.main.shieldInstance.plane.castShadow = true;
    }

    private configureWalls(): void {
        this.main.wallsInstance.planes.forEach((wall: THREE.Mesh) => {
            wall.receiveShadow = true;
        });
    }


    public init(): void {
        // this.createShadowHelpers();
        this.configureLights();
        this.configureRenderer();
        this.configureBasketball();
        this.configureShield();
        this.configureWalls();
    }
}


export default Shadows;