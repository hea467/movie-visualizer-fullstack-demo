import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MovieChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/movies')
            .then(response => {
                // Count the number of movies per genre
                const genreCounts = {};
                response.data.forEach(movie => {
                    const genres = movie.genre.split(', '); // Split multiple genres
                    genres.forEach(genre => {
                        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
                    });
                });

                // Convert to an array format for Recharts
                const formattedData = Object.keys(genreCounts).map(genre => ({
                    genre,
                    count: genreCounts[genre]
                }));

                setChartData(formattedData);
            })
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>🎭 Movies by Genre</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ResponsiveContainer width="80%" height={400}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="genre" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MovieChart;
