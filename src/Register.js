import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography } from 'antd';

const { Title, Text } = Typography;

const Register = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (values) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/register', values);
            setMessage(response.data.message);
            navigate('/login'); // ✅ Redirect to login after successful registration
        } catch (error) {
            setMessage(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: 400, padding: '20px', textAlign: 'center' }}>
                <Title level={2}>Register</Title>
                <Form layout="vertical" onFinish={handleRegister}>
                    <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please enter a username!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter a password!' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>Register</Button>
                    </Form.Item>
                </Form>
                {message && <Text type="danger">{message}</Text>}
                <Text>Already have an account? </Text>
                <Button type="link" onClick={() => navigate('/login')}>Login</Button>
            </Card>
        </div>
    );
};

export default Register;
