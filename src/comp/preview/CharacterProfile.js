import React from "react";
import { ToyhouseSidebar } from "./ToyhouseSidebar";
import { ToyhouseFooter } from "./ToyhouseFooter";
import { CharacterProfileInner } from "./CharacterProfileInner";


export class CharacterProfile extends React.Component {
    render() {
        return (
            <div id="container" className="page-container page-container-user">
                <div className="hidden-md-up nav-mobile-menu">
                    <button className="btn btn-outline-secondary nav-mobile-menu-toggle" data-toggle="offcanvas" data-target="#">Menu </button>
                </div>
                <div id="main" className="clearfix container-fluid main-container full-sidebar">
                    <div className="row row-offcanvas row-offcanvas-left" data-sticky-wrap="">
                        <ToyhouseSidebar />

                        <CharacterProfileInner>
                            {this.props.children}
                        </CharacterProfileInner>
                    </div>
                </div>
                    
                <ToyhouseFooter />
            </div>
        );
    }
}


CharacterProfile.defaultProps = {
    children: ""
};
