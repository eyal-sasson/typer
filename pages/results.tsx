import React from 'react';
import Router from 'next/router';
import styles from '../styles/results.module.css';

export default class Results extends React.Component {
    render() {
        return (
            <div id={styles.results}>
                <h1>Results</h1>
                <p>CPM: {Router.query.cpm}</p>
                <button className={styles.retry} onClick={() => Router.push('/')}>Try again</button>
            </div>
        );
    }
}

