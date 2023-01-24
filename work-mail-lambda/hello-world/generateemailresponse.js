
const { Configuration, OpenAIApi } = require("openai");

exports.generateEmailResponseFromChatGPT = (email) => {

  //prompt for chatgpt to respond to emails
  const prompt = `Respond to this email: ${email.emailBody}`;
    
 const configuration = new Configuration({
 apiKey: "YOUR_API_KEY" });
 const openai = new OpenAIApi(configuration);

    return new Promise((resolve, reject) => {
        openai.createCompletion({
            prompt,
            model: "text-davinci-002",
            temperature: 0.5,
        }).then((response) => {
            resolve(response.data.choices[0].text);
        }).catch((err) => {
            reject(err);
        });
    });
};  

