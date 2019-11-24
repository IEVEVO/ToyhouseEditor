import React from "react";
import {Route, NavLink} from "react-router-dom";
import { HTMLBox } from "./pages/HTMLBox";
import { CSSBox } from "./pages/CSSBox";

export class EditorPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel editor">
                <div className="the-navbar">
                    <NavLink to="/" exact>HTML</NavLink>
                    <NavLink to="/css">CSS</NavLink>
                    <NavLink to="/settings">Settings</NavLink>
                </div>

                <Route path="/" exact render={(props) => {
                    return <HTMLBox app={this.props.app} />
                }} />

                <Route path="/css" render={(props) => {
                    return <CSSBox app={this.props.app} />
                }} />

                <Route path="/settings" render={(props) => {
                    return "// to do"
                }} />
            </div>
        );
    }
}
