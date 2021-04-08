import Main from "src/game/Main";
import * as THREE from 'three/build/three.module';

class BallAndTarget {

    private target: THREE.Mesh;
    private ball: THREE.Mesh;
    private count: number;

    constructor(main: Main) {
        this.ball = main.basketballInstance.basketball;
        this.target = main.targetInstance.target;
        this.count = 0;
    }

    public init():void {
        document.addEventListener("keypress", this.onKeyPress.bind(this));
    }

    private onKeyPress(e: KeyboardEvent): void {
        if (e.code === "Space") {
            console.log(
                "Ball\n" +
                "BallX: " + this.ball.position.x + "\n" + 
                "BallY: " + this.ball.position.y + "\n" +  
                "BallZ: " + this.ball.position.z +  "\n" + 
                "Target\n" +
                "TargetX: " + this.target.position.x +  "\n" + 
                "TargetY: " + this.target.position.y +  "\n" + 
                "TargetZ: " + this.target.position.z + "\n" + 
                "Distances\n" +
                "xDistance: " + (this.ball.position.x - this.target.position.x)**2 + "\n" + 
                "yDistance: " + Math.abs(this.ball.position.y - this.target.position.y) + "\n" + 
                "zDistance: " + (this.ball.position.z - this.target.position.z)**2 +"\n" 
            )
        }
    }

    public isBallInTarget(): boolean {
        const xDistance: number = (this.ball.position.x - this.target.position.x)**2;
        const yDistance: number = Math.abs(this.ball.position.y - this.target.position.y);
        const zDistance: number = (this.ball.position.z - this.target.position.z) **2;
        const targetRadius: number = 5;
        const inCircle: boolean = (xDistance + zDistance) < (targetRadius**2) && yDistance < .1;
        if (inCircle) {
            this.count++;
            console.log(this.count, 'BallAndTarget.tsx', 'line: ', '24');
        }
        return inCircle;
    }
}


export default BallAndTarget;