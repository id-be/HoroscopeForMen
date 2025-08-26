import GeniePic from "./Images/TheGreatMeatball.png";

export default function Genie( {spindir} ) {
    const className = "App-logo Unselectable " + spindir;
    return(
        <img src={GeniePic} className={className} alt="logo"/>
    );
}