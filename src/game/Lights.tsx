import * as THREE from 'three/build/three.module';
import Main from './Main';
import { GUI } from "three/examples/jsm/libs/dat.gui.module";

type spotLightData = { color: number, mapsEnabled: boolean };

class Lights {

    private main: Main;
    private spotLights: THREE.SpotLight[];
    private spotLightHelpers: THREE.SpotLightHelper[];
    private spotLightData: spotLightData[];
    private GUIs: GUI[];

    constructor(main: Main) {
        this.main = main;
        this.spotLights = [];
        this.spotLightHelpers = [];
        this.spotLightData = [];
        this.GUIs = [];
    }

    private createSpotLightData(): void {
        this.spotLightData = this.spotLights.map((sptLight: THREE.SpotLight) => ({ color: sptLight.color.getHex(), mapsEnabled: true }));
    }

    private createSpotLight(x: number, y: number, z: number): void {
        const spotLight = new THREE.SpotLight();
        spotLight.position.set(x, y, z);
        spotLight.angle = Math.PI / 5;
        this.spotLights.push(spotLight);
        this.main.scene.add(spotLight);

    }

    private createSpotLightHelpers(): void {
        this.spotLights.forEach((sptLight: THREE.SpotLight) => {
            const spotlightHelper = new THREE.SpotLightHelper(sptLight);
            this.spotLightHelpers.push(spotlightHelper);
            this.main.scene.add(spotlightHelper);
        });
    }

    private createSpotLightGUIs(): void {
        this.spotLights.forEach((sptLight: THREE.SpotLight, idx: number) => {
            const gui = new GUI();
            const lightFolder = gui.addFolder('THREE.Light-' + idx);
            lightFolder.addColor(this.spotLightData[idx], 'color').onChange(() => { sptLight.color.setHex(Number(this.spotLightData[idx].color.toString().replace('#', '0x'))) });
            lightFolder.add(sptLight, 'intensity', 0, 1, 0.01);
            lightFolder.close();

            const spotLightFolder = gui.addFolder('THREE.SpotLight-' + idx);
            spotLightFolder.add(sptLight, "distance", 0, 100, 0.01);
            spotLightFolder.add(sptLight, "decay", 0, 4, 0.1);
            spotLightFolder.add(sptLight, "angle", 0, 1, 0.1);
            spotLightFolder.add(sptLight, "penumbra", 0, 1, 0.1);
            spotLightFolder.add(sptLight.position, "x", -50, 50, 0.01);
            spotLightFolder.add(sptLight.position, "y", -50, 50, 0.01);
            spotLightFolder.add(sptLight.position, "z", -50, 50, 0.01);
            spotLightFolder.close();
        });
    }

    public updateHelpers(): void {
        this.spotLightHelpers.forEach(helper => helper.update());
    }

    private createSpotLights(): void {
        this.createSpotLight(-13, 20, -13);
        this.createSpotLight(13, 20, 13);
        this.createSpotLight(-13, 20, 13);
        this.createSpotLight(13, 20, -13);
    }


    public init(): void {
        // order matters here.
        this.createSpotLights();
        // this.createSpotLightHelpers();
        this.createSpotLightData();
        this.createSpotLightGUIs();
    }

}


export default Lights;