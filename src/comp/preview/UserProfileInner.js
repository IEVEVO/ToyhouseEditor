import React from "react";

export class UserProfileInner extends React.Component {
    render() {
        
        return (
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
        );
    }
}

UserProfileInner.defaultProps = {
    children: ""
};
