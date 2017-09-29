import { h, Component } from 'preact';
import style from './style';

var syllable = require('syllable');

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			line1: '',
			line2: '',
			line3: '',
			currentLine: 1,
			syllables: 0,
		};

		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.reset = this.reset.bind(this);
	}

	reset() {
		this.setState({
			line1: '',
			line2: '',
			line3: '',
			currentLine: 1,
			syllables: 0,
		});
	}

	handleKeyUp(event) {
		var lineText = event.target.value;
		var syllables = syllable(lineText);

		this.setState({
			[event.target.name]: lineText,
			syllables: syllables,
		});
	}

	handleChange(event) {
		var lineText = event.target.value;
		var syllables = syllable(lineText);

		if ((this.state.currentLine === 1 || this.state.currentLine === 3) && syllables !== 5) {
			lineText = 'Wrong number of syllables: ' + syllables + '. Should be 5!';
		}

		if (this.state.currentLine === 2 && syllables !== 7) {
			lineText = 'Wrong number of syllables: ' + syllables + '. Should be 7!';
		}

		this.setState({
			[event.target.name]: lineText,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		var line = 'line' + this.state.currentLine;

		if (this.state[line].indexOf('Wrong') === -1) {
			this.setState({
				currentLine: this.state.currentLine + 1,
			});
		}
	}

	render({}, {line1, line2, line3, currentLine, syllables}) {

		let input = null;

		switch(currentLine) {
			case 1:
				var targetSyllables = 5;
				input = <div><label for="line1">
							First Line:
							<span style={{ color: syllables > targetSyllables ? 'red' : ''}}>{syllables}</span><br />
							<input type="text"
							name="line1"
							data-syllables={targetSyllables}
							onKeyUp={this.handleKeyUp}
							onChange={this.handleChange}
							value={this.state.line1}
							class="large-text-input" />
						</label>&nbsp;
						<input type="submit" value="Submit"/></div>;
				break;
			case 2:
				var targetSyllables = 7;
				input = <div><label for="line2">
							Second Line:
							<span style={{ color: syllables > targetSyllables ? 'red' : ''}}>{syllables}</span><br />
							<input type="text"
							name="line2"
							data-syllables={targetSyllables}
							onKeyUp={this.handleKeyUp}
							onChange={this.handleChange}
							value={this.state.line2}
							class="large-text-input" />
						</label>&nbsp;
						<input type="submit" value="Submit"/></div>;
				break;
			case 3:
				var targetSyllables = 5;
				input = <div><label for="line3">
							Third Line:
							<span style={{ color: syllables > targetSyllables ? 'red' : ''}}>{syllables}</span><br />
							<input type="text"
							name="line3"
							data-syllables={targetSyllables}
							onKeyUp={this.handleKeyUp}
							onChange={this.handleChange}
							value={this.state.line3}
							class="large-text-input" />
						</label>&nbsp;
						<input type="submit" value="Submit"/></div>;
				break;
		}

		return (
			<div class={style.home}>
				<h1>Create a Haiku:</h1>
				<form onSubmit={this.handleSubmit}>
					{input}
				</form>
				<p>{line1}</p>
				<p>{line2}</p>
				<p>{line3}</p>

				<button onClick={this.reset}>Start Over</button>
			</div>
		);
	}
}
