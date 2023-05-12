import React, { useState } from 'react';
import { Form, Rate, Input } from 'antd';


export default function AddReviewForm() {
    const [form] = Form.useForm();
    const [userFormData, setUserFormData] = useState({});

    // sets State to track user input
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
      };

    // 
    const handleReviewSubmit = async (values) => {
        console.log('form values here:', values);
        try {
    
        } catch (err) {
          console.error(err);
          Form.resetFields();
        }
    }


    return (
        <Form
            name='add-review'
            form={form}
            onFinish={handleReviewSubmit}
            initialValues={{rate: 0}}
            style={{maxWidth: 600}}
        >
            <Form.Item name='rate' label='Rate'>
                <Rate />
            </Form.Item>
            <Form.Item name={['brewery', 'review']} label='Review Details'>
                <Input.TextArea/>
            </Form.Item>
        </Form>
    )
}