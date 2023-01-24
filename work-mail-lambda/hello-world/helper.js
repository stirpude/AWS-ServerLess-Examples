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

exports.sendEmail = (emailBody) => {
  return new Promise((resolve, reject) => {
    const ses = new AWS.SES({ apiVersion: "2010-12-01" });
   
    const params = {
      Destination: {
        ToAddresses: [
          'xyz@test.com'
        ]
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: JSON.stringify(emailBody)
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'SUBJECT_LINE'
        }
      },
      Source: 'abc@test.com',
    };

    ses.sendEmail(params,(err,data) => {
      if(err){
          reject(err);
      }
      else {
          resolve(data);
      }
    });
  
  });
};  

