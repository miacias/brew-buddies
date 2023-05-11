import React from 'react';
import BeerLogo from './BeerLogo';
import LogoutButton from './LogoutButton';
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