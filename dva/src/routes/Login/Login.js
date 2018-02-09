import React from "react";
import { connect } from "dva";
import { DatePicker } from "antd";

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class Login extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <DatePicker />
                    <br />
                    <MonthPicker placeholder="Select month" />
                    <br />
                    <RangePicker />
                    <br />
                    <WeekPicker placeholder="Select week" />
                </div>
            </div>
        )
    }
}

export default connect()(Login);
