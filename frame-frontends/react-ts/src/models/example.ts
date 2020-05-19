import { Effect } from "@/store/common";
import { AnyAction } from "redux";

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
        setData: (state: ExampleModelState, _: AnyAction) => void;
        add: (state: ExampleModelState, _: AnyAction) => void;
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
        *fetchData({ payload }, { call, put }) {
            const data = yield call(getData, payload);
            yield put({
                type: "example/setData",
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