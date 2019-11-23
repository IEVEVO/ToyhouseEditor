import React from "react";

export class CSSBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="css-box">
                <textarea 
                    name="css"
                    placeholder="Enter your CSS code here"
                    value={this.props.app.css}
                    onChange={this.props.app.update}
                />
            </div>
        );
    }
}

CSSBox.defaultProps = {

};
