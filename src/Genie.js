import GeniePic from "./Images/TheGreatMeatball.png";
import {useState} from 'react';

export default function Genie( {spindir} ) {
    return(
        <img src={GeniePic} className={spindir} alt="logo"/>
    );
}

// export default function Animation() {
//   const [fade, setFade] = useState(false)
  
//   const triggerFade = () => {
//     setFade(prevState => {
//       return !prevState
//     })
//   }
  
//   return (
//     <div
//       onAnimationEnd={triggerFade}
//       className={fade ? 'fadedClass' : 'visibleClass'}
//     >
//       Watch me fade
//     </div>
//     <button onClick={triggerFade}>Click Me</button>
//   )
// }