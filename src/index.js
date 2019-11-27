import React from "react";
import ReactDOM from "react-dom";
import {MemoryRouter} from "react-router-dom";

import "./styles.scss";

import { EditorPanel } from "./comp/EditorPanel";
import { PreviewPanel } from "./comp/PreviewPanel";
import { Resizer } from "./comp/pages/Resizer";
import { addTheme, editTheme, fetchProfileById, deleteTheme } from "./db/themes";


export class App extends React.Component {
    constructor(props) {
		super(props);
		
		this.state = {
			html: ``,
			css: ``,

			editorWidth: 40,

			theme: "night",
			removeComments: false,
			pageLayout: "user",

			activeProfile: -1
		};

		this.update = this.update.bind(this);
		this.updateHTML = this.updateHTML.bind(this);
		this.updateCSS = this.updateCSS.bind(this);
		this.updateSize = this.updateSize.bind(this);

		this.newSave = this.newSave.bind(this);
		this.overwriteSave = this.overwriteSave.bind(this);
		this.loadSave = this.loadSave.bind(this);
		this.deleteSave = this.deleteSave.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		// if the active profile changes, save it to cookies
		if(prevState.activeProfile !== this.state.activeProfile) {
			window.localStorage.setItem("thpe-active", this.state.activeProfile);
		}
	}

	componentDidMount() {
		// on load, get the last saved profile
		var profile = window.localStorage.getItem("thpe-active");

		if(profile !== undefined && profile !== null && profile !== -1) {
			this.loadSave(profile);
		}
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


	newSave(callback, error) {
        var name = window.prompt("Enter a name");

        if(!name || name === null || name.trim() === "") {
			error();
            return;
		}

		addTheme({
            date: new Date(),
            name: name || "Theme",
            html: this.state.html,
            css: this.state.css,
            layout: this.state.pageLayout
        })
            .then(id => {
				callback(id);
				this.setState({activeProfile: id});
            })
            .catch(err => {
				error();
                console.error(err);
            });

	}
	
	overwriteSave(callback, error) {
		if(this.state.activeProfile === -1) {
			this.newSave(callback, error);
			return;
		}


		editTheme(this.state.activeProfile, {
            date: new Date(),
            html: this.state.html,
            css: this.state.css,
            layout: this.state.pageLayout
        })
            .then(response => {
				callback();
            })
            .catch(err => {
				error();
                console.error(err);
            });
	
	}

	loadSave(index) {
		// load
		fetchProfileById(index)
			.then(response => {
				// load data
				var data = response[0];
				
				this.setState({
					html: data.html,
					css: data.css,
					pageLayout: data.layout,
					activeProfile: data.id
				});

			})
            .catch(err => { console.error(err); });

	}

	deleteSave(index, callback, error) {
		// delete
		deleteTheme(index)
			.then(response => {
				// load data
				this.setState({
					activeProfile: -1
				});

				callback();
			})
            .catch(err => { console.error(err); error(); });

	}

	renameSave(index, newName, callback, error) {
		editTheme(index, {
			name: newName
        })
            .then(response => {
				callback(response);
            })
            .catch(err => {
				error(err);
                console.error(err);
            });
	}


	render() {
        return (
			<div className="App">
				<MemoryRouter>
					<EditorPanel app={this} />
					<Resizer app={this} />
					<PreviewPanel app={this} />
				</MemoryRouter>
			</div>
        );
    }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
