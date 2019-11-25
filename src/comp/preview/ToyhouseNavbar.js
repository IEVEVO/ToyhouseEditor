import React from "react";

export class ToyhouseNavbar extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <nav className="navbar navbar-toggleable-sm navbar-inverse header" data-topbar="" role="navigation" id="header">
                <a 
                    className="navbar-brand" 
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://toyhou.se" 
                    style={{height: "40px", textAlign: "center", margin: "0 auto 0 auto"}}
                >
                    TOYHOU.SE REPLICA - NAVIGATION BAR
                </a>
                
            </nav>
        );
    }
}
