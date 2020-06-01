import React from "react";

interface ITestProps {}
interface ITestState {
    // name: string,
    // age: number,
}
export class Test extends React.Component<ITestProps, ITestState> {
    private inputRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

    private divRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

    private test1Ref: React.RefObject<Test1> = React.createRef<Test1>();

    constructor(props: ITestProps) {
      super(props);
      this.state = {
        name: "zlx",
        age: 28,
      };
    }

    componentDidMount() {
      this.updateName("zlx");
        this.inputRef.current?.focus();
    }

    render() {
      return (
        <div>
          <input ref={this.inputRef} onChange={this.handleChange} />
          <div ref={this.divRef}>123</div>
          <Test1 ref={this.test1Ref} />
          <form onSubmit={this.handleSubmit}>
            <input />
          </form>
        </div>
      );
    }

    private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    };

    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
    };

    private updateName(name: string) {
      this.setState({ name });
    }
}

interface Test1SettingProps {
    placeholder?: string;
    maxlength?: number;
}
// class既做属性又做类型
class Test1Props {
    public inputSetting?: Test1SettingProps = {
      maxlength: 20,
      placeholder: "请输入",
    };
}
class Test1 extends React.Component<Test1Props> {
    public static defaultProps = new Test1Props();

    render() {
      const { inputSetting } = this.props;
      return (
        <div>
          <input
            maxLength={inputSetting!.maxlength}
            placeholder={inputSetting?.placeholder}
          />
        </div>
      );
    }
}

const Test2SettingProps = {
  inputSetting: {
    maxlength: 20,
    placeholder: "请输入",
  },
};
// Partial将属性变为可选的
type ITest2Props = Partial<typeof Test2SettingProps>;
const createPropsGetter = <DP extends object>(defaultProps: DP) => <P extends Partial<DP>>(props: P) => {
        // type Omit<P, keyof DP> = Pick<P, Exclude<keyof P, keyof DP>>
        type PropsExcludingDefaults = Omit<P, keyof DP>;
        type RecomposedProps = DP & PropsExcludingDefaults;
        return (props as any) as RecomposedProps;
};
const getProps = createPropsGetter(Test2SettingProps);
export class Test2 extends React.Component<ITest2Props> {
    public static defaultProps = Test2SettingProps;

    render() {
      const { inputSetting } = getProps(this.props);
      return (
        <div>
          <input
            type="text"
            maxLength={inputSetting.maxlength}
            placeholder={inputSetting.placeholder}
          />
        </div>
      );
    }
}

interface ITest3Props {}
export const Test3: React.SFC<ITest3Props> = (props) => <div>Test3</div>;

interface ITest4Props {}
// React16.8引入了hooks，所以SFC即无状态组件不准确，加了React.FC
export const Test4: React.FC<ITest4Props> = (props) => <div>Test4</div>;

const test5HocProps = {
  inputSetting: {
    maxlength: 30,
    placeholder: "请输入待办事项",
  },
};
type Test5InjectProps = Partial<typeof test5HocProps>;
export const test5Hoc = <P extends Test5InjectProps>(
  WrappedComponent: React.ComponentType<P>, // React.ComponentType<P> = React.FunctionComponent<P> | React.ClassComponent<P>
) => {
    type Props = Omit<P, keyof Test5InjectProps>;

    class WithToggleable extends React.Component<Props> {
        public static readonly WrappedComponent = WrappedComponent;

        public render() {
          return (
            <WrappedComponent
              inputSetting={test5HocProps}
              {...(this.props as P)}
            />
          );
        }
    }

    return WithToggleable;
};
