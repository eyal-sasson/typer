import React from 'react';
import styles from '../styles/typer.module.css';
import Router from 'next/router';

const PLACEHOLDER = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

enum wordState {
    CORRECT,
    MISTAKE,
    UNTYPED,
}

type TyperState = {
    words: string[];
    wordStates: wordState[];
    time: number;
}

type WordProps = {
    id: number;
    children: React.ReactNode;
    currentWord: number;
    updateWord: (state: wordState) => void;
}

type WordState = {
    typed: string;
}

type TimerProps = {
    characters: number;
    time: number;
}

type TimerState = {
    startTime: number;
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
            wordStates: [],
            time: 0
        }
        this.startTimer = this.startTimer.bind(this);
    }
    componentDidMount() {
        document.addEventListener("keydown", this.startTimer);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.startTimer);
    }
    startTimer() {
        if (this.state.time === 0) {
            this.setState({time: Date.now()});
            window.setInterval(() => {
                this.setState({time: this.state.time + 1});
            }, 1000);
        }
    }
    getWords() {
        return PLACEHOLDER.split(" ");
    }
    updateWord(state: wordState) {
        if (state === wordState.UNTYPED) {
            if (this.state.wordStates.at(-1) === wordState.MISTAKE) {
                this.setState({
                    wordStates: this.state.wordStates.slice(0, -1)
                });
            }
        } else {
            this.setState({
                wordStates: [...this.state.wordStates, state]
            });
        }
    }
    render() {
        let characters = 0;
        this.state.words.filter((_, i) => this.state.wordStates[i] === wordState.CORRECT)
            .forEach(word => characters += word.length);
        return (
            <div id="typer">
                <pre id={styles.text}>
                    {this.state.words.map((word, i) =>
                        <Word key={i} id={i}
                            currentWord={this.state.wordStates.length}
                            updateWord={state => this.updateWord(state)}>{word}</Word>
                    )}
                </pre>
                <Timer characters={characters} time={30} />
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
        if (key === " ") {
            if (this.state.typed.length > 0) {
                this.props.updateWord(this.state.typed === this.props.children ? wordState.CORRECT : wordState.MISTAKE);
            }
        } else if (key === "Backspace") {
            if (this.state.typed.length > 0) {
                this.setState({typed: this.state.typed.slice(0, -1)});
            } else {
                this.props.updateWord(wordState.UNTYPED);
            }
        } else if (key.length === 1) {
            this.setState({typed: this.state.typed + key});
        }
    }
    render() {
        if (!this.props.children) return;

        const word = this.props.children.toString(),
            typed = this.state.typed;
        const e = [];
        let charId = 0;
        for (const i in [...typed]) {
            const letter = word[i],
                typedLetter = typed[i];
            if (typedLetter === letter)
                e.push(<span className={styles.correct} key={charId++}>{letter}</span>);
            else if (letter)
                e.push(<span className={styles.incorrect} key={charId++}>{letter}</span>);
            else
                e.push(<span className={styles.incorrect} key={charId++}>{typedLetter}</span>);
        }
        if (this.props.id === this.props.currentWord) {
            e.push(<span id={styles.cursor} key={charId++} />);
        }
        const untyped = word.slice(typed.length);
        for (const letter of untyped) {
            e.push(<span key={charId++}>{letter}</span>);
        }
        return (
            <span className={styles.word}>{e} </span>
        );
    }
}

class Timer extends React.Component<TimerProps, TimerState> {

    constructor(props: any) {
        super(props);
        this.state = {
            startTime: 0,
        }
        this.startTimer = this.startTimer.bind(this);
    }
    componentDidMount() {
        document.addEventListener("keydown", this.startTimer);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.startTimer);
    }
    startTimer() {
        if (!this.state.startTime)
            this.setState({startTime: Date.now()});
    }
    render() {
        if (!this.state.startTime) return;
        const time = Math.round((Date.now() - this.state.startTime) / 1000),
            cpm = Math.round(this.props.characters / time * 60) || 0,
            wpm = Math.round(cpm / 5),
            timeLeft = this.props.time - time;

        if (timeLeft <= 25) {
            Router.push({
                pathname: "/results",
                query: {cpm}
            });
        }

        return (
            <div id="timer">
                {timeLeft} {cpm} {wpm}
            </div>
        );
    }
}

