import React from "react";
import { ExportButton } from "../ExportButton";

export class ExportPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

		this.update = this.update.bind(this);
    }

	update(e) {
		var tmp = {unsaved: true};
		tmp[e.target.name] = e.target.value;
		this.setState(tmp);
    }


    render() {
        return (
            <div className="export-page">

                <div>
                    <ExportButton 
                        html={this.props.app.state.html} 
                        css={this.props.app.state.css} 
                    />
                </div>

            </div>
        );
    }
}
