// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
const os = require('os');
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
//const { uuid } = require('uuidv4');
const { 
    v4: uuidv4
  } = require('uuid');

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        // const ret = await axios(url);
        const data = await docClient.scan({
            TableName : 'userDynamoDb',

        }).promise()
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello' + event.name + os.hostname(),
                users: data.Items
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

exports.createUser = async (event, context) => {
    try {
        // const ret = await axios(url);
        const {username,email} = JSON.parse(event.body);

        await docClient.put({
            TableName : 'userDynamoDb',
            Item: {
                id: uuidv4(),
                username,
                email
            }

        }).promise()
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello' + event.name + os.hostname(),
                message: 'user is created',
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
