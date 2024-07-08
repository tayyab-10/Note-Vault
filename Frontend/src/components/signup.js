import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Checkbox } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import bgImage from "../Assets/bg1.jpg";
import { GoogleOutlined } from '@ant-design/icons';

const Signup = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const { name, password, email } = credentials;
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, password, email })
      });

      const data = await response.json();
 

      if (response.ok) {
       
        localStorage.setItem('token', data.token);
        setUser({ name });
        navigate("/home");
      } else {
        console.error("Registration failed:", data);
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error during registration. Please try again later.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onFinish = () => {
    handleSignUp();
  };

  const onAgreeChange = (e) => {
    setAgree(e.target.checked);
  };

  return (
    <div 
      style={{ 
        backgroundImage: `url(${bgImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginTop:"3rem"
      }} 
      className="d-flex align-items-center justify-content-center min-vh-100 bg-danger "
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: '23rem' }}>
        <h5 className="text-center mb-4 fw-normal">Create a new Notevault Account</h5>
        <Button type="default" icon={<GoogleOutlined />} className="mb-3 w-100">
          Sign up with Google
        </Button>
        <div className="separator text-center" style={{ display: "flex", alignItems: "center", justifyContent: "center",fontSize: "13px", color: "rgba(102, 102, 102, 1)"}}>
  <hr className="left-line" style={{ flex: 1 }}/>
  <span style={{ margin: "2px 8px" }}>Or</span>
  <hr className="right-line" style={{ flex: 1 }}/>
</div>

        <Form
          name="signup_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your Name!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
              name="name"
              onChange={onChange}
            />
          </Form.Item>
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
            <Checkbox onChange={onAgreeChange} className="mb-1" style={{ fontSize: "13px", color: "rgba(102, 102, 102, 1)" }}>
              I agree to the terms and conditions
            </Checkbox>
            <Checkbox style={{ fontSize: "13px", color: "rgba(102, 102, 102, 1)" }} >
              Send me Tips and News.
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="btn btn-primary w-100"
              disabled={!agree}
            >
              Sign up
            </Button>
          </Form.Item>
          <div className="text-center mt-3">
            <h7 className='fw-normal'>Already a member ?</h7>
            <Link to="/login">  Login here!</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
