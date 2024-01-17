import { useState, useEffect } from 'react'
import { Button } from "@mui/material"
import Modal from "react-modal"
import YouTube from 'react-youtube';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };  
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjkzZDcyZDczNzJiMzlkMjdhMTA1ZWIxOWRlZTc4ZiIsInN1YiI6IjY1YTI0ZDUxZjNiNDlhMDEyMmY2ZjU1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oPnZ3AOPgVjBjaHLSY80ShtbzRNehxN7WMn59s1p-c8",
    },
  };

const Trailer = ({location, movieId}) => {

    const [trailerView, setTrailerView ] = useState([])

    const showTrailer = ()=>{
        fetch(`https://api.themoviedb.org/3/movie/${movieId ? movieId : location?.state.movie.id}/videos?language=en-US`, options)
        .then(response => response.json())
        .then(json => setTrailerView(json[0]?.results))
        .catch(err => console.error(err));
    }

    useEffect(()=>{
        showTrailer()
    },[])

    let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Button variant="contained" sx={{color:"black", bgcolor:"white", fontWeight: "bold"}} onClick={openModal}>Play Trailer</Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <YouTube videoId={trailerView?.key} />
      </Modal>
    </div>
  )
}

export default Trailer
