import React from "react";


export class ToyhouseProfile extends React.Component {
    render() {
        return (
            <div id="container" className="page-container page-container-user">
                <nav className="navbar navbar-toggleable-sm navbar-inverse header" data-topbar="" role="navigation" id="header">
                    <a 
                        className="navbar-brand" 
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://toyhou.se" 
                        style={{height: "40px", textAlign: "center", margin: "0 auto 0 auto"}}
                    >
                        TOYHOU.SE REPLICA - NAVIGATION BAR
                    </a>
                    
                </nav>
                <div className="hidden-md-up nav-mobile-menu">
                    <button className="btn btn-outline-secondary nav-mobile-menu-toggle" data-toggle="offcanvas" data-target="#">Menu </button>
                </div>
                <div id="main" className="clearfix container-fluid main-container full-sidebar">
                    <div className="row row-offcanvas row-offcanvas-left" data-sticky-wrap="">
                        <div className="col-md-3 col-lg-2 sidebar sidebar-offcanvas" id="sidebar">
                            <ul className="side-nav list-unstyled">
                                <li className="header">User</li>
                                <li>
                                    <span className="display-user">
                                        <a href="https://toyhou.se" rel="noopener noreferrer" target="_blank">
                                            <img alt="Icon" src="/img/icon.jpg" className="display-user-avatar" />
                                            <span className="display-user-username">User</span>
                                        </a>
                                    </span>
                                </li>
                                
                                <li className=" sidebar-li-bulletins">
                                    <a href="https://toyhou.se" rel="noopener noreferrer" target="_blank">Link</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-12 col-md-9 col-lg-10 content-main" id="content">
                            <div className="user-profile">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="profile-section profile-content-section user-content fr-view">
                                            {this.props.children}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="profile-section profile-characters-section">
                                                <div className="profile-characters">
                                                    <div className="profile-characters-header">
                                                        <h1 className="profile-characters-title">Recent Characters &amp; Designs</h1>
                                                        <hr />
                                                    </div>
                                                    <div className="profile-characters-wrapper card">
                                                        <div className="profile-characters-content card-block bg-faded">
                                                            <div className="gallery-row mini">
                                                                No recent characters or designs.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="profile-section profile-comments-section">
                                                <div className="profile-comments">
                                                    <div className="profile-comments-header">
                                                        <h1 className="profile-comments-title">Latest Comments</h1>
                                                        <hr />
                                                    </div>
                                                    <div className="comments">
                                                        No comments
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="footer" className="text-muted text-center p-3 footer" data-sticky-footer="">
                        <div>
                        <span className="mx-1">Toyhouse &copy; cyancrows</span> 
                        <span className="mx-1">This page adapted by iNet</span> 
                        <span className="mx-1">pls don't sue me</span></div>
                    </div>
                    <script src="th/site.js"></script> 
                </div>
        );
    }
}


ToyhouseProfile.defaultProps = {
    children: ""
};
