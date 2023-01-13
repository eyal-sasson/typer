import React from 'react';
import styles from '../styles/typer.module.css';

const PLACEHOLDER = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

type TyperState = {
    words: string[];
    currentWord: number;
}

type WordProps = {
    id: number;
    children: React.ReactNode;
    currentWord: number;
    setWord: (id: number) => void;
}

type WordState = {
    typed: string;
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
            words: this.getWords(),
            currentWord: 0,
        };
    }
    getWords() {
        return PLACEHOLDER.split(" ");
    }
    setWord(id: number) {
        this.setState({ currentWord: id > 0 ? id : 0 });
    }
    render() {
        return (
            <div id="typer">
            <pre id={styles.text}>
            {this.state.words.map((word, i) => <Word key={i} id={i} currentWord={this.state.currentWord} setWord={id => this.setWord(id)}>{word}</Word>)}
            </pre>
            </div>
        )
    }
}

class Word extends React.Component<WordProps, WordState> {

    constructor(props: any) {
        super(props);
        this.state = {
            typed: "",
        }
        this.onType = this.onType.bind(this);
    }
    componentDidMount() {
        document.addEventListener("keydown", this.onType);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.onType);
    }
    onType(ev: KeyboardEvent) {
        if (this.props.id !== this.props.currentWord) return;
        const key = ev.key;
        console.log(key);
        if (key === " ") {
            if (this.state.typed.length > 0)
                this.props.setWord(this.props.id + 1);
        } else if (key === "Backspace") {
            if (this.state.typed.length > 0)
                this.setState({ typed: this.state.typed.slice(0, -1) });
            else
                this.props.setWord(this.props.id - 1);
        } else if (key.length === 1)
            this.setState({ typed: this.state.typed + key });
    }
    render() {
        const word = this.props.children?.toString() || "",
              typed = this.state.typed;
        const e = [];
        let charId = 0;
        for (const i in [...typed]) {
            const letter = word[i],
            typedLetter = typed[i];
            if (typedLetter === letter) {
                e.push(<span className={styles.correct} key={charId++}>{letter}</span>);
            } else if (letter) {
                e.push(<span className={styles.incorrect} key={charId++}>{letter}</span>);
            } else {
                e.push(<span className={styles.incorrect} key={charId++}>{typedLetter}</span>);
            }
        }
        if (this.props.id === this.props.currentWord) {
            e.push(<span id={styles.cursor} key={charId++}/>);
        }
        const untyped = word.slice(typed.length);
        for (const j in [...untyped]) {
            e.push(<span key={charId++}>{untyped[j]}</span>);
        }
        return (
            <span>{e} </span>
        );
    }
}

