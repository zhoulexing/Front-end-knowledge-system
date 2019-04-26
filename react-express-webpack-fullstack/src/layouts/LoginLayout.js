import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import myImg from "images/user.jpg";
import { Button } from "antd";
import Test from "components/Test";

@connect()
export default class LoginLayout extends React.PureComponent {
    render() {
        const { dispatch } = this.props;
        return (
            <div>
                LoginLayout
                <Button type="primary" onClick={ () => { dispatch(push("/apps")) } }>go basicLayout</Button>
                <img src={ myImg }/>
                <Test />
            </div>
        )
    }
}