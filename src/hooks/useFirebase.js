import { useEffect, useState } from "react";
import firebaseInit from "../Pages/Login/Firebase/firebase.init"
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword,GoogleAuthProvider ,signInWithPopup, updateProfile, getIdToken  } from "firebase/auth";

firebaseInit();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();


    const registerUser = (name, email, password, history) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: name
                })
                .then(() => {
                    //user profile created
                })
                .catch((error) => {
                    setError(error.message);
                  });
                const user = userCredential.user;
                setUser(user);
                saveUser(email, name, 'POST')
                setError('');
                history.replace('/')
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    }

    const logIn = (email, password, location, history) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                setError('');
                const destination = location.state?.from || '/';
                history.replace(destination);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    }

    const googleSignIn = (location, history) => {
        setLoading(true);
        signInWithPopup(auth, googleProvider)
        .then((result) => {    
            const user = result.user;
            setUser(user);
            saveUser(user.email, user.displayName, 'PUT');
            setError('');
            const destination = location.state?.from || '/';
            history.replace(destination);
        })
        .catch((error) => {
            setError(error.message)
        })
        .finally(() => {
            setLoading(false);
        })
    }

    const logOut = () => {
        setLoading(true);
        signOut(auth)
            .then(() => {
                setUser({})
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        const ussubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getIdToken(user)
                    .then(idToken => {
                    setToken(idToken);
                })
            } else {
              setUser({})
            }
            setLoading(false);
        });
        return () => ussubscribe;
    }, [auth])

    
    useEffect(() => {
        fetch(`https://pure-journey-93406.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setAdmin(data.admin)
            })
    },[user.email])
    
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('https://pure-journey-93406.herokuapp.com/users', {
            method: method,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => data);
    }

    return {
        user,
        admin,
        token,
        error,
        loading,
        registerUser,
        googleSignIn,
        logIn,
        logOut
    }
}
export default useFirebase;