import React from "react";
import Editor from '@monaco-editor/react';


export class CSSBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: this.props.app.state.css,
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

        if(e === "autosave" || e.target.name === "submit" || (e.target.name === "code" && e.altKey && key === 83)) {
            // alt + s
            this.props.app.updateCSS( this.state.getCode() );
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
                    code: this.props.app.state.css,
                    unsaved: false
                });
                
                this.submit("autosave");
            }
        }
    }


    render() {
        return (
            <div className="css-box">
                <Editor 
                    theme="dark"
                    name="code"
                    placeholder="Enter your CSS code here"
                    language="css"
                    options={{
                        wordWrap: "on",
                        fontSize: 15,
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

CSSBox.defaultProps = {

};
