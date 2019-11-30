import React from "react";
import {Route, NavLink} from "react-router-dom";
import { HTMLBox } from "./pages/HTMLBox";
import { SettingsPage } from "./pages/SettingsPage";
import { ExportPage } from "./pages/ExportPage";
import { AboutPage } from "./pages/AboutPage";
import { ProfileSelector } from "./settings/ProfileSelector";

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

        // if first time loading
        if(this.props.app.state.state === "loading") {
            return "Loading ...";
        }


        return (
            <div 
                className={"panel editor " + (this.state.open ? "open" : "")}
                style={{
                    width: this.props.app.state.editorWidth + "%"
                }}
            >
                <div className="the-navbar">
                    <NavLink className="small" to="/html">HTML</NavLink>
                    <NavLink className="small" to="/css">CSS</NavLink>
                    <NavLink to="/export">Export</NavLink>
                    <NavLink to="/settings">Settings</NavLink>

                    <button onClick={this.toggle}>
                        {(this.state.open ? "<" : ">")}
                    </button>
                </div>


                <Route path="/" exact component={AboutPage} />

                <Route path="/html" render={(props) => {
                    return <HTMLBox app={this.props.app} language="html" />
                }} />

                <Route path="/css" render={(props) => {
                    return <HTMLBox app={this.props.app} language="css" />
                }} />

                <Route path="/export" render={(props) => {
                    return <ExportPage app={this.props.app} />
                }} />

                <Route path="/settings" exact render={(props) => {
                    return <SettingsPage app={this.props.app} />
                }} />

                <Route path="/settings/profiles" render={(props) => {
                    return <ProfileSelector app={this.props.app} />
                }} />
            </div>
        );
    }
}
