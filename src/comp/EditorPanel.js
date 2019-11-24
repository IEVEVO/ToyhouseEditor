import React from "react";
import {Route, NavLink} from "react-router-dom";
import { HTMLBox } from "./pages/HTMLBox";
import { CSSBox } from "./pages/CSSBox";
import { SettingsPage } from "./pages/SettingsPage";

export class EditorPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({open: !this.state.open});
    }


    render() {
        return (
            <div className={"panel editor " + (this.state.open ? "open" : "")}>
                <div className="the-navbar">
                    <NavLink to="/" exact>HTML</NavLink>
                    <NavLink to="/css">CSS</NavLink>
                    <NavLink to="/settings">Settings</NavLink>

                    <button onClick={this.toggle}>
                        {(this.state.open ? "<" : ">")}
                    </button>
                </div>

                <Route path="/" exact render={(props) => {
                    return <HTMLBox app={this.props.app} />
                }} />

                <Route path="/css" render={(props) => {
                    return <CSSBox app={this.props.app} />
                }} />

                <Route path="/settings" render={(props) => {
                    return <SettingsPage app={this.props.app} />
                }} />
            </div>
        );
    }
}
