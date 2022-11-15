import React from 'react';
import './App.css';

const PLACEHOLDER = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Typer />
      </div>
    );
  }
}

class Typer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.getText(),
            typed: [[]],
        };
    }
    componentDidMount() {
        document.addEventListener("keydown", ev => this.onType(ev));
    }
    getText() {
        return PLACEHOLDER.split(" ").map(word => [...word.split(""), " "]);
    }
    onType(ev) {
        const { typed } = this.state,
            key = ev.key;
        if (key === " ") {
            if (typed[typed.length - 1].length !== 0) {
                typed.push([]);
            }
        } else if (key === "Backspace") {
            const lastWord = typed[typed.length - 1];
            if (lastWord.length !== 0) {
                lastWord.pop();
            } else if (typed.length > 1) {
                typed.pop();
            }
        } else if (key.length === 1) {
            const word = typed[typed.length - 1];
            word.push(key)
        }
        this.setState({ typed });
        ev.stopPropagation();
        ev.preventDefault();
    }
    render() {
        const { text, typed } = this.state;
        let e = [];
        const cursor = <span id="cursor" />;
        for (const i in text) {
            const word = text[i].slice(0, -1),
                typedWord = typed[i] || [];
            let wordE = [];
            for (const j in word) {
                const letter = word[j],
                    typedLetter = typedWord[j];
                if (typedLetter === letter) {
                    wordE.push(<span className="correct">{letter}</span>);
                } else if (typedLetter) {
                    wordE.push(<span className="incorrect">{letter}</span>);
                }
            }
            const excess = typedWord.slice(word.length);
            for (const j in excess) {
                wordE.push(<span className="incorrect">{excess[j]}</span>);
            }
            if (i == typed.length - 1) {
                wordE.push(cursor);
            }
            const untyped = word.slice(typedWord.length);
            for (const j in untyped) {
                wordE.push(<span>{untyped[j]}</span>);
            }
            e.push(<span>{wordE} </span>);
        }
        
        return (
            <div className="Typer">
            <pre id="text">{e}</pre>
            </div>
        );
    }
}

