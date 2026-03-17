import React from 'react'
import './TitleCards.css';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  const options = {
    method: 'GET', // HTTP method to be used
    headers: {
      accept: 'application/json', // Specifies the expected format of the response
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWU0MTFlZGJhM2YwOWU0ZGM5Y2ZlYzgwNTQwOWE3NiIsIm5iZiI6MTc0MDY1OTc4NC4yNzgsInN1YiI6IjY3YzA1YzQ4ODM0MDU4ZjE2YWM4ZGRhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TWxfhXAn9h7lOu5joYok83GLMByTe2vYuuSw2IYXwH8' // Authorization token for accessing the API
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options) // Fetches data from the TMDB API based on the category
      .then(res => res.json()) // Converts the response to JSON format
      .then(res => setApiData(res.results)) // Updates the state with the fetched data
      .catch(err => console.error(err)); // Logs any errors that occur during the fetch operation

    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener('wheel', handleWheel); // Removes the event listener when the component unmounts
      }
    };

  }, [category])


  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix:"}</h2>
      <div className="card-list" ref={cardsRef} >{apiData.map((card, index) => {
        return <Link to={`/player/${card.id}`} className="card" key={index}>
          <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
          <p>{card.original_title}</p>
        </Link>
      })}</div>

    </div>
  )
}

export default TitleCards