import React from "react";

export class SaveButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            state: "idle"
        };

		this.save = this.save.bind(this);
    }

    save() {
        // let's go girls
        this.setState({state: "loading"});

        this.props.app.overwriteSave(() => {
            this.setState({state: "idle"});
        },
        () => {
            this.setState({state: "idle"});
        });
    }


    render() {
        return (
            <button 
                className={this.props.className}
                onClick={this.save}
            >
                {(this.state.state === "loading" ? "..." : "Save to Profile")}
            </button>
        );
    }
}


SaveButton.defaultProps = {
    className: ""
};
