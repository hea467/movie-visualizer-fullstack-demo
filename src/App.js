// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import MovieList from './MovieList';
import MovieChart from './MovieChart';
import Sidebar from './Sidebar';
import MovieYearPieChart from './MovieYearPieChart';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout style={{ marginLeft: 200, padding: '20px' }}> {/* Adds spacing for sidebar */}
          <Content>
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route path="/pie-chart" element={<MovieYearPieChart />} />
              <Route path="/movie-chart" element={<MovieChart />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;