import React, { useEffect, useRef } from 'react';
import styles from './BeerLogo.module.css';
import Granim from 'granim';

export default function BeerLogo() {
    const ref = React.useRef(null);
    useEffect(() => {
        // DOM elements are accessible here
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
      }, []);
    
    return (
        <div className={styles['bloc-logo']}>
            <canvas id='logo-canvas' ></canvas>
            <p
                className={styles['logo-mask']} 
                style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/android-chrome-192x192.png)`}}
            >Brew Buddies</p>
        </div>
    )
}
