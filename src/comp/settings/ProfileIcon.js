import React from "react";
import { stringifyDate } from "../../_general";

export class ProfileIcon extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            state: "idle",
            profiles: [],
            name: this.props.data.name
        };

		this.rename = this.rename.bind(this);
		this.load = this.load.bind(this);
		this.delete = this.delete.bind(this);
    }

    rename() {
        var name = window.prompt("Edit name", this.state.name);

        if(!name || name === null || name === "") {
            return;
        }


        this.props.rename(this.props.data.id, name, () => {
            this.setState({name: name});
        }, () => {
            window.alert("Error updating name");
        });
    }

    load() {
        // let's go girls
        this.props.load(this.props.data.id);
    }

    delete() {
        // let's go girls
        if( window.confirm("Delete profile?") ) {
            this.props.delete(this.props.data.id);
        }
    }


    render() {
        return (
            <div 
                className={"profile-icon " + (this.props.active ? "active" : "")}
            >
                <div>
                    <span className="title" onClick={this.rename}>{this.state.name}</span>
                    <span className="date">{stringifyDate(this.props.data.date)}</span>
                </div>

                <div className="actions-bar">
                    {
                        !this.props.active ?
                        <button onClick={this.load}>Load</button> : 
                        <button className="danger" onClick={this.delete}>Delete</button>
                    }
                </div>
            </div>
        );
    }
}


ProfileIcon.defaultProps = {
    data: {

    },
    active: false
};
