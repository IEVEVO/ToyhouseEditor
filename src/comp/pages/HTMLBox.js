import React from "react";
import Editor from '@monaco-editor/react';
import { SaveButton } from "../SaveButton";
import { Loading } from "../Loading";


export class HTMLBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: this.props.app.state[this.props.language],
            getCode: () => {},
            unsaved: false,

            updateDisabled: false
        };

		this.update = this.update.bind(this);
		this.submit = this.submit.bind(this);
		this.revert = this.revert.bind(this);
    }

    componentWillUnmount() {
        // save if unsaved
        if(this.state.unsaved) {
            this.submit("autosave");
        }
    }

	update(code) {
        //console.log(code());
		this.setState({getCode: code});
    }
    
    submit(e) {
        this.setState({unsaved: false, updateDisabled: true});
        e.preventDefault();

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
