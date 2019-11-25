import React from "react";

export class ToyhouseFooter extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div id="footer" className="text-muted text-center p-3 footer" data-sticky-footer="">
                <div>
                <span className="mx-1">Toyhouse &copy; cyancrows</span> 
                <span className="mx-1">This page adapted by iNet</span> 
                <span className="mx-1">pls don't sue me</span></div>
            </div>
        );
    }
}
