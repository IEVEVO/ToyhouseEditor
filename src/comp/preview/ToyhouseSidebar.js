import React from "react";
import {NavLink} from "react-router-dom";
import { fetchProfileById } from "../../db/themes";
import { DefaultAvatar } from "../DefaultAvatar";

export class ToyhouseSidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profileName: "User"
        };

		this.loadProfile = this.loadProfile.bind(this);
    }

    componentDidMount() {
        // get the name of the active profile
        this.loadProfile();
    }

    componentDidUpdate(prevProps) {
        // update the name if the active profile changes
        if(prevProps.activeProfile !== this.props.activeProfile) {
            this.loadProfile();
        }
    }


    loadProfile() {
        // get the name of the active profile
        if(this.props.activeProfile === undefined || this.props.activeProfile === -1) {
            this.setState({
                profileName: "User"
            });

            return;
        }

        fetchProfileById(this.props.activeProfile)
            .then(profile => {
                this.setState({
                    profileName: profile[0].name
                });
            })
            .catch(err => { console.error(err); });

    }

    render() {
        return (
            <div className="col-md-3 col-lg-2 sidebar sidebar-offcanvas" id="sidebar">
                <ul className="side-nav list-unstyled">
                    <li className="header">User</li>
                    <li>
                        <span className="display-user">
                            <NavLink to="/settings/profiles">
                                <DefaultAvatar alt="Icon" className="display-user-avatar" />
                                <span className="display-user-username">{this.state.profileName}</span>
                            </NavLink>
                        </span>
                    </li>
                    
                    <li className="sidebar-li-bulletins">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/html">HTML</NavLink>
                        <NavLink to="/css">CSS</NavLink>
                        <NavLink to="/export">Export</NavLink>
                        <NavLink to="/settings">Settings</NavLink>
                        <NavLink to="/settings/profiles">Profiles</NavLink>
                    </li>
                    
                    <li className="header">Links</li>
                    <li>
                        <a href="https://toyhou.se/~forums/16.htmlcss-graphics" rel="noopener noreferrer" target="_blank">Find themes</a>
                        <a href="https://acroma.rf.gd" rel="noopener noreferrer" target="_blank">Developer</a>
                    </li>
                </ul>
            </div>
        );
    }
}


ToyhouseSidebar.defaultProps = {
    activeProfile: -1
};
