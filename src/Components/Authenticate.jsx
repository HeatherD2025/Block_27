import { useState } from "react";


export default function Authenticate ({token}) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);

    async function handleClick() {
        try {
            const response= await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: "GET",
                headers: { "Content-Type": "application/json", 
                Authorization: `Bearer ${token}`
                 },

            }); 
        
            const result=await response.json();
            if (response.ok === false) {
                throw new Error(result.message) 
            }   
                setSuccessMessage(result.message)
            } catch(error) {
                setError(error.message)
            }      
  
    }
    return (
      <div className="formLayout">
              <h2>Authenticate</h2>
              {successMessage && <p>{successMessage}</p>}
              {error && <p>an error occured: {error}</p>}
              <button onClick={handleClick}>Authenticate Token!</button>
            
      </div>
    );
  }