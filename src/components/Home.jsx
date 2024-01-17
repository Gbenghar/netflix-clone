import { useState, useEffect } from "react";
import { Box, Card, CardMedia, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { database } from "../firebase/setup";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjkzZDcyZDczNzJiMzlkMjdhMTA1ZWIxOWRlZTc4ZiIsInN1YiI6IjY1YTI0ZDUxZjNiNDlhMDEyMmY2ZjU1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oPnZ3AOPgVjBjaHLSY80ShtbzRNehxN7WMn59s1p-c8",
  },
};

const Home = () => {
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

  const addMovie = async (movie) => {
    const movieRef = doc(database, "Movies", `${movie.id}`)
    try {
      await setDoc(movieRef,{
        movieNAme: movie.original_title
      })
    } catch (error) {
      console.error(error)
    }
  }
  

  return (
    <div style={{backgroundColor:"#181818"}}>
      <Grid container spacing={2} style={{paddingTop: "20px", paddingRight:"20px", paddingLeft:"20px"}}>
        {movies.map((movie) => {
          {addMovie(movie)}
          return (
            <Grid item xs={3}>
              <Box>
                <Link to="/moviedetail" state={{movie:movie}}>
                <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                    ></CardMedia>       
                </Card>
                </Link>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Home;
