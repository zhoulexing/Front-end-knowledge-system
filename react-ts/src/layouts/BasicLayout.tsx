import * as React from 'react';

export namespace BasicLayout {
    export interface Props {
        name: string;
        enthusiasmLevel?: number;
    }
    export interface State {
        loading: boolean;
    }
}


class BasicLayout extends React.Component<BasicLayout.Props, BasicLayout.State> {
    name: string;

    constructor(props: BasicLayout.Props, context?: any) {
        super(props, context);
        this.state = {
            loading: false,
        }
        this.name = "zlx";
    }


    render() {
        const { name, enthusiasmLevel = 1 } = this.props;

        if (enthusiasmLevel <= 0) {
            throw new Error('You could be a little more enthusiastic. :D');
        }

        return (
            <div className="hello">
                <div className="greeting">
                    Hello {name + getExclamationMarks(enthusiasmLevel)}
                </div>
            </div>
        );
    }
}
  
function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}

export default BasicLayout;