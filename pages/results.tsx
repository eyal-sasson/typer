import React from 'react';
import Router from 'next/router';
import styles from '../styles/results.module.css';

export default class Results extends React.Component {
    render() {
        if (!Router.query.cpm) {
            Router.push('/');
            return null;
        }
        const cpm = parseInt(Router.query.cpm as string),
              wpm = Math.round(cpm / 5);
        return (
            <div id={styles.results}>
                <h1>Results</h1>
                <p>WPM: {wpm}</p>
                <p>CPM: {cpm}</p>
                <button className={styles.retry} onClick={() => Router.push('/')}>Try again</button>
            </div>
        );
    }
}

