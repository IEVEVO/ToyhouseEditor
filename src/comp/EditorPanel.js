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
                <div className="navbar">
                    <NavLink to="/" exact>HTML</NavLink>
                    <NavLink to="/css">CSS</NavLink>
                </div>

                <Route path="/" exact render={(props) => {
                    return <HTMLBox app={this.props.app} />
                }} />

                <Route path="/css" render={(props) => {
                    return <CSSBox app={this.props.app} />
                }} />
            </div>
        );
    }
}

EditorPanel.defaultProps = {

};
