const AWS = require('aws-sdk');
const workmailmessageflow = new AWS.WorkMailMessageFlow({apiVersion: '2019-05-01'});
const mailparser = require('mailparser');

exports.getRawMessageContent = (messageId) => {
    return new Promise( (resolve, reject) => {
        const params = {
            messageId

        };
        workmailmessageflow.getRawMessageContent(params,(err,data) => {
            if(err){
                reject(err);
            }
            else {
                resolve(data);
            }
        });

    });
}

exports.parseMimeEmail = (emailString) => {
    return new Promise((resolve, reject) => {
      let mail = {};
      let parser = new mailparser.MailParser();
      parser.on('data', emailString => {
        if (emailString.type === 'text') {
          mail.emailBody = emailString.text;
        }
      });
      parser.on('end', () => {
        resolve(mail);
      });
      parser.on('error', err => {
        reject(err);
      });
  
      parser.write(emailString);
      parser.end();
    });
};  
