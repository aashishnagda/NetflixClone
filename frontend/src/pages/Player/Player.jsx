import React from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const Player = () => {
  const { id } = useParams();  //useParams is used to extract dynamic parameters from the URL.
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "", key: "", published_at: "",
    type: ""
  });


  //We are fetching data.
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWU0MTFlZGJhM2YwOWU0ZGM5Y2ZlYzgwNTQwOWE3NiIsIm5iZiI6MTc0MDY1OTc4NC4yNzgsInN1YiI6IjY3YzA1YzQ4ODM0MDU4ZjE2YWM4ZGRhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TWxfhXAn9h7lOu5joYok83GLMByTe2vYuuSw2IYXwH8'
    }
  };







  useEffect(() => {


    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((res) => res.json()) //Convert JSON response → JS object
      .then((res) => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0]);  // ✅ Get the first available video
        } else {
          setApiData({ name: "No Trailer Available", key: "", published_at: "", type: "" }); // ✅ Handle missing video
        }
      })
      .catch((err) => console.error("Error fetching video:", err));
  }, [id]);



  return (

    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={() => { navigate(-1) }} />

      {/* iframe is used to embed the video */}
      {/* <iframe width='90%'
       height='90%'
      src={`https://www.youtube.com/embed/${apiData.key}`} 
      title='trailer' 
      frameBorder="0" 
      allowFullScreen>
     </iframe> */}

      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>

      <div className='player-info'>
        <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : "Unknown Date"}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}



export default Player;


// This component retrieves a movie ID from the URL using useParams,
// then fetches trailer data from the TMDB API inside useEffect.
// The API call runs whenever the movie ID changes.
// I store the trailer details in state using useState, and then dynamically embed the YouTube video using the returned video key.
// I also handle cases where no trailer is available and provide basic error handling.
// The back button uses useNavigate to navigate through browser history.