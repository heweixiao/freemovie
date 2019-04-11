const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const KoaStatic = require('koa-static');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();
const {youkuSpider, aqySpider} = require('./spiderController.js');
app.use(bodyParser());

router.get('/',ctx=> {
  ctx.response.type = 'html';
  ctx.body = fs.createReadStream( path.resolve(__dirname,'../v/dist/index.html'));
})
router.get('/youku-free-movie/:id', ctx => {
  return youkuSpider(ctx.params.id).then(res=> {
    ctx.response.type = 'json';
    console.log(res);
    ctx.body = res;
  })

})
router.get('/user', ctx => {
  ctx.body = '这是user页面';
})
router.get('/post', ctx => {
  ctx.body = ctx.request.body;
})
router.get('/async', async ctx => {
  const sleep = async (ms) => {
    return new Promise( reslove => {
      setTimeout(()=> {
        reslove(true);
      }, ms);
    });
  };
  await sleep(1000);
  ctx.body = '这是异步处理页面';
})
app.use(KoaStatic(path.resolve(__dirname, '../v/dist')));
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);