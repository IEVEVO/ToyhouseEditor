import React from "react";

export class PreviewPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        // update frame
        var frame = document.getElementById("preview-iframe"),
            doc = frame.contentDocument || frame.contentWindow.document;
        
        doc.body.innerHTML = this.props.app.state.html;
    }


    render() {
        return (
            <div className="panel preview">
                

                <iframe
                    src=""
                    id="preview-iframe"
                    frameBorder="0"
                />
            </div>
        );
    }
}

PreviewPanel.defaultProps = {

};
