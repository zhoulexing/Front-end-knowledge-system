import React, { 
    useState, 
    useEffect, 
    useContext, 
    useRef, 
    useReducer, 
    useMemo, 
    useCallback,
    useLayoutEffect,
} from 'react';


function Hocks() {
    return (
        <>
            <h4>UseState</h4>
            <UseState />
            <hr/>

            <h4>UseEffect</h4>
            <UseEffect />
            <hr/>

            <h4>UseLayoutEffect</h4>
            <UseLayoutEffect />
            <hr/>

            <h4>UseRef</h4>
            <UseRef />
            <hr/>

            <h4>UseReducer</h4>
            <UseReducer />
            <hr/>

            <h4>UseMemo</h4>
            <UseMemo />
            <hr/>

            <h4>UseCallback</h4>
            <UseCallback />
            <hr/>
            
            <h4>UseCallback</h4>
            <UseContext />
            <hr/>

            <h4>UseCustom</h4>
            <UseCustom />
            <hr/>
            
        </>
    )
}

/* useState 类似于setState*/
function UseState() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => { setCount(count + 1) }}>click me</button>
        </div>
    )
}

/* useEffect 类似于setState中的回掉 */
function UseEffect() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if(count ===3 ) {
            alert(count);
        }
    }, [count]);
    return (
        <div>
            <p>when count equal 3 alert count</p>
            <button onClick={() => { setCount(count + 1) }}>increment</button>
            <button onClick={() => { setCount(count - 1) }}>decrement</button>
        </div>
    )
}

/* UseLayoutEffect 类似于DidMount, DidUpdate, UnMount, 所有dom变更之后同步调用effect*/
function UseLayoutEffect() {
    const [count, setCount] = useState(0);
    useLayoutEffect(() => {
        if(count ===3 ) {
            alert(count);
        }
    }, [count]);
    return (
        <div>
            <p>when count equal 3 alert count</p>
            <button onClick={() => { setCount(count + 1) }}>increment</button>
            <button onClick={() => { setCount(count - 1) }}>decrement</button>
        </div>
    )
}

/* useRef */
function UseRef() {
    const inputEl = useRef(null);
    const onButtonClick = () => {
        inputEl.current.focus();
    };
    return (
        <div>
            <input ref={inputEl} type='text' />
            <button onClick={onButtonClick}>Focus the Input</button>
        </div>
    );
}

/* useReducer 类似于redux*/
function init(initialState) {
    return { count: initialState };
}
const initialState = 2;
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
}
function UseReducer() {
    const [state, dispatch] = useReducer(reducer, initialState, init);
    return (
        <>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </>
    )
}

/* useMemo */
function sqrt(arg) {
    if (!sqrt.cache) {
        sqrt.cache = {};
    }
    if (!sqrt.cache[arg]) {
        return sqrt.cache[arg] = Math.sqrt(arg);
    }
    return sqrt.cache[arg];
}
function memoize(fn) {
    return function () {
        const args = [].slice.call(arguments);
        fn.cache = fn.cache || {};
        return fn.cache[args] ? fn.cache[args] : (fn.cache[args] = fn.apply(this, args));
    }
}
function UseMemo() {
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');

    const expensive = useMemo(() => {
        console.log('compute');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) {
            sum += i;
        }
        return sum;
    }, [count]);

    return (
        <div>
            <h4>{count}-{val}-{expensive}</h4>
            <div>
                <button onClick={() => setCount(count + 1)}>+c1</button>
                <input value={val} onChange={event => setValue(event.target.value)} />
            </div>
        </div>
    );
}

/* useCallback */
function UseCallback() {
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');

    const callback = useCallback(() => {
        console.log('callback');
    }, [count]);

    return (
        <div>
            <h4>{count}</h4>
            <Child callback={callback}/>
            <div>
                <button onClick={() => setCount(count + 1)}>+c1</button>
                <input value={val} onChange={event => setValue(event.target.value)} />
            </div>
        </div>
    );
}

function Child({ callback }) {
    const [count, setCount] = useState(() => callback());
    useEffect(() => {
        setCount(callback());
    }, [callback]);
    return <div>
        {count}
    </div>
}

/* UseContext */
const MyContext = React.createContext();
function UseContext() {
    return (
        <>
            <MyContext.Provider value={{ name: 'Hello World' }}>
                <ChildPage />
            </MyContext.Provider>
        </>
    );
}

function ChildPage() {
    return <p>{ useContext(MyContext).name }</p>;
}

/* UseCustom */
function getUseCustom(getData, _params = {}) {
    const [params, setParams] = useState({ current: 1, pagesize: 10, ..._params });
    const [total, setTotal] = useState(0);    
    const [loading, setLoad] = useState(false);    
    const [data, setData] = useState('');    
    useEffect(() => {
        setLoad(true);
        getData(params).then(res => {
            setLoad(false);
            setTotal(total + 1);
            setData(res.name);
        });
    }, [params]);

    const changePage = useCallback((info) => {
        setParams({ ...info });
    }, [params]);
    return { params, total, data, loading, changePage };
}
function getData(params) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(params);
        }, 500);
    });
}
function UseCustom() {
    const { params, total, data, changePage } = getUseCustom(getData, { current: 1, name: 'zlx1' });

    function handleParams() {
        params.current += 1;
        params.name += params.current;
        changePage(params);
    }

    return (
        <>
            <p>current: {params.current} | total: {total} | data: {data}</p>
            <button onClick={() => handleParams()}>change params</button>
        </>
    );
}





/* render props */
function Cat(props) {
    return 'I am cat, ' + props.target;
}
class DataProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            target: 'Zac'
        };
    }

    render() {
        return (
            <div>
                {this.props.render(this.state)}
            </div>
        )
    }
}

/* HOC */
const withUser = WrappedComponent => {
    const user = sessionStorage.getItem('user');
    return props => <WrappedComponent user={user} {...props} />
}
const UserPage = props => (
    <div>
        <p>My name is {props.user}</p>
    </div>
)
withUser(UserPage);

export default Hocks;