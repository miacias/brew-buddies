import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
  } from 'antd';
  import { useState } from 'react';
  const { Option } = Select;

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const Signup = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };

    return (
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: '86',
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item
          name="nickname"
          label="Nickname"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          name="Image"
          label="Image Link"
          tooltip="Please give us a link for an image of you!"
          rules={[
            {
              required: false,
              message: "Please give us a link for an image of you!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="City"
          label="City"
          rules={[
            {
              required: true,
              message: "Please put the city you in which you live.",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="State"
          label="State"
          rules={[
            {
              required: true,
              message: "Please put the state in which you live.",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          name="Intro"
          label="Intro"
          rules={[
            {
              required: false,
              message: 'Please tell us a little about yourself!',
            },
          ]}
        >
          <Input.TextArea showCount maxLength={250} />
        </Form.Item>
  
        <Form.Item
          name="Pronouns"
          label="Pronouns"
          rules={[
            {
              required: true,
              message: 'Please select one',
            },
          ]}
        >
          <Select placeholder="Would you like to share your pronouns?">
            <Option value="he/him">He/Him</Option>
            <Option value="she/her">She/Her</Option>
            <Option value="they/them">They/Them</Option>
            <Option value="other">Other</Option>
            <Option value="Prefer-not-to-say">Prefer not to say</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="Birthday"
          label="Enter your birthday"
          rules={[
            {
              required: true,
              message: "Please enter your birthdate as MM/DD/YYYY, you must be 21 years of age to use this site.",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  };
  export default Signup;