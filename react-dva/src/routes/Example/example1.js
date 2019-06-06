import React from "react";
import { connect } from "dva";
import { Button } from "antd";
import { FormattedMessage } from "react-intl";
import { mappings } from "../../i18n";

@connect()
export default class Example1 extends React.Component {
    render() {
        const { loading } = this.props;
        return (
            <div>
                <FormattedMessage id="example.test"/>
                <Button type="primary" onClick={ this.setTheme }>换肤</Button>
                <Button type="primary" onClick={ () => this.setLocale(mappings.ZH_CN) }>切换中文</Button>
                <Button type="primary" onClick={ () => this.setLocale(mappings.EN_US) }>切换英文</Button>
            </div>
        )
    }

    setTheme = () => {
        const { dispatch } = this.props;
        dispatch({ type: "setting/setTheme", payload: "#000" });
    }

    setLocale = (locale) => {
        const { dispatch } = this.props;
        dispatch({ type: "setting/setLocale", payload: locale });
    }
}