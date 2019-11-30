import React from "react";
import {NavLink} from "react-router-dom";

export class AboutPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

		//this.update = this.update.bind(this);
    }

    render() {

        return (
            <div className="export-page">
                <h1>Toyhouse Editor</h1>
                
                <p>
                    Toyhouse doesn't support CSS classes in profile pages natively, and this compiled with the difficult editor can make it far more daunting to make themes and profile pages of your own, even if you can understand HTML.<br /><br />

                    This tool allows you to use CSS classes in your HTML, and the box above will convert those to  inline <code>style</code> attributes so you can use it on Toyhouse.<br /><br />

                    Be sure to follow the special rules <NavLink to="/export">here</NavLink>, though, as there are some fiddly bits.
                </p>


                <NavLink to="/settings/profiles">
                    <button className="primary">Manage Profiles</button>
                </NavLink>
            </div>
        );
    }
}
