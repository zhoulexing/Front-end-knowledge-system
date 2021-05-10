import { create } from 'dva-core';
import createLoading from 'dva-loading';
import { createLogger } from 'redux-logger';


export default function createApp(opt) {
    // opt.onAction = [createLogger()];

    const app = create(opt);
    app.use(createLoading());
    app.use({
        onError(err) {
            console.error(err);
        }
    });
    
    if(opt.models) {
        opt.models.forEach(model => app.model(model));
    }
    app.start();

    return app._store;
}