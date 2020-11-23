import React from "react";
import { RecoilRoot } from 'recoil';
import "./app.less";
import "./app.scss";

interface AppProps {

}

interface AppStates {}

class App extends React.Component<AppProps, AppStates> {
    globalData = {
		env: "test"
	};

    componentDidMount() {
	}

    componentDidShow(options) {
	}

    componentDidHide() {}

    componentDidCatchError() {}

    render() {
        return (
            <RecoilRoot>
                {this.props.children}
            </RecoilRoot>
        );
    }
}

// const App = (props) => {
//     return (
//         <RecoilRoot>
//             {props.children}   
//         </RecoilRoot>
//     )
// }

export default App;
