import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';

// Define color palette for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6666', '#33CC99'];

const MovieYearPieChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/movies')
            .then(response => {
                const yearCounts = {};

                response.data.forEach(movie => {
                    // Extract year using regex from "Title (Year)"
                    const match = movie.title_year.match(/\((\d{4})\)$/);
                    if (match) {
                        const year = match[1]; // Extracted year
                        yearCounts[year] = (yearCounts[year] || 0) + 1;
                    }
                });

                // Convert data into array format for Recharts
                const formattedData = Object.keys(yearCounts).map(year => ({
                    name: year, // Pie chart needs a "name" field
                    value: yearCounts[year]
                })).sort((a, b) => a.name - b.name); // Sort by year

                setChartData(formattedData);
            })
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Movie Distribution by Year</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ResponsiveContainer width="60%" height={500}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                            label
                        >
                            {chartData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend
                            layout="horizontal"
                            align="center"
                            verticalAlign="bottom"
                            wrapperStyle={{ marginTop: '20px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MovieYearPieChart;
