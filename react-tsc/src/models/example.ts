import { Effect } from "@/store/index.d";
import { Reducer } from "redux";

export interface ExampleModelState {
    data: number[];
    count: number;
};

export interface ExampleModelType {
    namespace: "example",
    state: ExampleModelState;
    effects: {
        fetchData: Effect;
    },
    reducers: {
        setData: Reducer<ExampleModelState>;
        add: Reducer<ExampleModelState>;
    }
};

function getData(value: number[]) {
    return new Promise((resolve) => {
        resolve(value);
    });
}


const exampleModel: ExampleModelType = {
    namespace: "example",
    state: {
        data: [],
        count: 0,
    },
    effects: {
        *fetchData(_, { call, put }) {
            const data = yield call(getData([1, 2, 3]));
            yield put({
                type: "user/changeNotifyCount",
                payload: {
                    data,
                }
            });
        }
    },
    reducers: {
        setData(stata, { payload }) {
            return {
                ...stata,
                data:  payload.data,
            }
        },
        add(state, { payload }) {
            return {
                ...state,
                count: payload.count,
            }
        }
    }
}

export default exampleModel;