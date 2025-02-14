import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import MovieList from './MovieList';
import MovieChart from './MovieChart';
import MovieYearPieChart from './MovieYearPieChart';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute'; // ✅ Import ProtectedRoute

const { Content } = Layout;

function App() {
  const [user, setUser] = useState(null); // ✅ Track logged-in user

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar user={user} setUser={setUser} />
        <Layout style={{ marginLeft: 200, padding: '20px' }}>
          <Content>
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register />} />

              <Route path="/pie-chart" element={<ProtectedRoute user={user}><MovieYearPieChart /></ProtectedRoute>} />
              <Route path="/movie-chart" element={<ProtectedRoute user={user}><MovieChart /></ProtectedRoute>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
