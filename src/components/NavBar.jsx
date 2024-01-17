import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/setup";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import netflix from "../images/netflix.png";
import Trailer from "./Trailer";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjkzZDcyZDczNzJiMzlkMjdhMTA1ZWIxOWRlZTc4ZiIsInN1YiI6IjY1YTI0ZDUxZjNiNDlhMDEyMmY2ZjU1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oPnZ3AOPgVjBjaHLSY80ShtbzRNehxN7WMn59s1p-c8",
  },
};

const Navbar = () => {
  const navigate = useNavigate();
  
  const signInClickHandler = () => {
    navigate("/signin");
  };

  const logOutClickHandler = async () => {
    try {
        await signOut(auth)
        toast.success("Successfully logged out", {
          theme:"dark"
      })  
    } catch (error) {
        console.error(error)
    }
  }

  const [movies, setMovies] = useState([]);

  const getMovie = () => {
    try {
      fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
        options
      )
        .then((res) => res.json())
        .then((json) => setMovies(json.results));
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getMovie();
  }, []);

  console.log(auth.currentUser?.email)

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/original${movies[5]?.poster_path})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "500px",
        width: "100%",
      }}
    >
      <ToastContainer autoClose={2000}/>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <img
          src={netflix}
          alt="netflix"
          style={{ width: "90px", height: "90px" }}
        />
        <div>
          {auth.currentUser?.emailVerified ? (
            <Button
              onClick={logOutClickHandler}
              variant="contained"
              color="error"
              sx={{ height: "40px", marginLeft: "10px" }}
            >
              Log Out
            </Button>
          ) : (
            <Button
              onClick={signInClickHandler}
              color="error"
              variant="contained"
              sx={{ height: "40px" }}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
      <div style={{ padding: "20px" }}>
        <h1
          style={{ color: "#F1F1F1", fontSize: "70px", fontFamily: "initial" }}
        >
          {movies[5]?.original_title}
        </h1>
        <h3 style={{ color: "white" }}>{movies[5]?.overview}</h3>
        {/* <Button
          variant="contained"
          sx={{ color: "black", bgcolor: "white", fontWeight: "bold" }}
        >
          Play Trailer
        </Button> */}
        <Trailer movieId={movies[5]?.id}/>
      </div>
    </div>
  );
};

export default Navbar;
