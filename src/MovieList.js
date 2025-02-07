import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/movies') // Flask API URL
            .then(response => {
                setMovies(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
                setError('Failed to fetch movies.');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading movies...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>AFI Top 100 Movies</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Title & Year</th>
                        <th>Directors</th>
                        <th>Genre</th>
                        <th>Production Company</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie, index) => (
                        <tr key={index}>
                            <td>{movie.title_year}</td>
                            <td>{movie.directors}</td>
                            <td>{movie.genre}</td>
                            <td>{movie.production_company}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MovieList;
