import { createRef, useEffect, useState } from 'react';
import './LandingPage.css';
import Boilerplate from '../../game/Boilerplate';


const LandingPage = () => {
    // Boilerplate 
    const [boilerplate, setBoilerplate] = useState<Boilerplate>();
    // creating a reference for the canvas JSX element, so we can summon it from within react.
    // HTMLCanvasElement is the type of the variable we are creating (required by typescript)
    const canvasRef = createRef<HTMLCanvasElement>();

    useEffect(() => {
        if (canvasRef && canvasRef.current){
            setBoilerplate(new Boilerplate(canvasRef.current));
        }
    }, []);


    return (
        <canvas ref={canvasRef}></canvas>
    );
};

export default LandingPage;