import Main from './Main';
import { Algebra, Calculus } from '../utils/math/math-utils';

class BallTrajectory {
    
    // private main: Main;
    // private shieldLastXPositions: number[];
    // private shieldLastYPositions: number[];
    // private shouldTrackShieldDirections: boolean;
    // private shieldXDirection: number;
    // private shieldYDirection: number;
    // private rotationX: number;
    // private rotationY: number;
    // private rotationDecrement: number;
    // public ballOnShield: boolean;

    // constructor(main: Main) {
    //     this.main = main;
    //     this.shieldLastXPositions = [];
    //     this.shieldLastYPositions = [];
    //     this.shouldTrackShieldDirections = false;
    //     this.shieldXDirection = 0;
    //     this.shieldYDirection = 0;
    //     this.rotationX = 0;
    //     this.rotationY = 0;
    //     this.rotationDecrement = 0.01;
    //     this.ballOnShield = false;
    // }

    // private releaseBall(): void {
    //     if (this.ballOnShield) {
    //         // this.main.basketballInstance.basketballXIncrement = 0.01;
    //         // this.main.basketballInstance.basketballYIncrement = 0.01;
    //         // this.main.basketballInstance.basketballZIncrement = -0.12;
    //         this.rotationX = this.shieldXDirection;
    //         this.rotationY = this.shieldYDirection;
    //         this.incrementPositions();
    //         this.shieldLastXPositions = [];
    //         this.shieldLastYPositions = [];

    //         this.shouldTrackShieldDirections = false;
    //         this.ballOnShield = false;
    //     }
    // }

    // private startTrackingShieldDirection(): void {
    //     if (this.ballOnShield) {
    //         this.shouldTrackShieldDirections = true;
    //     }
    // }

    // private registerEventListeners(): void {
    //     document.addEventListener("mousedown", this.startTrackingShieldDirection.bind(this), false);
    //     document.addEventListener("mouseup", this.releaseBall.bind(this), false);
    // }

    // private trackShieldLastPositions(): void {
    //     if (this.shouldTrackShieldDirections) {
    //         this.shieldLastXPositions.push(this.main.shieldInstance.plane.position.x);
    //         this.shieldLastYPositions.push(this.main.shieldInstance.plane.position.y);
    //     }
    // }

    // public calculateSlope(X: number[], Y: number[]): number {
    //     const n = Y.length;
    //     const slope =
    //         (n * Calculus.sum(...Algebra.elementWiseMult(X, Y)) - Calculus.sum(...X) * Calculus.sum(...Y)) /
    //         (n * Calculus.sum(...Algebra.elementWisePower(X, 2)) - Calculus.sum(...X) ^ 2);
    //     return slope;
    // }

    // private calculateShieldDirections(): void {
    //     this.shieldXDirection = this.calculateSlope(
    //         Array.from(Array(this.shieldLastXPositions.length + 1).keys()).slice(1),
    //         this.shieldLastXPositions) * -1;

    //     this.shieldYDirection = this.calculateSlope(
    //         Array.from(Array(this.shieldLastYPositions.length + 1).keys()).slice(1),
    //         this.shieldLastYPositions) * -1;
    // }

    // private incrementPositions(): void {
    //     // this.main.basketballInstance.basketballYIncrement += this.rotationY / 150;
    //     // this.main.basketballInstance.basketballXIncrement += this.rotationX / 150;
    //     // this.main.basketballInstance.basketball.position.x += this.main.basketballInstance.basketballXIncrement;
    //     // this.main.basketballInstance.basketball.position.y += this.main.basketballInstance.basketballYIncrement;
    //     // this.main.basketballInstance.basketball.position.z += this.main.basketballInstance.basketballZIncrement;
    // }

    // private decrementRotations(): void {
    //     if (this.rotationX > 0.1) {
    //         this.rotationX -= this.rotationDecrement;
    //     } else if (this.rotationX < -0.1) {
    //         this.rotationX += this.rotationDecrement;
    //     }

    //     if (this.rotationY > 0.1) {
    //         this.rotationY -= this.rotationDecrement;
    //     } else if (this.rotationY < -0.1) {
    //         this.rotationY += this.rotationDecrement;
    //     }

    // }

    // private changeRotations(): void {
    //     // this.main.basketballInstance.basketball.rotation.x -= this.rotationX;
    //     // this.main.basketballInstance.basketball.rotation.y -= this.rotationY;
    // }

    // private checkIfBallHitsAWall(): void {
    //     // if (this.main.basketballInstance.basketball.position.x < this.main.wallsInstance.planes[0].position.x || // left
    //         // this.main.basketballInstance.basketball.position.x > this.main.wallsInstance.planes[1].position.x) { // right
    //         // this.main.basketballInstance.basketballXIncrement *= -1;
    //         // this.rotationX = 0;
    //         // this.rotationY = 0;
    //     // }
    //     // if (this.main.basketballInstance.basketball.position.y < this.main.wallsInstance.planes[2].position.y || // bottom 
    //         // this.main.basketballInstance.basketball.position.y > this.main.wallsInstance.planes[3].position.y) { // top
    //         // this.main.basketballInstance.basketballYIncrement *= -1;
    //         // this.rotationX = 0;
    //         // this.rotationY = 0;
    //     // }
    //     // if (this.main.basketballInstance.basketball.position.z < this.main.wallsInstance.planes[4].position.z || // back
    //         // this.main.basketballInstance.basketball.position.z > this.main.wallsInstance.planes[5].position.z) { // front
    //         // this.main.basketballInstance.basketballZIncrement *= -1;
    //         // this.rotationX = 0;
    //         // this.rotationY = 0;
    //     // }
    // }

    // private checkIfBallHitsTheShield(): void {
    //     // if (this.main.shieldInstance.shieldBallColisionDetector(
    //         // this.main.basketballInstance.basketball.position.x,
    //         // this.main.basketballInstance.basketball.position.y,
    //         // this.main.basketballInstance.basketball.position.z
    //     // )) {
    //         this.ballOnShield = true;
    //         // this.main.basketballInstance.basketballXIncrement *= 0;
    //         // this.main.basketballInstance.basketballYIncrement *= 0;
    //         // this.main.basketballInstance.basketballZIncrement *= 0;
    //         this.rotationX = 0;
    //         this.rotationY = 0;
    //     // }
    // }

    // private ballStuckOnShield(): void {
    //     if (this.ballOnShield) {
    //         // this.main.basketballInstance.basketball.position.set(
    //             // this.main.shieldInstance.plane.position.x,
    //             // this.main.shieldInstance.plane.position.y,
    //             // this.main.shieldInstance.plane.position.z,
    //         // );
    //     }
    // }

    // public calculateTrajectory(): void {
    //     this.ballStuckOnShield();
    //     this.trackShieldLastPositions();
    //     this.calculateShieldDirections();
    //     this.decrementRotations();
    //     this.incrementPositions();
    //     this.changeRotations();

    //     this.checkIfBallHitsAWall();
    //     this.checkIfBallHitsTheShield();
    // }

    // public init(): void {
    //     this.registerEventListeners();
    // }
}

export default BallTrajectory;