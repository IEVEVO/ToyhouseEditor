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

    componentDidUpdate(prevProps) {
        // update html in frame
        var frame = document.getElementById("preview-iframe"),
            doc = frame.contentDocument || frame.contentWindow.document;
        
        doc.body.innerHTML = applyClassesToHTML(this.props.app.state.html, this.props.app.state.css);

        // determine height
        if(prevProps.app.state.html !== this.props.app.state.html) {
            this.setState({
                frameHeight: doc.body.scrollHeight
            });
        }
    }


    render() {
        return (
            <div className="panel preview">
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
