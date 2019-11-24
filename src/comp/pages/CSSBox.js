import React from "react";

export class CSSBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: this.props.app.state.css,
            unsaved: false
        };

		this.update = this.update.bind(this);
		this.submit = this.submit.bind(this);
		this.revert = this.revert.bind(this);
    }

    componentWillUnmount() {
        // save if unsaved
        if(this.state.unsaved) {

            if( window.confirm("Do you want to save your changes to CSS?") ) {
                this.submit("autosave");
            }

        }
    }

	update(e) {
		var tmp = {unsaved: true};
		tmp[e.target.name] = e.target.value;
		this.setState(tmp);
    }
    
    submit(e) {
        var key = e.keyCode;

        if(e === "autosave" || e.target.name === "submit" || (e.target.name === "code" && e.altKey && key === 83)) {
            // alt + s
            this.props.app.updateCSS(this.state.code);
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
                <textarea 
                    name="code"
                    placeholder="Enter your CSS code here"
                    value={this.state.code}
                    onChange={this.update}
                    onKeyDown={this.submit}
                />

                {
                    this.state.unsaved ? 
                    <button className="success" name="submit" onClick={this.submit}>Save (alt+s)</button> : ""
                }

                {
                    this.state.unsaved ? 
                    <button className="danger" name="revert" onClick={this.revert}>Revert changes</button> : ""
                }
            </div>
        );
    }
}

CSSBox.defaultProps = {

};
