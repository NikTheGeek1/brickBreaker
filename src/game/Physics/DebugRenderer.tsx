import CannonDebugRenderer from '../../utils/cannonDebugRenderer';
import PhysicsMain from './PhysicsMain';

class DebugRenderer {

    private cannonDebugRenderer: CannonDebugRenderer;
    private physicsMain: PhysicsMain;

    constructor(physicsMain: PhysicsMain) {
        this.physicsMain = physicsMain;
        this.cannonDebugRenderer = new CannonDebugRenderer(this.physicsMain.main.scene, this.physicsMain.world);
    }

    public updateDebugger():void {
        this.cannonDebugRenderer.update();
    }

}


export default DebugRenderer;
