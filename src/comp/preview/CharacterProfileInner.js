import React from "react";


export class CharacterProfileInner extends React.Component {
    render() {
        return (
            <div className="col-sm-12 col-md-9 col-lg-10 content-main" id="content">
                <div className="character-profile">
                    <div className="row profile-header">

                        <div className="col-lg-6 col-12 profile-section profile-name-section">
                            <div className="img-thumbnail">
                                <img alt="Icon" src="/img/icon.jpg" className="profile-name-icon" />
                            </div>
                            <div className="profile-name-info">
                                <h1 className="display-4">Character name</h1>
                                <h2><span className="display-user"><a href="https://toyhou.se" rel="noopener noreferrer" target="_blank"><i className="fi-torso user-name-icon"></i>Creator</a></span></h2>
                            </div>
                        </div>

                        <div className="col-lg-6 col-12 profile-section profile-info-section">
                            <div className="card">
                                <div className="card-block bg-faded">
                                    <div className="profile-info-title hidden-lg-up">
                                        <h2>Info</h2>
                                        <hr />
                                    </div>
                                    <div className="profile-info-content row">
                                        <div className="profile-stats-content col-lg-8 col-md-6 col-12">
                                            <dl className="fields">
                                                <div className="row fields-field">
                                                    <dt className="field-title col-sm-4">
            Created
            </dt>
                                                    <dd className="field-value col-sm-8">
                                                        <abbr className="tooltipster datetime" title="16 Aug 2019, 1:02:31 am">1 day ago</abbr>
                                                    </dd>
                                                </div>
                                                <div className="row fields-field">
                                                    <dt className="field-title col-sm-4">
            Creator
            </dt>
                                                    <dd className="field-value col-sm-8">
                                                        <span className="display-user"><a href="https://toyhou.se" rel="noopener noreferrer" target="_blank"><i className="fi-torso user-name-icon"></i>Creator's name</a></span>
                                                    </dd>
                                                </div>
                                                <div className="row fields-field">
                                                    <dt className="field-title col-sm-4">
            Favorites
            </dt>
                                                    <dd className="field-value col-sm-8">
                                                        <a href="/4745769.vyrnwy/favorites" th-modal-trigger>2</a>
                                                    </dd>
                                                </div>
                                            </dl>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-12 profile-tags-content">
                                            <a href="https://toyhou.se" rel="noopener noreferrer" target="_blank" className="badge badge-primary badge-pill">tag</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="profile-section profile-content-section ">
                        <div className="profile-content-title">
                            <h2>Profile</h2>
                            <hr />
                        </div>

                        {this.props.children}
                    </div>

                    <div className="profile-section profile-gallery-section">
                        <div className="profile-gallery-title">
                            <h2>Recent Images<hr /></h2>
                        </div>
                        <div className="profile-gallery-content">
                            No images.
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}


CharacterProfileInner.defaultProps = {
    children: ""
};
