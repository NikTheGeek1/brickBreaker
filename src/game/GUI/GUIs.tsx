import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import Boilerplate from "../Boilerplate";
import * as THREE from 'three';


type sphereData = { radius?: number, widthSegments?: number, heightSegments?: number, phiStart?: number, phiLength?: number, thetaStart?: number, thetaLength?: number };
class GUIs {

    private boilerplate: Boilerplate;
    private GUI!: GUI;
    private sphereData: sphereData;

    constructor(boilerplate: Boilerplate) {
        this.boilerplate = boilerplate;
        this.sphereData = {
            radius: 1,
            widthSegments: 1,
            heightSegments: 1,
            phiStart: 1,
            phiLength: 1,
            thetaStart: 1,
            thetaLength: 1
        };
    }

    private createGUI(): void {
        this.GUI = new GUI();
    }

    private createSphereGUI(): void {
        const sphereFolder = this.GUI.addFolder("Sphere");
        const rotationFolder = sphereFolder.addFolder("Rotation");
        rotationFolder.add(this.boilerplate.sphere.rotation, "x", 0, Math.PI * 2, 0.01);
        rotationFolder.add(this.boilerplate.sphere.rotation, "y", 0, Math.PI * 2, 0.01);
        rotationFolder.add(this.boilerplate.sphere.rotation, "z", 0, Math.PI * 2, 0.01);

        const positionFolder = sphereFolder.addFolder("Postion");
        positionFolder.add(this.boilerplate.sphere.position, "x", 1, 10, 0.01);
        positionFolder.add(this.boilerplate.sphere.position, "y", 1, 10, 0.01);
        positionFolder.add(this.boilerplate.sphere.position, "z", 1, 10, 0.01);

        const scaleFolder = sphereFolder.addFolder("Scale");
        scaleFolder.add(this.boilerplate.sphere.scale, "x", 1, 10, 0.01);
        scaleFolder.add(this.boilerplate.sphere.scale, "y", 1, 10, 0.01);
        scaleFolder.add(this.boilerplate.sphere.scale, "z", 1, 10, 0.01);

        sphereFolder.add(this.boilerplate.sphere, "visible", true);

        const spherePropertiesFolder = sphereFolder.addFolder("Properties");
        spherePropertiesFolder.add(this.sphereData, 'radius', .1, 30).onChange(this.regenerateSphereGeometry.bind(this));
        spherePropertiesFolder.add(this.sphereData, 'widthSegments', 1, 32).onChange(this.regenerateSphereGeometry.bind(this));
        spherePropertiesFolder.add(this.sphereData, 'heightSegments', 1, 32).onChange(this.regenerateSphereGeometry.bind(this));
        spherePropertiesFolder.add(this.sphereData, 'phiStart', 0, Math.PI * 2).onChange(this.regenerateSphereGeometry.bind(this));
        spherePropertiesFolder.add(this.sphereData, 'phiLength', 0, Math.PI * 2).onChange(this.regenerateSphereGeometry.bind(this));
        spherePropertiesFolder.add(this.sphereData, 'thetaStart', 0, Math.PI).onChange(this.regenerateSphereGeometry.bind(this));
        spherePropertiesFolder.add(this.sphereData, 'thetaLength', 0, Math.PI).onChange(this.regenerateSphereGeometry.bind(this));
    }


    private regenerateSphereGeometry(): void {
        const newGeometry = new THREE.SphereGeometry(
            this.sphereData.radius, this.sphereData.widthSegments, 
            this.sphereData.heightSegments, this.sphereData.phiStart,
            this.sphereData.phiLength, this.sphereData.thetaStart,
            this.sphereData.thetaLength
        );
        this.boilerplate.sphere.geometry.dispose();
        this.boilerplate.sphere.geometry = newGeometry;
    }


    public generateGUIs(): void {
        this.createGUI();
        this.createSphereGUI();
    }
}


export default GUIs;