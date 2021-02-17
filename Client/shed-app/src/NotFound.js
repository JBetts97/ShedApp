import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotFound = props => {
    let location = useLocation();
    return (
        <div>
            <div class="App-header">
                Header Data
            </div>
            <div class="App"><h1>Page not found!</h1></div>
        </div>
    );
};

export default NotFound;