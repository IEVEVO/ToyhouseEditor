import React from "react";
import { fetchProfileById } from "../db/themes";

export class SaveButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            state: "idle",
            profileName: ""
        };

		this.loadProfile = this.loadProfile.bind(this);
		this.save = this.save.bind(this);
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
        if(this.props.activeProfile === -1) {
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

    save() {
        // let's go girls
        this.setState({state: "loading"});

        this.props.app.overwriteSave(() => {
            window.setTimeout(() => {
                this.setState({state: "idle"});
            }, 500);

        },
        () => {
            this.setState({state: "idle"});
        });
    }


    render() {
        return (
            <button 
                className={this.props.className + " " + (this.state.state === "loading" ? "disabled" : "")}
                onClick={this.save}
            >
                Save to {(this.state.profileName === "" ? "Profile" : this.state.profileName)}
            </button>
        );
    }
}


SaveButton.defaultProps = {
    className: "",
    activeProfile: -1
};
