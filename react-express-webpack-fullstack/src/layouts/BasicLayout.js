import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import styles from "./BasicLayout.less";


class BasicLayout extends React.PureComponent {
    render() {
        const { dispatch } = this.props;
        return (
            <div>
                <div className={ styles.basic }>BasicLayout</div>
                <button onClick={ e => { dispatch(push("/login")) } }>go loginLayout</button>
                <button onClick={ e => { dispatch({ type: "INCREMENT_ASYNC" }) }}>test saga</button>
                <button onClick={ e => { dispatch({ type: "GET_DATA_ASYNC" }) } }>请求数据</button>
            </div>
        )
    }

    getData = () => {
        request("/api/demo/saveToMongo").then(result => {
            console.log(result);
        });
    }
}

export default connect()(BasicLayout);