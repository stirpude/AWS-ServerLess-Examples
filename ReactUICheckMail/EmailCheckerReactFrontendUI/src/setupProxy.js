
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    console.log('this is inside proxy');
  app.use('/myDynamoTest/user', proxy({
    target: 'https://npv0tgsru4.execute-api.us-east-1.amazonaws.com/default/myDynamoTest',
    changeOrigin: true,
  }));
};