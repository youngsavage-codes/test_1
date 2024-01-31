// SingleMovie.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleMovie = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await response.json();
        setShow(data);
      } catch (error) {
        console.error('Error fetching movie detail:', error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  return (
    <div className="single-movie-container">
      {show ? (
        <>
          <h2 className="single-movie-title">{show.name}</h2>
          <img src={show.image && show.image.original} alt={show.name} className="single-movie-image" />
          <p className="single-movie-genres">
            Genres: {show.genres.map((genre, index) => (
              <span key={index} className="single-movie-genre">
                {genre}
              </span>
            ))}
          </p>
          <p className="single-movie-release-date">Premiered on: {show.premiered}</p>
          <span>Rating: {show.rating.average}</span>
          <div className="single-movie-summary" dangerouslySetInnerHTML={{ __html: show.summary }} />
          {/* Add more details as needed */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleMovie;
