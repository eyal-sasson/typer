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
            typed: "",
        };
    }
    componentDidMount() {
        document.addEventListener("keydown", ev => this.onType(ev));
    }
    getText() {
        return PLACEHOLDER;
    }
    onType(ev) {
        const { text, typed } = this.state;
        if (ev.key === text[0]) {
            this.setState({
                text: text.slice(1),
                typed: typed + text[0],
            });
        }
    }
    render() {
        return (
            <div className="Typer">
                <pre id="text"><span id="typed">{this.state.typed}</span>{this.state.text}</pre>
            </div>
        );
    }
}

