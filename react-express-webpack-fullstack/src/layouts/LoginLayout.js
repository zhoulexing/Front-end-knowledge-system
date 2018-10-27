import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";


class LoginLayout extends React.PureComponent {
    render() {
        const { dispatch, location } = this.props;
        console.log(location);
        return (
            <div>
                LoginLayout
                <button onClick={ e => { dispatch(push("/apps")) } }>go basicLayout</button>
            </div>
        )
    }
}

export default connect()(LoginLayout);