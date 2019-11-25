import React from "react";

export class Resizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            position: this.props.app.editorWidth - 5
        };

        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.start = this.start.bind(this);
        this.end = this.end.bind(this);
        this.reset = this.reset.bind(this);
    }

    convertToPercent(number) {
        // convert px to %
        var width = window.innerWidth;

        return Math.ceil((number / width) * 100);
    }

    handleMouseMove(e) {
        // get the position
        console.log();

        if(this.state.active) {
            this.setState({position: e.clientX });
        }
    }

    start() {
        this.setState({active: true});
    }

    end() {
        this.props.app.updateSize( this.convertToPercent(this.state.position) );
        this.setState({active: false});
    }

    reset() {
        this.props.app.updateSize( 40 );
        this.setState({position: 40});
    }


    render() {
        return (
            <div 
                className={"page-resizer " + (this.state.active ? "active" : "")}
                style={{
                    left: "calc(" + this.convertToPercent(this.state.position) + "% - 10px)"
                }}
                onMouseDown={this.start}
                onMouseUp={this.end}
                onMouseMove={this.handleMouseMove}
                onDoubleClick={this.reset}
            />
        );
    }
}
