import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase.js'

export const Auth = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    console.log('Current User: ', auth?.currentUser?.email)

    const signUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log(`New User created with ${email} and ${password}`)
            // setEmail('');
            // setPassword('')            
        } catch (error) {
            console.log(error)
        }
    }
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);            
            console.log('Google User : ', auth?.currentUser?.photoURL)
        } catch (error) {
            console.log(error)
        }
    }
    const logout = async () => {
        try {
            await signOut(auth);
            console.log('You are logged out')
            console.log('Current User: ', auth?.currentUser?.email)
        } catch (error) {
            console.log(error)
        }
    }



  return (
    <div>
        <input type="text" placeholder='Email ... '
            onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder='Password ... ' 
            onChange={(e) => setPassword(e.target.value)}/>

        <button onClick={signUp}> Sign Up</button>    
        <button onClick={signInWithGoogle}> Sign In With Google</button>
        <button onClick={logout}> Logout </button>
    </div>
  )
}
