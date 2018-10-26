import React from "react";
import { push } from "react-router-redux";

export default class LoginLayout extends React.PureComponent {
    render() {
        return (
            <div>
                LoginLayout
                <button onClick={ e => { push("/apps") } }>go basicLayout</button>
            </div>
        )
    }
}