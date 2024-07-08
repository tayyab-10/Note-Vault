import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import bgImage from "../Assets/bg1.jpg";
import { GoogleOutlined } from '@ant-design/icons';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      
      if (response.ok) {
        // Save the auth token and redirect
        localStorage.setItem('token', json.token);
        navigate("/home");
      
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onFinish = () => {
    handleLogin();
  };

  return (
    <div style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover',
    backgroundPosition: 'center',}}className="d-flex align-items-center justify-content-center min-vh-100 bg-danger">
      <div className="card shadow-lg p-4 mt-4" style={{ maxWidth: '23rem' }}>
      <h5 className="text-center mb-4 fw-normal">Login</h5>
        <Button type="default" icon={<GoogleOutlined />} className="mb-3 w-100">
          Sign up with Google
        </Button>
        <div className="separator text-center" style={{ display: "flex", alignItems: "center", justifyContent: "center",fontSize: "13px", color: "rgba(102, 102, 102, 1)"}}>
  <hr className="left-line" style={{ flex: 1 }}/>
  <span style={{ margin: "2px 8px" }}>Or</span>
  <hr className="right-line" style={{ flex: 1 }}/>
</div>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              name="email"
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn btn-primary w-100 text-center">
              Log in
            </Button>
            <div className="mt-3 text-center">
              Not a member ?<a href="/signup">register now!</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
