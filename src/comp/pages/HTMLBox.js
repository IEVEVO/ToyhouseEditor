import React from "react";
import Editor from '@monaco-editor/react';


export class HTMLBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: this.props.app.state[this.props.language],
            getCode: () => {},
            unsaved: false
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
        this.props.app.updateHTML( this.state.getCode() );
        this.setState({unsaved: false});
        e.preventDefault();
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
                    options={{
                        wordWrap: "on",
                        fontSize: 14,
                        acceptSuggestionOnCommitCharacter: false
                    }}
                    value={this.state.code}
                    editorDidMount={this.update}
                />
                
                <button className="submit success" name="submit" onClick={this.submit}>Update Preview</button>

                <button className="submit primary" name="save" onClick={this.save}>Save</button>

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
