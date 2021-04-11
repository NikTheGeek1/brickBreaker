import { createRef, useEffect, useState } from 'react';
import './LandingPage.css';
import Boilerplate from '../../game/Main';


const LandingPage = () => {
    const [boilerplate, setBoilerplate] = useState<Boilerplate>();
    const [controlsLocked, setControlsLocked] = useState<boolean | undefined>(false);
    // creating a reference for the canvas JSX element, so we can summon it from within react.
    // HTMLCanvasElement is the type of the variable we are creating (required by typescript)
    const canvasRef = createRef<HTMLCanvasElement>();

    useEffect(() => {
        if (canvasRef && canvasRef.current) {
            const bb: Boilerplate = new Boilerplate(canvasRef.current);
            setBoilerplate(bb);
            bb.init();
            bb.controlsInstance.setIsLockedSetter(setControlsLocked);
        }
    }, []);

    const onStartGameHandler = () => {
        try {
            boilerplate?.controlsInstance.lockControls();
            setControlsLocked(true);
        } catch (error) {
            console.log(error, 'LandingPage.tsx', 'line: ', '26');
        }
    };
    console.log(controlsLocked, 'LandingPage.tsx', 'line: ', '25');

    return (
        <>
            {
                controlsLocked ? null :   
                <div className="start-game-div" onClick={onStartGameHandler}>
                    START
                </div>

            }
            <canvas ref={canvasRef}></canvas>
        </>
    );
};

export default LandingPage;