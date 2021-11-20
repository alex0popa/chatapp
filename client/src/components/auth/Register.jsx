import React, { useState } from 'react';

import axios from 'axios';

import { Alert, Button, Card, Form, Input, Layout, Row, Spin } from 'antd';
import { useAppContext } from '../../context/AppContext';

export const Register = () => {
  const {
    isLoading,
    getLoggedIn,
    setIsLoading,
    setIsLogInForm
  } = useAppContext();
  const [form] = Form.useForm();
  const [error, setError] = useState('');

  const onFinish = values => {
    setIsLoading();
    delete values.confirm;
    setError('');
    axios
      .post('http://localhost:5000/auth/register', values)
      .then(() => getLoggedIn())
      .finally(() => setIsLoading());
   
  };

  // const buttonStyle = {textAlign: 'right'};
  const pageStyle = {
    height: '100vh',
    display: 'grid',
    placeItems: 'center'
  };

  return (
    <Layout style={pageStyle}>
      <Card
        bodyStyle={{ border: '1px solid #7FFF00' }}
        // cover={
        //   // <div style={{ overflow: "hidden", height: "" }}>
        //     <img
        //       alt="example"
        //       style={{ height: "100%", width: '100%' }}
        //       src="https://s3.amazonaws.com/thumbnails.venngage.com/template/a8897941-0545-4eaa-a427-76503a01b7e7.png"
        //     />
        //   // </div>
        // }  
      >
        {error &&
          <Alert description={(error)} type="error" showIcon closable />}
        <Row>
          <h1>{('Register your account')}</h1>
        </Row>
        <Row>
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
          >
            {/* user name input */}
            <Form.Item label={'Username'} name="userName"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* TODO ad them on next version */}
            {/* <Form.Item label={('First name')} name="firstName"
              rules={[
                {
                  required: true,
                  message: ('Please input your first name!'),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label={('Last name')} name="lastName"
              rules={[
                {
                  required: true,
                  message: ('Please input your last name!'),
                },
              ]}
            >
              <Input />
            </Form.Item> */}
            {/* password input */}
            <Form.Item
              name="password"
              label={'Password'}
              rules={[
                {
                  min: 4,
                  required: true,
                  message: 'Password must be at least 10 characters!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            {/* confirm password input */}
            <Form.Item
              name="passwordVerify"
              label={'Confirm password'}
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      ('The two passwords that you entered do not match!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            {/* email input */}
            <Form.Item
              name="email"
              label={'email'}
              rules={[
                {
                  type: 'email',
                  message: 'Invalid email address!',
                },
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            {isLoading ? (
              <Spin spinning={isLoading} style={{ marginLeft: '50%' }} />
            ) : (
              <>
                <div style={{
                  justifyContent: 'space-around',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Button id="register-button" type="primary" htmlType="submit">
                    {'Register'}
                  </Button>
                </div>
                <div style={{
                  marginTop: '15px',
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {'If you have an acount'}
                  <a
                    href="#"
                    onClick={() => setIsLogInForm()}
                    style={{ marginLeft: '4px' }}
                  >
                    {' sign in'}
                  </a>
                </div>
              </>
            )}
          </Form>
        </Row>
      </Card>
    </Layout>
  );
};
