import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

class BasicLayout extends React.PureComponent {
    render() {
        const { dispatch } = this.props;
        return (
            <div>
                BasicLayout
                <button onClick={ e => { dispatch(push("/login")) } }>go loginLayout</button>
            </div>
        )
    }
}

export default connect()(BasicLayout);