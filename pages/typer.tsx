import React from 'react';
import styles from '../styles/typer.module.css';

const PLACEHOLDER = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

type TyperState = {
    text: string[][];
    typed: string[][];
    words: string[];
    currentWord: number;
}

type WordProps = {
    id: number;
    children: React.ReactNode;
    next: () => void;
}

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Typer />
      </div>
    );
  }
}

class Typer extends React.Component<{}, TyperState> {

    constructor(props: any) {
        super(props);
        this.state = {
            text: this.getText(),
            typed: [[]],
            words: PLACEHOLDER.split(" "), // TODO: change this to getText()
            currentWord: 0,
        };
        this.onType = this.onType.bind(this);
    }
    componentDidMount() {
        document.addEventListener("keydown", this.onType);
    }
    compunentWillUnmount() {
        document.removeEventListener("keydown", this.onType);
    }
    getText() {
        return PLACEHOLDER.split(" ").map(word => [...word.split(""), " "]);
    }
    onType(ev: KeyboardEvent) {
        document.dispatchEvent(new CustomEvent(`word${this.state.currentWord}`, { detail: ev.key }));
        /* const { typed } = this.state,
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
        ev.preventDefault(); */
    }
    nextWord() {
        this.setState({ currentWord: this.state.currentWord + 1 });
    }
    render() {
        /* const { text, typed } = this.state;
        let e = [];
        const cursor = <span id={styles.cursor} />;
        for (let [i, word] of text.entries()) {
            const typedWord = typed[i] || [];
            let wordE = [];
            word = word.slice(0, -1);
            for (const j in word) {
                const letter = word[j],
                    typedLetter = typedWord[j];
                if (typedLetter === letter) {
                    wordE.push(<span className={styles.correct}>{letter}</span>);
                } else if (typedLetter) {
                    wordE.push(<span className={styles.incorrect}>{letter}</span>);
                }
            }
            const excess = typedWord.slice(word.length);
            for (const j in excess) {
                wordE.push(<span className={styles.incorrect}>{excess[j]}</span>);
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
            <div id="typer">
            <pre id={styles.text}>{e}</pre>
            </div>
        ); */
        return (
            <div id="typer">
            <pre id={styles.text}>
            {this.state.words.map((word, i) => <Word key={i} id={i} next={() => this.nextWord()}>{word}</Word>)}
            </pre>
            </div>
        )
    }
}

class Word extends React.Component<WordProps, {}> {

    constructor(props: any) {
        super(props);
        this.onType = this.onType.bind(this);
    }
    componentDidMount() {
        document.addEventListener(`word${this.props.id}`, this.onType);
    }
    componentWillUnmount() {
        document.removeEventListener(`word${this.props.id}`, this.onType);
    }
    onType(ev: Event) {
        console.log((ev as CustomEvent).detail);
    }
    render() {
        return (
            <span>{this.props.children} </span>
        );
    }
}

