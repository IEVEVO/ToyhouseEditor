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
			state: "loading",

			html: ``,
			css: ``,

			editorWidth: 40,
			autosave: 300000,

			theme: "night",
			removeComments: false,
			pageLayout: "user",

			activeProfile: -1
		};

		this.setNextAutosave = this.setNextAutosave.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

		this.update = this.update.bind(this);
		this.updateTheme = this.updateTheme.bind(this);
		this.updateHTML = this.updateHTML.bind(this);
		this.updateCSS = this.updateCSS.bind(this);
		this.updateSize = this.updateSize.bind(this);

		this.newBlankSave = this.newBlankSave.bind(this);
		this.newSave = this.newSave.bind(this);
		this.overwriteSave = this.overwriteSave.bind(this);
		this.loadSave = this.loadSave.bind(this);
		this.deleteSave = this.deleteSave.bind(this);
	}

    componentWillUnmount() {
        // unbind keybinds
        window.removeEventListener("keydown", this.handleKeyDown);
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
			this.loadSave(profile, () => {
				// stop loading
				this.setState({state: "idle"});
			});
		}
		else {
			this.setState({state: "idle"});
		}

		// initialise shortcuts
        window.addEventListener("keydown", this.handleKeyDown);

		// initialise autosaving
		this.setNextAutosave();
	}


	setNextAutosave() {
		// sets a timer for the next autosave
		if(this.state.autosave === 0) {
			// if 0, disabled

			window.setTimeout(() => {
				// if off, check every minute to see if it's changed
				this.setNextAutosave();
			}, 60000);

			return;
		}


		window.setTimeout(() => {
			// after the interval
			this.overwriteSave();
			this.setNextAutosave();

		}, this.state.autosave);
	}

	handleKeyDown(e) {
        // keyboard shortcuts
        if(this.state.state === "loading") return;

		var key = e.keyCode;

		if(key === 78 && e.ctrlKey && e.altKey && e.shiftKey) {
            // ctrl + alt + shift + n --> new blank profile
            this.newBlankSave();
            e.preventDefault();
		}
	}


	update(e) {
		var tmp = {};
		tmp[e.target.name] = e.target.value;
		this.setState(tmp);
	}

	updateTheme(e) {
		this.setState({theme: e.target.value});
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


	newBlankSave(callback=() => {}, error=() => {}) {
		// make a new blank save
		if( !window.confirm("Do you want to create a new profile? This will erase any unsaved changes.") ) {
			return;
		}
		

        var name = window.prompt("Enter a name");

        if(!name || name === null || name.trim() === "") {
			error();
            return;
		}

		addTheme({
            date: new Date(),
            name: name || "Theme"
        })
            .then(id => {
				callback(id);
				this.setState({
					activeProfile: id,
					html: "",
					css: ""
				});
            })
            .catch(err => {
				error();
                console.error(err);
            });

	}

	newSave(callback=() => {}, error=() => {}) {
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
	
	overwriteSave(callback=() => {}, error=() => {}) {
		if(this.state.activeProfile === -1) {
			//this.newSave(callback, error);
			return;
		}


		editTheme(this.state.activeProfile, {
            date: new Date(),
            html: this.state.html,
            css: this.state.css,
            layout: this.state.pageLayout
        })
            .then(response => {
				callback(response);
            })
            .catch(err => {
				error(err);
                console.error(err);
            });
	
	}

	loadSave(index, callback=() => {}, error=() => {}) {
		// load
		fetchProfileById(index)
			.then(response => {
				// load data
				var data = response[0];

				if(data === undefined) {
					// invalid save
					this.setState({
						activeProfile: -1,
						state: "idle"
					});

					error();
					return;
				}
				
				this.setState({
					html: data.html,
					css: data.css,
					pageLayout: data.layout,
					activeProfile: data.id
				});

				callback(data);
			})
            .catch(err => { 
				console.error(err); 
				error(err);
			});

	}

	deleteSave(index, callback=() => {}, error=() => {}) {
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

	renameSave(index, newName, callback=() => {}, error=() => {}) {
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
