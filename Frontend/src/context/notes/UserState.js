import React, { useState } from 'react'; 
import userContext from './userContext'; 

const UserState = (props) => { 

    const Host = "http://localhost:5000";
    const [user, setUser] = useState([]); // Initialize user state with empty array

    // Signup Api 
    const signUp = async (name, password, email) => {
        
        try {
            const response = await fetch(`${Host}/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, password, email }),
            });

            if (response.ok) {
                const newUser = await response.json();
                setUser([...user, newUser]); // Update user state with new user
                console.log(newUser); // Log the response
            } else {
                console.error('Failed to sign up:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error while signing up:', error);
        }
    };

    return (
        <userContext.Provider value={{ user, signUp }}>
          {props.children}
        </userContext.Provider>
    );
};

export default UserState; 
