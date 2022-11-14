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
    wordToSpan(word) {
        const classList = word.typed ? "typed" : "";
        return word.map(char => <span className={classList}>{char}</span>);
    }
    render() {
        const { text, typed } = this.state;
        let e = [];
        const cursor = <span id="cursor" />;
        for (const i in text) {
            for (const j in text[i]) {
                if (i == typed.length - 1 && j == typed[i].length) {
                    e.push(cursor);
                }
                if (!typed[i]?.[j]) {
                    e.push(<span>{text[i][j]}</span>);
                } else if (typed[i][j] !== text[i][j]) {
                    e.push(<span className="incorrect">{text[i][j]}</span>);
                } else {
                    e.push(<span className="typed">{typed[i][j]}</span>);
                }
            }
            if (typed[i]?.length >= text[i].length) {
                const s = e.pop(); // remove the space
                for (const j in typed[i]) {
                    if (!text[i]?.[j] || text[i][j] === " ") {
                        e.push(<span className="incorrect">{typed[i][j]}</span>);
                    }
                }
                if (i == typed.length - 1) {
                    e.push(cursor);
                }
                e.push(s);
            }
        }
        
        return (
            <div className="Typer">
            <pre id="text">{e}</pre>
            </div>
        );
    }
}

