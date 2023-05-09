import React, { useEffect, useRef } from 'react';
import styles from './BeerLogo.module.css';
import Granim from 'granim';

export default function BeerLogo() {
    const ref = React.useRef(null);
    useEffect(() => {
        // DOM elements are accessible here
        // console.log(ref.current);
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
        <>
            {/* <div ref={ref}></div> */}
            <div className={styles.blocLogo}>
                <canvas id='logo-canvas' className={styles.blocLogoCanvas}></canvas>
                <a href="index.html" className={styles.logoMask}><img src={`${process.env.PUBLIC_URL}/android-chrome-192x192.png`} alt='frothy beer mug'/></a>
            </div>
        </>

    )
}
