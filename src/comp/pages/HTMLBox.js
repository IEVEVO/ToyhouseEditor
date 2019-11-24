import React from "react";
import Editor from '@monaco-editor/react';


export class HTMLBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: this.props.app.state.html,
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
        var key = e.keyCode;

        if(key === 9) {
            // tab
            e.preventDefault();
            return;
        }

        if(e === "autosave" || e.target.name === "submit" || (e.target.name === "code" && e.altKey && key === 83)) {
            // alt + s
            this.props.app.updateHTML( this.state.getCode() );
            this.setState({unsaved: false});

            if(typeof e === "event") {
                e.preventDefault();
            }
        }
    }

    revert() {
        // reverts changes
        if(this.state.unsaved) {
            if( window.confirm("Revert changes?") ) {
                this.setState({
                    code: this.props.app.state.html,
                    unsaved: false
                });
                
                this.submit("autosave");
            }
        }
    }


    render() {
        return (
            <div className="html-box">
                <Editor 
                    theme="dark"
                    name="code"
                    placeholder="Enter your HTML code here"
                    language="html"
                    options={{
                        wordWrap: "on",
                        fontSize: 14,
                        acceptSuggestionOnCommitCharacter: false
                    }}
                    value={this.state.code}
                    editorDidMount={this.update}
                />

                
                <button className="submit success" name="submit" onClick={this.submit}>Save</button>

                {
                    this.state.unsaved ? 
                    <button className="submit danger" name="revert" onClick={this.revert}>Revert changes</button> : ""
                }
            </div>
        );
    }
}

HTMLBox.defaultProps = {
};
