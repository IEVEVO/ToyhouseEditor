import React from "react";

export class DefaultAvatar extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return <img src="./img/icon.jpg" alt={this.props.alt} className={"default-avatar " + this.props.className} />
    }
}

DefaultAvatar.defaultProps = {
    className: "",
    alt: "Avatar"
};
