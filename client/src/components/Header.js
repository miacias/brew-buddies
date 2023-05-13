import React from 'react';
import BeerLogo from './BeerLogo';
import { Row, Col } from 'antd'


export default function Header() {
    return (
        <header>
            <Row>
            <BeerLogo/>
            <h1>Brew Buddies</h1>
            </Row>
        </header>
    )
}