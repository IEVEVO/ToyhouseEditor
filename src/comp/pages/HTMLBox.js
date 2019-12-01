import React from "react";
import Editor from '@monaco-editor/react';
import { SaveButton } from "../SaveButton";
import { Loading } from "../Loading";


export class HTMLBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            state: "loading",
            code: this.props.app.state[this.props.language],
            getCode: () => {},

            updateDisabled: false
        };

        this.timer = "";

        this.handleKeyDown = this.handleKeyDown.bind(this);
        
		this.update = this.update.bind(this);
		this.submit = this.submit.bind(this);
		this.revert = this.revert.bind(this);
    }

    componentWillUnmount() {
        // save when being unloaded
        if(this.state.unsaved) {
            this.submit("autosave");
        }

        // unbind keybinds
        window.removeEventListener("keydown", this.handleKeyDown);
    }

    componentDidMount() {
		// set up keybinds
		window.addEventListener("keydown", this.handleKeyDown);
    }

	handleKeyDown(e) {
        // keyboard shortcuts
        if(this.state.state === "loading") return;

		var key = e.keyCode;

		if(key === 83 && e.ctrlKey) {
            // ctrl + s --> update preview
            if(e.shiftKey) {
                // ctrl + shift + s --> save to profile
                this.props.app.overwriteSave();
            }

            this.submit();
            e.preventDefault();
		}
	}


	update(code) {
        // when the editor mounts, store the function that is used to get the current value of the editor
		this.setState({getCode: code, state: "idle"});
    }
    
    submit(e) {
        this.setState({unsaved: false, updateDisabled: true});
        if(e !== undefined) e.preventDefault();

        switch(this.props.language) {
            case "html":
                this.props.app.updateHTML( this.state.getCode() );
                break;
            case "css":
                this.props.app.updateCSS( this.state.getCode() );
                break;
            default:
                break;
        }


        window.setTimeout(() => {
            // delay the button returning to normal
            this.setState({updateDisabled: false});
        }, 300);
    }

    revert() {
        // reverts changes
        if(this.state.unsaved) {
            if( window.confirm("Revert changes?") ) {
                this.setState({
                    code: this.props.app.state[this.props.language],
                    unsaved: false
                });
                
                this.submit("autosave");
            }
        }
    }


    render() {
        
        return (
            <div className={this.props.language + "-box"}>
                <Editor 
                    theme="dark"
                    name="code"
                    placeholder={"Enter your " + this.props.language.toUpperCase() + " code here"}
                    language={this.props.language}
                    loading={<Loading />}
                    options={{
                        wordWrap: "on",
                        fontSize: 14,
                        acceptSuggestionOnCommitCharacter: false
                    }}
                    value={this.state.code}
                    editorDidMount={this.update}
                />
                
                <button 
                    className={"submit success " + (this.state.updateDisabled ? "disabled" : "")}
                    name="submit" 
                    onClick={this.submit}
                >
                    Update Preview
                </button>

                <SaveButton app={this.props.app} activeProfile={this.props.app.state.activeProfile} className="submit" />

                {
                    this.state.unsaved ? 
                    <button className="submit danger" name="revert" onClick={this.revert}>Revert changes</button> : ""
                }
            </div>
        );
    }
}

HTMLBox.defaultProps = {
    language: "html"
};
