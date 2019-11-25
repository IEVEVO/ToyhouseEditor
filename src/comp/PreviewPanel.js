import React from "react";
import { ToyhouseProfile } from "./preview/ToyhouseProfile";
import { applyClassesToHTML } from "../_general";
import { CharacterProfileInner } from "./preview/CharacterProfileInner";
import { UserProfileInner } from "./preview/UserProfileInner";

export class PreviewPanel extends React.Component {
    componentDidMount() {
        // render whatever's in the fields on mount
        this.componentDidUpdate();
    }

    componentDidUpdate(prevProps) {
        // update html in frame
        document.getElementById("preview-div").innerHTML = applyClassesToHTML(this.props.app.state.html, this.props.app.state.css, this.props.app.state.removeComments);
    }


    render() {

        // page
        var page;

        switch(this.props.app.state.pageLayout) {
            case "user":
                // user profile
                page = (
                    <UserProfileInner app={this.props.app}>
                        <div id="preview-div" />
                    </UserProfileInner>
                );

                break;
            case "character":
                // character profile
                page = (
                    <CharacterProfileInner app={this.props.app}>
                        <div id="preview-div" />
                    </CharacterProfileInner>
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
                <ToyhouseProfile>
                    {page}
                </ToyhouseProfile>
            </div>
        );
    }
}
