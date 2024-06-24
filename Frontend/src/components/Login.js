import React, { useState, useContext } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import userContext from '../context/notes/userContext';

const Login = () => {
  const { signUp } = useContext(userContext); 

  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState({ name: "", password: "", email: "" });

  const handleSignupClick = () => {
    setIsSignup(true);
  };

  const handleLoginClick = () => {
    setIsSignup(false);
  };

  const onFinish = (values) => {
    if (isSignup) {
      signUp(user.username, user.password, user.email);
    } else {
      // Handle login logic
      console.log('Logging in with:', values);
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-danger">
      <div className="card shadow-lg p-4" style={{ maxWidth: '20rem' }}>
        <div className="d-flex justify-content-between mb-4 mx-4">
          <Button
            type="primary"
            htmlType="button"
            className="btn w-50 mx-1"
            onClick={handleLoginClick}
            disabled={!isSignup}
          >
            Log in
          </Button>
          <Button
            type="primary"
            htmlType="button"
            className="btn w-50 mx-1"
            onClick={handleSignupClick}
            disabled={isSignup}
          >
            Signup
          </Button>
        </div>
        <Form
          name={isSignup ? "signup_form" : "normal_login"}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {isSignup && (
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
          )}
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              name="username"
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              name="password"
              onChange={onChange}
            />
          </Form.Item>

          {!isSignup && (
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
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn btn-primary w-100">
              {isSignup ? 'Sign up' : 'Log in'}
            </Button>
            {!isSignup && (
              <div className="mt-3 text-center">
                Or <a href="">register now!</a>
              </div>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
