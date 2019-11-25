import React from "react";
import { applyClassesToHTML } from "../_general";
import copy from "copy-to-clipboard";

export class ExportButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            state: "idle",
            code: ""
        };

		this.export = this.export.bind(this);
		this.copy = this.copy.bind(this);
    }

    componentDidMount() {
        this.export();
    }

    export() {
        // exports
        var code = applyClassesToHTML(this.props.html, this.props.css, false);

        console.log(code);
        this.setState({code: code});
    }

    copy() {
        copy(this.state.code);
        window.alert("Code copied to clipboard.");
    }


    render() {
        return (
            <React.Fragment>
                <textarea 
                    value={this.state.code} 
                    placeholder="This is where the code will end up, when you write some."
                    onClick={(e) => {
                        e.target.setSelectionRange(0, this.state.code.length);
                    }}
                    readOnly 
                />

                <button className="submit success" onClick={this.export}>Update</button>

                <button className="submit" onClick={this.copy}>Copy</button>
            </React.Fragment>
        );
    }
}


ExportButton.defaultProps = {
    html: "",
    css: ""
};
