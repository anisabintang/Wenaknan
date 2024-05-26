import * as React from "react"; 
import Image from 'next/image';

function GetStartedButton() { 
   const handleClick = () => { 
      alert("Button clicked!"); 
   }; 
   return ( 
      <button className="box-border relative shrink-0 px-6 py-4 mt-14 mr-auto ml-5 text-center bg-red-800 rounded appearance-none cursor-pointer text-[white]"
              onClick={handleClick}> 
              Get Started 
      </button> 
   ); 
}

function App() { 
   return ( 
      <main> 
         <section> 
            <GetStartedButton /> 
         </section> 
      </main> 
   ); 
} 

export default App;