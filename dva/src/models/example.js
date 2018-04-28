import { getTblList } from "../services/example";

export default {
    
    namespace: 'example',
    
    state: {
        tblList: {} // 表格数据
    },
    
    effects: {
        *getTblList({ payload }, { call, put }) {  // 获取表格清单
            const response = yield call(getTblList, payload);
            console.log(response);
            yield put({
                type: "setTblList",
                payload: response
            });
        },
    },
    
    reducers: {
        setTblList(state, action) {
            return {
                ...state,
                tblList: action.payload
            }
        }
    },
    
};
