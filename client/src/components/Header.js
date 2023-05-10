import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space, Row } from 'antd';
const { Search } = Input;

export default function Header() {
    
    return (
        <>
            <Row>
            <h1>Brew Buddies</h1>
            <Space direction="horizontal" />
            <Search
            placeholder="Search by postalcode"
            // onSearch={onSearch}
            style={{
                width: 200,
            }}
            />
            </Row>
        </>
    )
}