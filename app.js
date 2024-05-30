var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { ApifyClient } = require('apify-client');

const axios = require('axios');

// Initialize the ApifyClient with your Apify API token
const client = new ApifyClient({
  token: 'apify_api_Nnb6mLKeKy5AKxVDoFOR0SJ9iEmTXg0DBPv7',
});

// Prepare Actor input
const input = {
  "categoryUrls": [
      {
          "url": "https://www.amazon.in/deal/091b57e2/?_encoding=UTF8&_encoding=UTF8&searchAlias=apparel&ref_=dlx_gate_sd_dcl_tlt_091b57e2_dt_pd_hp_d_atf_unk&pd_rd_w=KVK1A&content-id=amzn1.sym.9e4ae409-2145-4395-aa6e-45d7f3e95c3e&pf_rd_p=9e4ae409-2145-4395-aa6e-45d7f3e95c3e&pf_rd_r=32VMPKX1WM2F75YKP14P&pd_rd_wg=TBwjg&pd_rd_r=ec0a2b25-8298-42d0-b855-b6f4f371eeda"
      }
  ],
  "maxItemsPerStartUrl": 100
};

(async () => {
  // Run the Actor and wait for it to finish
  const run = await client.actor("junglee/free-amazon-product-scraper").call(input);

  // Fetch and print Actor results from the run's dataset (if any)
  console.log('Results from dataset');
  console.log(`💾 Check your data here: https://console.apify.com/storage/datasets/${run.defaultDatasetId}`);
  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  items.forEach((item) => {
      console.dir(item);
  });
})();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

const fetch = require('node-fetch');



// --------------------------------------------------
const { clint } = require('./client.js');
// console.log(clint);


// async function getData() {
//   fetch('https://jsonplaceholder.typicode.com/todos/1')
//     .then(response => response.json())
//     .then(json => console.log(json))


//   const data = await clint.get("student:4");
//   console.log(data);
// }
// getData();
console.log(process.env.NODE_ENV);

app.get('/demo', async function (req, res, next) {
  return res.status(200).json({
    data: "success"
  });
});

app.get('/', async function (req, res, next) {

  try {
    console.log("Redis DB Loading data...");
    let redisData = await clint.get("jsonplaceholder:data:api:1");
    
    if(redisData) {
      return res.status(200).json({
        status: true,
        data: JSON.parse(redisData)
      });
    }

    
    console.log("data from redis", redisData); 
    const flag = true;
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");
    await clint.set("jsonplaceholder:data:api:1", JSON.stringify(data));
    await clint.expire("jsonplaceholder:data:api:1", 30);
    redisData = data;

    // const data = User.aggregate([
    //   {},
    //   {},
    //   {}
    // ]);
    

    console.log("IT1 add here");
    console.log("IT11111 add here");
    console.log("IT11111 add here");

    console.log("IT2222 add here");

    return res.status(200).json({
      status: true,
      data: redisData
    });


    // const jsonData = await axios.get("https://jsonplaceholder.typicode.com/todos").data;
    // console.log(jsonData.daat, '-----');

  } catch (error) {
    console.log(error.message);
    return next(error);
  }

  // console.log("data index: ");
  // res.render('index', { title: 'Express' });

});




// --------------------------------------------------


// 2ae903e
// -d <- is the ditash mode here

// docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
// 38cfda0ce9241625e37264d8e19e363103bc2952337201df8ff277b4b64c286b



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    status: 404,
    error: err.message
  });
});

module.exports = app;
