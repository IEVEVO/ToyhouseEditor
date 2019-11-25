import React from "react";

export class ToyhouseSidebar extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div className="col-md-3 col-lg-2 sidebar sidebar-offcanvas" id="sidebar">
                <ul className="side-nav list-unstyled">
                    <li className="header">User</li>
                    <li>
                        <span className="display-user">
                            <a href="https://toyhou.se" rel="noopener noreferrer" target="_blank">
                                <img alt="Icon" src="/img/icon.jpg" className="display-user-avatar" />
                                <span className="display-user-username">User</span>
                            </a>
                        </span>
                    </li>
                    
                    <li className=" sidebar-li-bulletins">
                        <a href="https://toyhou.se" rel="noopener noreferrer" target="_blank">Link</a>
                    </li>
                </ul>
            </div>
        );
    }
}
