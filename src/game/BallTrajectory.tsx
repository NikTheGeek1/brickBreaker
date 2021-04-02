import Main from './Main';
import { Algebra, Calculus } from '../utils/math/math-utils';

class BallTrajectory {
    private main: Main;
    private shieldLastXPositions: number[];
    private shieldLastYPositions: number[];
    private currentTrackIdx: number;
    private shieldXDirection: number;
    private shieldYDirection: number;
    private rotationX: number;
    private rotationY: number;

    constructor(main: Main) {
        this.main = main;
        this.shieldLastXPositions = [];
        this.shieldLastYPositions = [];
        this.currentTrackIdx = 0;
        this.shieldXDirection = 0;
        this.shieldYDirection = 0;
        this.rotationX = 0;
        this.rotationY = 0;
    }

    private trackShieldLastPositions(): void {
        this.shieldLastXPositions[this.currentTrackIdx % 20] = this.main.shieldInstance.plane.position.x;
        this.shieldLastYPositions[this.currentTrackIdx % 20] = this.main.shieldInstance.plane.position.y;
        this.currentTrackIdx++;
    }

    public calculateSlope(X: number[], Y: number[]): number {
        const n = Y.length;
        const slope =
            (n * Calculus.sum(...Algebra.elementWiseMult(X, Y)) - Calculus.sum(...X) * Calculus.sum(...Y)) /
            (n * Calculus.sum(...Algebra.elementWisePower(X, 2)) - Calculus.sum(...X) ^ 2);
        return slope;
    }

    private calculateShieldDirections(): void {
        this.shieldXDirection = this.calculateSlope(
            Array.from(Array(this.shieldLastXPositions.length + 1).keys()).slice(1),
            this.shieldLastXPositions);

        this.shieldYDirection = this.calculateSlope(
            Array.from(Array(this.shieldLastYPositions.length + 1).keys()).slice(1),
            this.shieldLastYPositions);

    }

    public calculateTrajectory(): void {
        this.trackShieldLastPositions();
        this.calculateShieldDirections();
        this.main.basketballInstance.basketball.position.x += this.main.basketballInstance.basketballXIncrement;
        this.main.basketballInstance.basketball.position.y += this.main.basketballInstance.basketballYIncrement;
        this.main.basketballInstance.basketball.position.z += this.main.basketballInstance.basketballZIncrement;

        this.main.basketballInstance.basketball.rotation.x -= this.rotationX;
        this.main.basketballInstance.basketball.rotation.y -= this.rotationY;



        if (this.main.basketballInstance.basketball.position.x < this.main.wallsInstance.planes[0].position.x || // left
            this.main.basketballInstance.basketball.position.x > this.main.wallsInstance.planes[1].position.x) { // right
            this.main.basketballInstance.basketballXIncrement *= -1;
            // this.rotationX = 0;
            // this.rotationY = 0;
        }
        if (this.main.basketballInstance.basketball.position.y < this.main.wallsInstance.planes[2].position.y || // bottom 
            this.main.basketballInstance.basketball.position.y > this.main.wallsInstance.planes[3].position.y) { // top
            this.main.basketballInstance.basketballYIncrement *= -1;
            // this.rotationX = 0;
            // this.rotationY = 0;
        }
        if (this.main.basketballInstance.basketball.position.z < this.main.wallsInstance.planes[4].position.z || // back
            this.main.basketballInstance.basketball.position.z > this.main.wallsInstance.planes[5].position.z) { // front
            this.main.basketballInstance.basketballZIncrement *= -1;
            // this.rotationX = 0;
            // this.rotationY = 0;
        }

        if (this.main.shieldInstance.shieldBallColisionDetector(
            this.main.basketballInstance.basketball.position.x,
            this.main.basketballInstance.basketball.position.y,
            this.main.basketballInstance.basketball.position.z
        )) {
            this.main.basketballInstance.basketballZIncrement *= -1;
             this.rotationX = this.shieldXDirection;
             this.rotationY = this.shieldYDirection;
             this.main.basketballInstance.basketballXIncrement = this.rotationX / 6;
             this.main.basketballInstance.basketballYIncrement = this.rotationY / 6;
        }

    }
}

export default BallTrajectory;