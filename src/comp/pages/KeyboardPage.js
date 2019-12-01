import React from "react";
import {NavLink} from "react-router-dom";

export class KeyboardPage extends React.Component {
    render() {
        return (
            <div className="about-page">
                <h1>Keyboard Controls</h1>
                
                <ul>
                    <li><code>CTRL + SHIFT + S</code> Update preview</li>
                    <li><code>CTRL + SHIFT + S</code> Update preview and save profile</li>
                    <li><code>CTRL + ALT + SHIFT + N</code> New blank profile</li>
                </ul>

                <NavLink to="/settings">
                    <button className="primary">Back to Settings</button>
                </NavLink>
            </div>
        );
    }
}
