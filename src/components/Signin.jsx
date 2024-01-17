import { signInWithPopup } from "firebase/auth";
import { auth, googleAuth } from "../firebase/setup";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import netflix from "../images/netflix.png"

const Signin = () => {

    const navigate = useNavigate()

  const googleSignInHandler = async () => {

    try {
      await signInWithPopup(auth, googleAuth);
      setTimeout(()=>{
        auth.currentUser?.emailVerified && navigate("/")
      }, 2000)
    toast.success("Successfully signed in")

    } catch (error) {
      console.error(error);
    }
  };

  console.log(auth?.currentUser)

  return (
    <div style={{ backgroundColor: "#181818", height: "100vh", padding:"20px" }}>
      <ToastContainer autoClose={2000}/>
        <img style={{width:"100px", height:"100px"}} src={netflix} alt="netflix"/>
      <div style={{position:"fixed", left:"45%", top:"35%"}}>
        <Button onClick={googleSignInHandler} variant="contained" color="error">
          Sign in with Google
        </Button>
        <br />
        <div>
        <h2 style={{color:"white"}}>Let's start <br /> to explore movies <br /> from here.</h2>
        </div>
      </div>
    </div>
  );
};

export default Signin;
