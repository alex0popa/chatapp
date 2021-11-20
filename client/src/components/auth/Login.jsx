import axios from 'axios';

import { Alert, Button, Card, Form, Input, Layout, Space,  Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAppContext } from '../../context/AppContext';
import { useState } from 'react';

export const Login = () => {
  const {
    isLoading,
    getLoggedIn,
    setIsLoading,
    setIsLogInForm
  } = useAppContext();
  const [loading, setLoading] = useState(false);
  // TODO const [alertType, setAlertType] = useState('success');

  const onFinish = values => {
    setIsLoading();
    axios
      .post('http://localhost:5000/auth/', values)
      .finally(() => {
        getLoggedIn();
        setIsLoading();
      });
  };

  const pageStyle = {
    display: 'grid',
    placeItems: 'center',
    height: '100vh'
  };

  return (
    <Layout style={pageStyle}>
      <Card  bodyStyle={{ border: '1px solid #7FFF00' }}>
        {/* {alertDescription &&
          <Alert
            description={'' && 'description line 39'}
            type={alertType}
            showIcon
            closable
          />
        } */}
        <Space> </Space>
        <Form
          name="login"
          className="login-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
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
            <Input prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={('Email')} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true,
              message: ('Please input your password!') }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={('Password')}
            />
          </Form.Item>
          <Space style={{ margin: 'auto' }}>
            {isLoading ? (
              <Spin spinning={isLoading} style={{ marginLeft: '50%' }} />
            ) : (
              <>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  id="login-button"
                >
                  {('Log in')}
                </Button>
                {('or')}
                {/* button */}
                <a href="#" onClick={() => setIsLogInForm()}>
                  {'register now!'}
                </a>
              </>
            )}
          </Space>
        </Form>
      </Card>
    </Layout>
  );
};
