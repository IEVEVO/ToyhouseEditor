import React from "react";
import { ExportButton } from "../ExportButton";
import { fetchProfileById } from "../../db/themes";

export class ExportPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            state: "loading",
            name: "..."
        };

		//this.update = this.update.bind(this);
    }

    componentDidMount() {
        if(this.props.app.state.activeProfile === -1) {
            // no profile
            this.setState({name: "", state: "idle"});
        }

        
        fetchProfileById(this.props.app.state.activeProfile)
            .then(profile => {
                this.setState({
                    name: profile[0].name,
                    state: "idle"
                });
            })
            .catch(err => { 
                console.error(err); 
                this.setState({name: "", state: "idle"});
            });
    }


    render() {

        if(this.state.state === "loading") {
            return "Loading...";
        }


        return (
            <div className="export-page">
                <h1>Exporting {this.state.name}</h1>

                <div>
                    <ExportButton 
                        html={this.props.app.state.html} 
                        css={this.props.app.state.css} 
                    />
                </div>

            </div>
        );
    }
}
