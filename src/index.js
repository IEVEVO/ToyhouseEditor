import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";

import "./styles.scss";

import { EditorPanel } from "./comp/EditorPanel";
import { PreviewPanel } from "./comp/PreviewPanel";


export class App extends React.Component {
    constructor(props) {
		super(props);
		
		this.state = {
			html: "",
			css: ""
		};

		this.update = this.update.bind(this);
	}

	update(e) {
		var tmp = {};
		tmp[e.target.name] = e.target.value;
		this.setState(tmp);
	}


	render() {
        return (
			<div className="App">
				<BrowserRouter>
					<EditorPanel app={this} />
					<PreviewPanel app={this} />
				</BrowserRouter>
			</div>
        );
    }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
