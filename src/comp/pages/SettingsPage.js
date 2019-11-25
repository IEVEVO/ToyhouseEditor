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
                        Page template
                    </div>

                    <div className="action">
                        <select name="pageLayout" value={this.props.app.state.pageLayout} onChange={this.props.app.update}>
                            <option value="user">User profile</option>
                            <option value="character">Character profile</option>
                        </select>
                    </div>
                </div>

                <div className="setting-container">
                    <div className="label">
                        Theme
                    </div>

                    <div className="action">
                        <select name="theme" value={this.props.app.state.theme} onChange={this.props.app.update}>
                            <option value="default" disabled>Default</option>
                            <option value="night">Night</option>
                            <option value="black-forest" disabled>Pink</option>
                            <option value="abyssal-plain" disabled>Teal</option>
                            <option value="apis-mellifera" disabled>Bee</option>
                            <option value="pink-velvet-cake" disabled>Pink again</option>
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

                <div className="divider" />


                <div className="saves user-profiles">
                    Saved user profiles
                </div>
                
                <div className="saves user-profiles">
                    Saved character profiles
                </div>

            </div>
        );
    }
}
