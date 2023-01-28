import React from 'react';
import { withRouter, NextRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/results.module.css';

type ResultsProps = {
    router: NextRouter;
}

class Results extends React.Component<ResultsProps> {
    componentDidMount() {
        if (!this.props.router.query.cpm) {
            this.props.router.push('/');
        }
    }
    render() {
        const cpm = parseInt(this.props.router.query.cpm as string),
              wpm = Math.round(cpm / 5);
        return (
            <div id={styles.results}>
                <Head>
                    <title>Typer: Results</title>
                </Head>

                <h1>Results</h1>
                <p>WPM: {wpm}</p>
                <p>CPM: {cpm}</p>
                <button className={styles.retry} onClick={() => this.props.router.push('/')}>Try again</button>
            </div>
        );
    }
}

export default withRouter(Results);

