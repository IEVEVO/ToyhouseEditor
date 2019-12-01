import React from "react";
import {NavLink} from "react-router-dom";

export class SettingsPage extends React.Component {
    constructor(props) {
        super(props);

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
                <h1>Settings</h1>

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
                        <select name="theme" value={this.props.app.state.theme} onChange={this.props.app.updateTheme}>
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
                        Autosave
                    </div>

                    <div className="action">
                        <select name="autosave" value={this.props.app.state.autosave} onChange={this.props.app.update}>
                            <option value={0}>Off</option>
                            <option value={30000}>30 seconds</option>
                            <option value={60000}>1 minute</option>
                            <option value={300000}>5 minutes</option>
                            <option value={600000}>10 minutes</option>
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

                <NavLink to="/settings/profiles">
                    <button className="submit primary">Manage Profiles</button>
                </NavLink>
            </div>
        );
    }
}
