import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Form, Rate, Input, Button } from 'antd';
import { ADD_REVIEW } from '../utils/mutations';
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";




export default function AddReviewForm({ showForm, setShowForm }) {
    let { breweryId } = useParams();
    const [form] = Form.useForm();
    const [reviewFormData, setUserFormData] = useState({});

    const [addReview, { error }] = useMutation(ADD_REVIEW);
    // gathers user ID from logged in data
    // const { loading, data } = useQuery(GET_ME);
    // const user = data?.me || {};
    // if (!user) {
    //     return <h2>Please log in!</h2>;
    // }

    useEffect(() => {
        setUserFormData({ ...reviewFormData, breweryId });
    }, [])

    // sets State to track user input
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...reviewFormData, [name]: value });
    };

    // adds review to database and empties form
    const handleReviewSubmit = async (values) => {
        console.log('state value here:', reviewFormData);
        try {
            console.log('sending these', ...reviewFormData)
            // const { data } = await addReview({
            //     variables: { ...reviewFormData, formattedBrewId }
            // });
            // console.log(data)
            // if (!data) {
            //     throw new Error('Unable to add review.');
            // }
        } catch (err) {
          console.error(err);
          Form.resetFields();
        }
        setUserFormData({
            brewery: '',
            rate: 0
        });
        setShowForm(!showForm);
    };

    // prevents user from adding review
    if (Auth.loggedIn()) {
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
                <Form.Item name='review' label='Review Details'>
                    <Input.TextArea
                        placeholder=''
                        name='reviewText'
                        onChange={handleInputChange}
                        value={reviewFormData.reviewText}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                    >
                        Save
                    </Button>
                </Form.Item>
            </Form>
        )
    } else {
        return (<h2>Please log in!</h2>);
    };
}