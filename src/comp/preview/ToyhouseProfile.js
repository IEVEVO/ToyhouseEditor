import React from "react";
import { ToyhouseSidebar } from "./ToyhouseSidebar";
import { ToyhouseFooter } from "./ToyhouseFooter";
import { ToyhouseNavbar } from "./ToyhouseNavbar";


export class ToyhouseProfile extends React.Component {
    render() {
        return (
            <div id="container" className="page-container page-container-user">
                <ToyhouseNavbar />

                <div id="main" className="clearfix container-fluid main-container full-sidebar">
                    <div className="row row-offcanvas row-offcanvas-left" data-sticky-wrap="">
                        <ToyhouseSidebar />

                        {this.props.children}
                    </div>
                </div>
                    
                <ToyhouseFooter />
            </div>
        );
    }
}


ToyhouseProfile.defaultProps = {
    children: ""
};
