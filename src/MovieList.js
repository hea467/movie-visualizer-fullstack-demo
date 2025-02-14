import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd'; // Import Ant Design Table

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/movies')
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

    const filteredMovies = movies.filter(movie =>
        movie.title_year.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.directors.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Ant Design table
    const columns = [
        { title: 'Title & Year', dataIndex: 'title_year', key: 'title_year' },
        { title: 'Directors', dataIndex: 'directors', key: 'directors' },
        { title: 'Genre', dataIndex: 'genre', key: 'genre' },
        { title: 'Production Company', dataIndex: 'production_company', key: 'production_company' }
    ];

    if (loading) return <p>Loading movies...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ margin: '20px', padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>🎬 AFI Top 100 Movies</h1>
            <input
                type="text"
                placeholder="Search by title, director, or genre..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
            />
            <Table
                columns={columns}
                dataSource={filteredMovies}
                rowKey="title_year"
                pagination={{ pageSize: 10 }} // Paginate results
            />
        </div>
    );
};

export default MovieList;
