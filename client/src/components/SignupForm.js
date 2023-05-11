import { AutoComplete, Button, Form, Input, Select } from "antd";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
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

  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  const handleSelectChange = (value) => {
    setUserFormData({
      ...userFormData,
      pronouns: value,
    });
  };

  const handleFormSubmit = async (event) => {
    try {
      console.log(userFormData);
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      if (!data) {
        throw new Error("something went wrong!");
      }

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
      form.resetFields();

    }

    setUserFormData({
      email: "",
      password: "",
      confirm: "",
      username: "",
      profilePic: "",
      postalCode: "",
      intro: "",
      pronouns: "",
      birthday: "",
    });
  };
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={handleFormSubmit}
      initialValues={{
        prefix: "86",
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
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input
          className="site-form-item-icon"
          name="email"
          placeholder="Email"
          onChange={handleInputChange}
          value={userFormData.email}
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          className="site-form-item-icon"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
          value={userFormData.password}
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          className="site-form-item-icon"
          type="password"
          placeholder="Confirm Password"
          name="confirm"
          onChange={handleInputChange}
          value={userFormData.confirm}
        />
      </Form.Item>

      <Form.Item
        name="username"
        label="Username"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your username!",
            whitespace: true,
          },
        ]}
      >
        <Input
          placeholder="Username"
          name="username"
          onChange={handleInputChange}
          value={userFormData.username}
        />
      </Form.Item>

      <Form.Item
        name="profilePic"
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
        <Input
          placeholder="Image Link"
          name="profilePic"
          onChange={handleInputChange}
          value={userFormData.profilePic}
        />
      </Form.Item>
      <Form.Item
        name="postalCode"
        label="postalCode"
        rules={[
          {
            required: true,
            message: "Please put the postal code for where you live.",
            whitespace: true,
          },
        ]}
      >
        <Input
          placeholder="Postal Code"
          name="postalCode"
          onChange={handleInputChange}
          value={userFormData.postalCode}
        />
      </Form.Item>

      <Form.Item
        name="intro"
        label="Intro"
        rules={[
          {
            required: false,
            message: "Please tell us a little about yourself!",
          },
        ]}
      >
        <Input.TextArea
          placeholder="Intro"
          name="intro"
          onChange={handleInputChange}
          value={userFormData.intro}
          showCount
          maxLength={250}
        />
      </Form.Item>

      <Form.Item
        name="pronouns"
        label="Pronouns"
        rules={[
          {
            required: true,
            message: "Please select one",
          },
        ]}
      >
        <Select
          name="pronouns"
          onChange={handleSelectChange}
          value={userFormData.pronouns}
          placeholder="Would you like to share your pronouns?"
        >
          <Option value="He/Him">He/Him</Option>
          <Option value="She/Her">She/Her</Option>
          <Option value="They/Them">They/Them</Option>
          <Option value="Other">Other</Option>
          <Option value="Prefer-not-to-say">Prefer not to say</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="birthday"
        label="Enter your birthday"
        rules={[
          {
            required: true,
            message:
              "Please enter your birthdate as MM/DD/YYYY, you must be 21 years of age to use this site.",
            whitespace: true,
          },
        ]}
      >
        <Input
          placeholder="Birthday"
          name="birthday"
          onChange={handleInputChange}
          value={userFormData.birthday}
        />
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
