import React from "react";

export class Loading extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div className="loading-icon">
                <img src="/img/loading.gif" alt="Loading ..." width="64" />
            </div>
        );
    }
}
