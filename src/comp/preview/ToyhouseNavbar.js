import React from "react";
import {NavLink} from "react-router-dom";

export class ToyhouseNavbar extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <nav className="navbar navbar-toggleable-sm navbar-inverse header" data-topbar="" role="navigation" id="header">
                <NavLink to="/" className="navbar-brand" style={{height: "40px", textAlign: "center", margin: "0 auto 0 auto"}}>
                    TOYHOU.SE EDITOR - NAVIGATION BAR
                </NavLink>
            </nav>
        );
    }
}
