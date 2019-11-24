import React from "react";
import { applyClassesToHTML } from "../_general";

export class ExportButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            state: "idle",
            code: ""
        };

		this.export = this.export.bind(this);
    }

    export() {
        // exports
        if(this.state.code !== "") {
            this.setState({code: ""});
            return;
        }


        var code = applyClassesToHTML(this.props.html, this.props.css, false);

        console.log(code);
        this.setState({code: code});
    }


    render() {
        return (
            <React.Fragment>
                <button onClick={this.export} className="primary">
                    {(this.state.code === "" ? "Export" : "Close")}
                </button>

                {
                    (this.state.code !== "") ? 
                    <textarea 
                        value={this.state.code} 
                        onClick={(e) => {
                            e.target.setSelectionRange(0, this.state.code.length);
                        }}
                        readOnly 
                    /> : ""
                }
            </React.Fragment>
        );
    }
}


ExportButton.defaultProps = {
    html: "",
    css: ""
};
