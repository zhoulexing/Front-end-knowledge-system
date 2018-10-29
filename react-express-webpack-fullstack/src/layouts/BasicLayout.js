import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import styles from "./BasicLayout.less";
import Test from "components/Test";

class BasicLayout extends React.PureComponent {
    render() {
        const { dispatch } = this.props;
        return (
            <div>
                <div className={ styles.basic }>BasicLayout</div>
                <button onClick={ e => { dispatch(push("/login")) } }>go loginLayout</button>
                <button onClick={ e => { dispatch({ type: "INCREMENT_ASYNC" }) }}>test saga</button>
                <Test />
            </div>
        )
    }
}

export default connect()(BasicLayout);