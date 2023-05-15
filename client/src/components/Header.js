import React from 'react';
import BeerLogo from './BeerLogo';
import { Row, Col, Space } from 'antd'


export default function Header() {
    return (
        <header>
            <Row>
                <Space
    direction="vertical"
    size="middle"
    style={{paddingBottom: '50px'}}
  >
            <BeerLogo/>
            </Space>
            <h1>Brew Buddies</h1>
            </Row>
        </header>
    )
}