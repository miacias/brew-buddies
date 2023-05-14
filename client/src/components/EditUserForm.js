import { /*AutoComplete,*/ Button, Form, Input, Select } from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_USER } from "../utils/mutations";
import { GET_ME } from "../utils/queries";
// import Auth from "../utils/auth";
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
export const EditUserForm = () => {
  const [form] = Form.useForm();
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    // username: "",
    // email: "",
    // password: "",
  });
  // set state for form validation
  // const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [editUser/*, { error }*/] = useMutation(EDIT_USER);
  const { /*loading,*/ data } = useQuery(GET_ME);
  const userData = data?.me || {};
  if (!userData) {
    return <h2>Please log in!</h2>;
  }

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
    // FILTERS OUT EMPTY STRINGS SO WE CAN SEND THE DATA OVER AND NOT BREAK APOLLO
    const filteredData = Object.entries(userFormData)
      .filter(([_, value]) => value !== "")
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    try {
      console.log(userFormData);
      const { data } = await editUser({
        variables: { input: { ...filteredData } },
      });

      if (!data) {
        throw new Error("something went wrong!");
      }

    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      profilePic: "",
      postalCode: "",
      intro: "",
      pronouns: "",
    });
  };
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="update"
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
          placeholder={userData.profilePic}
          name="profilePic"
          onChange={handleInputChange}
          value={userFormData.profilePic}
        />
      </Form.Item>
      <Form.Item
        name="postalCode"
        label="Postal Code"
        rules={[
          {
            required: false,
            message: "Please put the postal code for where you live.",
            whitespace: true,
          },
        ]}
      >
        <Input
          placeholder={userData.postalCode}
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
          placeholder={userData.intro}
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
            required: false,
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
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};
