import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Form, Rate, Input, Button } from 'antd';
import { ADD_REVIEW } from '../utils/mutations';
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";
const ObjectId = require("bson-objectid");




export default function AddReviewForm({ showForm, setShowForm }) {
    let { breweryId } = useParams();
    const [form] = Form.useForm();
    const [reviewFormData, setUserFormData] = useState({});

    const [addReview, { error }] = useMutation(ADD_REVIEW);

    useEffect(() => {
        setUserFormData({ ...reviewFormData, breweryId });
    }, []);

    // sets State to track user input
    const handleInputChange = (event) => {
        let value = event;
        if (typeof value === 'number') {
            setUserFormData({...reviewFormData, starRating: value.toString()});
        } else {
            let { value } = event.target;
            setUserFormData({ ...reviewFormData, reviewText: value });
        }
    };

    // adds review to database and empties form
    const handleReviewSubmit = async (values) => {
        // setUserFormData({...reviewFormData, values});
        console.log(reviewFormData)
        try {
            const { data } = await addReview({
                variables: { ...reviewFormData }
            });
            console.log(data);
            if (!data) {
                throw new Error('Unable to add review.');
            }
        } catch (err) {
          console.error(err);
          Form.resetFields();
        }
        setUserFormData({
            reviewText: '',
            rate: 0
        });
        setShowForm(!showForm);
    };

    // prevents user from adding review if logged out
    if (Auth.loggedIn()) {
        return (
            <Form
                name='add-review'
                form={form}
                onFinish={handleReviewSubmit}
                initialValues={{rate: 0, review: ''}}
                style={{maxWidth: 600}}
            >
                <Form.Item name='starRate' label='Rate'>
                    <Rate 
                        name='rate'
                        onChange={handleInputChange}
                        value={reviewFormData.rate}
                    />
                </Form.Item>
                <Form.Item name='review' label='Review Details'>
                    <Input.TextArea
                        placeholder='Tell us your thoughts!'
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