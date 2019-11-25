import React from "react";
import {Route, NavLink} from "react-router-dom";
import { HTMLBox } from "./pages/HTMLBox";
import { SettingsPage } from "./pages/SettingsPage";
import { ExportPage } from "./pages/ExportPage";

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
            <div 
                className={"panel editor " + (this.state.open ? "open" : "")}
                style={{
                    width: this.props.app.state.editorWidth + "%"
                }}
            >
                <div className="the-navbar">
                    <NavLink className="small" to="/" exact>HTML</NavLink>
                    <NavLink className="small" to="/css">CSS</NavLink>
                    <NavLink to="/export">Export</NavLink>
                    <NavLink to="/settings">Settings</NavLink>

                    <button onClick={this.toggle}>
                        {(this.state.open ? "<" : ">")}
                    </button>
                </div>


                <Route path="/" exact render={(props) => {
                    return <HTMLBox app={this.props.app} language="html" />
                }} />

                <Route path="/css" render={(props) => {
                    return <HTMLBox app={this.props.app} language="css" />
                }} />

                <Route path="/settings" render={(props) => {
                    return <SettingsPage app={this.props.app} />
                }} />

                <Route path="/export" render={(props) => {
                    return <ExportPage app={this.props.app} />
                }} />
            </div>
        );
    }
}
