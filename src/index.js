import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";

import "./styles.scss";

import { EditorPanel } from "./comp/EditorPanel";
import { PreviewPanel } from "./comp/PreviewPanel";
import { Resizer } from "./comp/pages/Resizer";


export class App extends React.Component {
    constructor(props) {
		super(props);
		
		this.state = {
			html: `<!-- CREDIT; DO NOT REMOVE! -->
			<p className="text-muted mx-auto text-right">original design by <a href="https://toyhou.se/realtense" style="color:#ad7c52">realtense</a><br>code by <a className="text" href="https://toyhou.se/Zodia" style="color:#ad7c52">zodia</a></p>`,
			css: `.text-muted { color: white; }
			.text {color: red;}
			.mx-auto {
				max-width: 550px; 
				font-size: 10px; 
				letter-spacing: 1px;
			}`,

			editorWidth: 40,

			theme: "night",
			removeComments: false,
			pageLayout: "user"
		};

		this.update = this.update.bind(this);
		this.updateHTML = this.updateHTML.bind(this);
		this.updateCSS = this.updateCSS.bind(this);
	}

	update(e) {
		var tmp = {};
		tmp[e.target.name] = e.target.value;
		this.setState(tmp);
	}

	updateHTML(code) {
		this.setState({html: code});
	}

	updateCSS(code) {
		this.setState({css: code});
	}

	updateSize(size) {
		this.setState({editorWidth: size});
	}


	render() {
        return (
			<div className="App">
				<BrowserRouter>
					<EditorPanel app={this} />
					<Resizer app={this} />
					<PreviewPanel app={this} />
				</BrowserRouter>
			</div>
        );
    }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
