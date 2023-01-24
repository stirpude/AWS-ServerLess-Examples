
let response;
const helper  = require('./helper');
const emailResponse = require('./generateemailresponse');
const nodemailer = require('nodemailer');


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
exports.workMailLambda = async (event, context) => {
    
    try {
        const rawMessageContentBuffer = await helper.getRawMessageContent(event.messageId);
        console.log('rawMessageContentBuffer'+JSON.stringify(rawMessageContentBuffer));
        if(!rawMessageContentBuffer.messageContent){
            ('The message content is not found');
        }

        //extract email body text and print it
        const result = await helper.parseMimeEmail(rawMessageContentBuffer.messageContent);
        console.log('Email body'+JSON.stringify(result));
        
        
        //email response from chatGpt
        response = await emailResponse.generateEmailResponseFromChatGPT(rawMessageContentBuffer.messageContent);
        console.log('Email response from ChatGPT'+JSON.stringify(response));

        const emailResponeWithoutTrail = response.replace(/\n/g,'');
        
        //send the email using ses
        const emailBodyResponse = await helper.sendEmail(emailResponeWithoutTrail);
        console.log('Mail sent'+JSON.stringify(emailBodyResponse));

    } catch (err) {
        console.log(err);
        return err;
    }
    return response
};
