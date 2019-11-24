import React from "react";
import { ToyhouseProfile } from "./preview/ToyhouseProfile";
import { applyClassesToHTML } from "../_general";

export class PreviewPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // render whatever's in the fields on mount
        this.componentDidUpdate();
    }

    componentDidUpdate(prevProps) {
        // update html in frame
        document.getElementById("preview-div").innerHTML = applyClassesToHTML(this.props.app.state.html, this.props.app.state.css, this.props.app.state.removeComments);
    }


    render() {
        return (
            <div className={"panel preview " + this.props.app.state.theme}>
                <ToyhouseProfile app={this.props.app}>
                    <div
                        id="preview-div"
                    />
                </ToyhouseProfile>
                
            </div>
        );
    }
}

PreviewPanel.defaultProps = {

};
