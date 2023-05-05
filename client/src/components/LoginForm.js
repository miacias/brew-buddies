import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Alert, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';


const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser, { error, data }] = useMutation(LOGIN);
  const [form] = Form.useForm();
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    try {
      const response = await loginUser({
        variables: {...userFormData}});

      if (!response) {
        throw new Error('something went wrong!');
      }
      Auth.login(response.data.login.token);
    } catch (err) {
      console.error(err);
      form.resetFields();
    }

    setUserFormData({
      email: '',
      password: ''
    });
  
  };
  
  return (
    <Form form={form} onFinish={handleFormSubmit}>
      {error && <Alert dismissible message="Error" description="Something went wrong with your login credentials!" type="error"
      closable onClose={() => setShowAlert(false)} show={showAlert} variant='danger'></Alert>} 
         
        
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} name="email" placeholder="Email" onChange={handleInputChange}
        value={userFormData.email} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
          value={userFormData.password}
        />
      </Form.Item>
      

      <Form.Item>
      
        <Button disabled={!(userFormData.email && userFormData.password)} type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="/signup">register now!</a>
      </Form.Item>
    </Form>
  );
};
export default Login;
// #components-form-demo-normal-login .login-form {
//   max-width: 300px;
// }
// #components-form-demo-normal-login .login-form-forgot {
//   float: right;
// }
// #components-form-demo-normal-login .ant-col-rtl .login-form-forgot {
//   float: left;
// }
// #components-form-demo-normal-login .login-form-button {
//   width: 100%;
// }