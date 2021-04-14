import Main from "./Main";

class CamerKeyListeners {
    private A: string;
    private S: string;
    private D: string;
    private W: string;
    private main: Main;

    constructor(main: Main) {
        this.main = main;
        this.A = "KeyA";
        this.S = "KeyS";
        this.D = "KeyD";
        this.W = "KeyW";
    }

    private onKeyDown(e: KeyboardEvent):void {
        if (e.code === this.A) {
            this.main.camera.position.x = -14;
            this.main.camera.position.z = 0;
            this.main.camera.rotation.y = -Math.PI / 2;
        }
        if (e.code === this.D) {
            this.main.camera.position.x = 14;
            this.main.camera.position.z = 0;
            this.main.camera.rotation.y = Math.PI / 2;
        }
        if (e.code === this.W) {
            this.main.camera.position.y = 14;
            this.main.camera.position.z = 0;
            this.main.camera.rotation.x = -Math.PI / 2;
        }
        if (e.code === this.S) {
            this.main.camera.position.y = -10;
            this.main.camera.position.z = 0;
            this.main.camera.rotation.x = Math.PI / 2;
        }
        this.main.camera.updateProjectionMatrix();
    }

    private onKeyUp(e: KeyboardEvent): void {
        this.main.camera.position.x = 0;
        this.main.camera.position.y = 5;
        this.main.camera.position.z = 14;
        this.main.camera.rotation.x = 0;
        this.main.camera.rotation.y = 0;
        this.main.camera.rotation.z = 0;

        this.main.camera.updateProjectionMatrix();
    }


    public registerListeners(): void {
        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));
    }
}


export default CamerKeyListeners;