import { Fragment, useEffect } from "react";
import backgroundImage from "../assets/bg.jpg";
import Congrats from "./Congrats";

const App = () => {
    useEffect(() => {
        document.body.style.backgroundImage = `url(${backgroundImage})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundPosition = "center";
    }, []);

    return (
        <>
            <Congrats 
            correctAnswer={7}
            totalAnswer={10}/>
        </>
    )
}

export default App;