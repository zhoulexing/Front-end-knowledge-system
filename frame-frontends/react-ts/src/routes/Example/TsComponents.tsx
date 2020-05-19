import React from "react";


interface ITestProps {}
interface ITestState {
    // name: string,
    // age: number,
}
export class Test extends React.Component<ITestProps, ITestState> {
    private inputRef = React.createRef<HTMLInputElement>();
    private divRef = React.createRef<HTMLDivElement>();
    private test1Ref = React.createRef<Test1>();

    constructor(props: ITestProps) {
        super(props);
        this.state = {
            name: "zlx",
            age: 28
        }
    }

    componentDidMount() {
        this.updateName("zlx");
        this.inputRef.current?.focus();
    }

    render() {
        return (
            <div>
                <input ref={this.inputRef} onChange={this.handleChange}/>
                <div ref={this.divRef}>123</div>
                <Test1 ref={this.test1Ref}/>
                <form onSubmit={this.handleSubmit}>
                    <input />
                </form>
            </div>
        )
    }

    private handleSubmit = (e: React.FormEvent<HTMLFontElement>) => {
        e.preventDefault();
    }

    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
    }

    private updateName(name: string) {
        this.setState({ name });
    }
}

interface ITest1Props {
    placeholder?: string,
    maxlength?: number,
}
// class既做属性又做类型
class Test1Props {
    public inputSetting?: ITest1Props = {
        maxlength: 20,
        placeholder: "请输入"    
    }
}
class Test1 extends React.Component<Test1Props> {
    public static defaultProps = new Test1Props();

    render() {
        const { inputSetting } = this.props;
        return (
            <div>
                <input maxLength={inputSetting!.maxlength} placeholder={inputSetting?.placeholder}/>
            </div>
        )
    }
}


interface ITest2Props {}
export const Test2: React.SFC<ITest2Props> = (props) => {
    return (
        <div>test2</div>
    )
}

interface ITest3Props {}
// React16.8引入了hooks，所以SFC即无状态组件不准确，加了React.FC
export const Test3: React.FC<ITest3Props> = (props) => {
    return (
        <div>test3</div>
    )
}