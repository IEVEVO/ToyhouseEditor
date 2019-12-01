import React from "react";
import { fetchAll } from "../../db/themes";
import { ProfileIcon } from "./ProfileIcon";
import { SaveButton } from "../SaveButton";
import { Loading } from "../Loading";

export class ProfileSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            state: "loading",
            profiles: []
        };

		this.load = this.load.bind(this);
		this.newProfile = this.newProfile.bind(this);
		this.deleteProfile = this.deleteProfile.bind(this);
    }

    componentDidMount() {
        this.load();
    }

    load() {
        // fetch
        this.setState({state: "loading"});
        
        fetchAll()
            .then(profiles => {
                // profiles
                this.setState({profiles: profiles, state: "idle"});
            })
            .catch(err => {
                this.setState({state: "idle"});
                console.error(err);
            });

    }

    newProfile() {
        this.props.app.newSave(() => {
            this.load();
        }, () => {} );
    }

    deleteProfile(index) {
        this.props.app.deleteSave(index, () => {
            this.load();
        }, () => {} );
    }


    render() {
        return (
            <div className="profile-selector">
                <h1>Profiles</h1>

                <div className="profiles-container">
                    {
                        this.state.profiles.map((item, i) => {
                            return (
                                <ProfileIcon  
                                    load={this.props.app.loadSave}
                                    rename={this.props.app.renameSave}
                                    delete={this.deleteProfile}
                                    data={item}
                                    active={(this.props.app.state.activeProfile === item.id)}
                                    index={i} key={i}
                                />
                            );
                        })
                    }

                    {
                        this.state.state === "loading" ? <Loading /> : 
                        (this.state.profiles.length === 0 ? "No profiles" : "")
                    }

                    {
                        this.state.state === "loading" ? "" :
                        <button className="submit success" onClick={this.newProfile}>New Profile</button>
                    }

                    <SaveButton app={this.props.app} activeProfile={this.props.app.state.activeProfile} className="submit" />
                </div>
            </div>
        );
    }
}


ProfileSelector.defaultProps = {
    className: ""
};
