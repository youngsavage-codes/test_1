// MovieCard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
        const data = await response.json();
        setShows(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='movie_container'>
      {loading ? ( // Display loader when movies are loading
        <p>Loading...</p>
      ) : (
        shows.map((show, index) => (
          <Link to={`/${show.show.id}`} key={index} className="movie-card">
            {show.show.image && show.show.image.medium && (
              <img src={show.show.image.medium} alt={show.show.name} className='image' />
            )}

            <div className="movie-card-content">
              <h2 className="movie-card-title">{show.show.name}</h2>
                <p className="single-movie-genres">
                    Genres: {show.show.genres.map((genre, index) => (
                    <span key={index} className="single-movie-genre">
                        {genre}
                    </span>
                    ))}
                </p>
              <p className="movie-card-release-date">Premiered on: {formatDate(show.show.premiered)}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default MovieCard;
