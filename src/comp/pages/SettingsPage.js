import React from "react";
import { ExportButton } from "../ExportButton";

export class SettingsPage extends React.Component {
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
            <div className="settings-page">

                <div className="setting-container">
                    <div className="label">
                        Theme
                    </div>

                    <div className="action">
                        <select name="theme" value={this.props.app.state.theme} onChange={this.props.app.update}>
                            <option value="default">Default</option>
                            <option value="night">Night</option>
                            <option value="black-forest">Pink</option>
                            <option value="abyssal-plain">Teal</option>
                            <option value="apis-mellifera">Bee</option>
                            <option value="pink-velvet-cake">Pink again</option>
                        </select>
                    </div>
                </div>

                
                <div className="setting-container">
                    <div className="label">
                        Remove comments
                    </div>

                    <div className="action">
                        <input 
                            type="checkbox"
                            name="removeComments"
                            value={this.props.app.state.removeComments}
                            onChange={this.props.app.update}
                        />
                    </div>
                </div>

                <div className="divider"></div>

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
