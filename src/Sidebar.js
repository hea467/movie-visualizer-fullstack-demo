import React from 'react';
import { Layout, Menu } from 'antd';
import { BarChartOutlined, PieChartOutlined, TableOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
    return (
        <Sider style={{ height: '100vh', position: 'fixed', left: 0 }}>
            <div className="logo" style={{ color: 'white', textAlign: 'center', padding: '20px', fontSize: '18px' }}>
                🎬 Movie Dashboard
            </div>
            <Menu theme="dark" mode="vertical" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<TableOutlined />}>
                    <Link to="/">Movie List</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<PieChartOutlined />}>
                    <Link to="/pie-chart">Movies by Year (Pie Chart)</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<BarChartOutlined />}>
                    <Link to="/movie-chart">Top Directors (Bar Chart)</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
