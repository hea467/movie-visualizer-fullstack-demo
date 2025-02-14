import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Card, Typography } from 'antd';

const { Title, Text } = Typography;

const Login = ({ setUser }) => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // ✅ Get the "from" page (where user came from)
    const fromPage = location.state?.from?.pathname || "/";

    const handleLogin = async (values) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', values, { withCredentials: true });
            setMessage(response.data.message);
            setUser(values.username);
            navigate(fromPage); // ✅ Redirect back to where user left off
        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: 400, padding: '20px', textAlign: 'center' }}>
                <Title level={2}>Login</Title>
                <Form layout="vertical" onFinish={handleLogin}>
                    <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please enter your username!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password!' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>Login</Button>
                    </Form.Item>
                </Form>
                {message && <Text type="danger">{message}</Text>}
                <Text>Don't have an account? </Text>
                <Button type="link" onClick={() => navigate('/register')}>Register</Button>
            </Card>
        </div>
    );
};

export default Login;
