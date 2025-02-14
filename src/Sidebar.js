import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = ({ user, setUser }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch("http://127.0.0.1:5000/logout", { method: "POST", credentials: "include" });
            setUser(null); // Clear user state
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <Sider width={200} style={{ background: '#fff', padding: '20px' }}>
            <Menu mode="vertical">
                <Menu.Item key="1">
                    <Link to="/">🎬 Movie List</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/pie-chart">📊 Pie Chart</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/movie-chart">📈 Genre Bar Chart</Link>
                </Menu.Item>
            </Menu>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                {user ? (
                    <>
                        <p>Welcome, {user}!</p>
                        <Button type="primary" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <Button type="default">
                        <Link to="/login">Login</Link>
                    </Button>
                )}
            </div>
        </Sider>
    );
};

export default Sidebar;
