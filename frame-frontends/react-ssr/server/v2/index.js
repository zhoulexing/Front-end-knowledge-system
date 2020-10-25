import Koa from "koa2";
import koaStatic from "koa-static";
import reactSsr from './ssr';

const app = new Koa();

app.use(koaStatic('./react-ssr/dist/v2/static'));
app.use(reactSsr);

app.listen(1001);
console.log('server is start .',`http://localhost:1001`);

