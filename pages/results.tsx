import React from 'react';
import Router from 'next/router';

export default class Results extends React.Component {
    render() {
        return (
            <main>
                <h1>Results</h1>
                <p>CPM: {Router.query.cpm}</p>
                <button onClick={() => Router.push('/')}>Try again</button>
            </main>
        );
    }
}

