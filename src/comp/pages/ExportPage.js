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

                <p>
                    Scroll down for a guide
                </p>

                <div>
                    <ExportButton 
                        html={this.props.app.state.html} 
                        css={this.props.app.state.css} 
                    />
                </div>

                <br /><br />
                <div className="divider"></div>

                <ul>
                    <li>Classes should be defined in a <code>className</code> attribute, rather than a <code>class</code> attribute. The regular <code>class</code>es will be preserved, while the <code>className</code>s will be converted.</li>

                    <li>The <code>className</code> attribute must appear as the first attribute in the tag.<br /> (eg. <code>&lt;button className="custom1" ...&gt;</code>).</li>

                    <li>You can specify multiple classes in a tag, leaving a space between each one. Regular naming rules still apply (no spaces).</li>
                </ul>

                <ul>
                    <li>Currently, only one CSS class is allowed per set of attributes. In other words, this will <b>NOT</b> work: <code>.class1, .class2 {"{ color: white; }"}</code> </li>
                </ul>

                <div className="divider"></div>

                <p>
                    Toyhouse doesn't support CSS classes in profile pages natively, and this compiled with the difficult editor can make it far more daunting to make themes and profile pages of your own, even if you can understand HTML.<br /><br />

                    This tool allows you to use CSS classes in your HTML, and the box above will convert those to  inline <code>style</code> attributes so you can use it on Toyhouse.<br /><br />

                    Be sure to follow the special rules above, though, as there are some fiddly bits.
                </p>
            </div>
        );
    }
}
