import React, { Component } from "react";
import { Form, Input } from "antd";

class AntdTest extends Component {
    

    render() {
        return (
            <div>
                <Form>
                    <Form.Item 
                        name="username"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default AntdTest;
