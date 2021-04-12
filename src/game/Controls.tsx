import * as THREE from 'three/build/three.module';
import Main from './Main';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

class Controls {

    private main: Main;
    private controls!: PointerLockControls;
    private isLockedSetter!: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    public areControlsLocked: boolean;

    constructor(main: Main) {
        this.main = main;
        this.areControlsLocked = false;
    }

    private createControls(): void {
        this.controls = new PointerLockControls(this.main.camera, this.main.renderer.domElement);
        this.controls.addEventListener("unlock", this.onUnlock.bind(this));
    }

    private onUnlock(): void {
        this.isLockedSetter(false);
        this.areControlsLocked = false;
    }

    private onPointerlockError(): void {
        this.lockControls();
    }

    public init(): void {
        this.createControls();
        this.main.renderer.domElement.ownerDocument.addEventListener('pointerlockerror', this.onPointerlockError.bind(this));
    }

    public lockControls(): void {
        this.main.renderer.domElement.requestPointerLock();
        this.areControlsLocked = true;
    }

    public setIsLockedSetter(isLockedSetter: React.Dispatch<React.SetStateAction<boolean | undefined>>): void {
        this.isLockedSetter = isLockedSetter;
    }

}

export default Controls;