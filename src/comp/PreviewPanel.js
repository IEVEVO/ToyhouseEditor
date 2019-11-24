import React from "react";
import { ToyhouseProfile } from "./preview/ToyhouseProfile";
import { applyClassesToHTML } from "../_general";

export class PreviewPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            frameHeight: 200
        };
    }

    componentDidMount() {
        // render whatever's in the fields on mount
        this.componentDidUpdate();
    }

    componentDidUpdate(prevProps) {
        // update html in frame
        var frame = document.getElementById("preview-iframe"),
            doc = frame.contentDocument || frame.contentWindow.document;
        
        doc.body.innerHTML = applyClassesToHTML(this.props.app.state.html, this.props.app.state.css, this.props.app.state.removeComments);

        // determine height
        if(prevProps !== undefined && (prevProps.app.state.html !== this.props.app.state.html)) {
            this.setState({
                frameHeight: doc.body.scrollHeight
            });
        }
    }


    render() {
        return (
            <div className={"panel preview " + this.props.app.state.theme}>
                <ToyhouseProfile app={this.props.app}>
                    <iframe
                        title="Profile"
                        src=""
                        id="preview-iframe"
                        style={{
                            height: this.state.frameHeight + "px"
                        }}
                        frameBorder="0"
                    />
                </ToyhouseProfile>
                
            </div>
        );
    }
}

PreviewPanel.defaultProps = {

};
