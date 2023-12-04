import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    
    const googleLogin = () => {
        const googleProvider = new GoogleAuthProvider();
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const register = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }

    const update = (name, photo) => {
        const info = {};
        if(name) info.displayName = name;
        if(photo) info.photoURL = photo;
        
        // return updateProfile(auth.currentUser, {
        //     displayName: name,
        //     photoURL: photo
        //   });

        return updateProfile(auth.currentUser, info);
    }

    useEffect( () => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser) {
                axiosPublic.post("/jwt", {email: currentUser.email})
                    .then(res => {
                        console.log(res.data);
                        if(res.data.token) {
                            localStorage.setItem("access-token", res.data.token);
                            setLoading(false);
                        }
                    })
            }
            else setLoading(false);
        })

        return () => unSubscribe();
    } , [])

    const authInfo = {
        login,
        register,
        logout,
        user,
        loading,
        update,
        googleLogin
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;