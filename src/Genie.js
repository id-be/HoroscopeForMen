import GeniePic from "./Images/TheGreatMeatball.png";

export default function Genie( {spindir} ) {
    return(
        <img src={GeniePic} className={spindir} alt="logo"/>
    );
}