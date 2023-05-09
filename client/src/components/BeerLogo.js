import React, { useRef } from 'react';
import styles from './BeerLogo.module.css';
import Granim from 'granim';

export default function Logo() {
    let granimInstance = new Granim({
        element: '#logo-canvas',
        direction: 'left-right',
        states : {
            "default-state": {
                gradients: [
                    ['#EB3349', '#F45C43'],
                    ['#FF8008', '#FFC837'],
                    ['#4CB8C4', '#3CD3AD'],
                    ['#24C6DC', '#514A9D'],
                    ['#FF512F', '#DD2476'],
                    ['#DA22FF', '#9733EE']
                ],
                transitionSpeed: 2000
            }
        }
    });
    return (
        <div className={styles.blocLogo}>
            <canvas id='logo-canvas' className={styles.blocLogoCanvas}></canvas>
            <a href="index.html" className={styles.logoMask} style={{backgroundImage: `url(${process.env.PUBLIC_URL}/favicon-32x32.png)`}}>Granim.js</a>
        </div>
    )
}
