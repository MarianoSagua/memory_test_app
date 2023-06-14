import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../Firebase';

export const useUserLoged = () => {
    const [user] = useAuthState(auth);
    const [userLoged, setUserLoged] = useState({});

    useEffect(()=>{
        const usersCollection = collection(db, "users");

        if(user !== null){
            getDocs(usersCollection)
                .then((response)=>{
                    const docsUsers = response.docs.map(doc => ({...doc.data(), id: doc.id}));
                    const userData = docsUsers.find((data) => data.uid === user.uid);
                    setUserLoged(userData);
                    window.scrollTo(0, 0);
                })
                .catch((error)=>{
                    toast(error, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                })
        } 
    }, [user]);

  return userLoged;
}

