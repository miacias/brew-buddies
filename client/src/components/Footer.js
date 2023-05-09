import React from 'react';
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import styles from './Footer.module.css';

export default function Footer() {
    const contributors = [
        {
            name: 'Mia',
            github: 'https://github.com/miacias',
            linkedin: 'https://www.linkedin.com/in/miaciasullo'
        },
        {
            name: 'Stevie',
            github: 'https://github.com/OConnell-Coder',
            linkedin: 'https://www.linkedin.com/in/stephanie-o-connell-965051274'
        },
        {
            name: 'Margaret',
            github: 'https://github.com/msaylorphila',
            linkedin: 'https://www.linkedin.com/in/margaret-saylor'
        },
        {
            name: 'Fred',
            github: 'https://github.com/LearnedDr',
            linkedin: 'https://www.linkedin.com/in/fredrick-chang-85987672'
        }
    ];
    return (
        <>
            <h3>Brew Buddies is brought to you by</h3>
            {contributors.map((coder) => {
                return (
                    <div>
                        <p className={styles.coder}>{coder.name}</p>
                        <a href={coder.linkedin} className={styles.contactIcon}>
                            <LinkedinOutlined />
                        </a>
                        <a href={coder.github} className={styles.contactIcon}>
                            <GithubOutlined />
                        </a>
                    </div>
                )
            })}
        </>
    )
}