import React from "react";

export class HTMLBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="html-box">
                <textarea 
                    name="html"
                    placeholder="Enter your HTML code here"
                    value={this.props.app.html}
                    onChange={this.props.app.update}
                />
            </div>
        );
    }
}

HTMLBox.defaultProps = {

};
