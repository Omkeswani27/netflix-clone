import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDH6P_uU60ld60VMSV2QwiylgAo8sWrI7M",
  authDomain: "netflix-clone-80809.firebaseapp.com",
  projectId: "netflix-clone-80809",
  storageBucket: "netflix-clone-80809.firebasestorage.app",
  messagingSenderId: "567635036091",
  appId: "1:567635036091:web:1ab76dfed35956899ee69e"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db=getFirestore(app)

const signup=async(name,email,password)=>{
    try{    
        const res= await createUserWithEmailAndPassword(auth,email,password)
        const user=res.user
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        })
    }
    catch(error){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password)
    }
    catch(error){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout=()=>{
    signOut(auth)
}

export {auth,db,login,signup,logout}