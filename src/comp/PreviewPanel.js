import React, {lazy, Suspense} from "react";
import { ToyhouseProfile } from "./preview/ToyhouseProfile";
import { applyClassesToHTML } from "../_general";
import { Loading } from "./Loading";

const CharacterProfileInner = lazy(() => import("./preview/CharacterProfileInner"));
const UserProfileInner = lazy(() => import("./preview/UserProfileInner"));


export class PreviewPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            state: "loading",
            currentTheme: this.props.app.state.theme
        };

		this.loadTheme = this.loadTheme.bind(this);
    }

    componentDidMount() {
        // render whatever's in the fields on mount
        this.loadTheme();


        // load fontawesome on mount
        window.setTimeout(() => {
            var newLink = document.createElement("link");
            newLink.rel = "stylesheet";
            newLink.type = "text/css";
            newLink.href = "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";

            document.getElementsByTagName("head")[0].appendChild(newLink);
        }, 1000);
    }

    componentDidUpdate(prevProps) {
        // update html in frame
        try {
            document.getElementById("preview-div").innerHTML = applyClassesToHTML(this.props.app.state.html, this.props.app.state.css, this.props.app.state.removeComments);
        }
        catch(err) {
            console.error(err);
        }


        // update theme if that changed at all
        if(this.state.currentTheme !== this.props.app.state.theme) {
            this.loadTheme();

            this.setState({currentTheme: this.props.app.state.theme});
        }
    }

    loadTheme() {
        // loads the current theme
        var oldLink = document.getElementsByTagName("link")[5];

        var newLink = document.createElement("link");
        newLink.rel = "stylesheet";
        newLink.type = "text/css";
        newLink.href = "./themes/" + this.props.app.state.theme + ".css";

        document.getElementsByTagName("head")[0].replaceChild(newLink, oldLink);
    }


    render() {

        // page
        var page;

        switch(this.props.app.state.pageLayout) {
            case "empty":
                // empty
                page = <div id="preview-div" />
                break;
            case "user":
                // user profile
                page = (
                    <Suspense fallback={<Loading />}>
                        <UserProfileInner app={this.props.app}>
                            <div id="preview-div" />
                        </UserProfileInner>
                    </Suspense>
                );

                break;
            case "character":
                // character profile
                page = (
                    <Suspense fallback={<Loading />}>
                        <CharacterProfileInner app={this.props.app}>
                            <div id="preview-div" />
                        </CharacterProfileInner>
                    </Suspense>
                );

                break;
            default:
                page = "";
        }


        return (
            <div 
                className={"panel preview " + this.props.app.state.theme}
                style={{
                    width: (100 - this.props.app.state.editorWidth) + "%",
                    left: this.props.app.state.editorWidth + "%"
                }}
            >
                <ToyhouseProfile activeProfile={this.props.app.state.activeProfile}>
                    {page}
                </ToyhouseProfile>
            </div>
        );
    }
}
