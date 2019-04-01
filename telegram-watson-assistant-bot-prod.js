const TelegramBot = require('node-telegram-bot-api');
const AssistantV1 = require('watson-developer-cloud/assistant/v1');
let context = {};

const watsonAssistant = new AssistantV1({
    "version": '2018-07-10',
    "iam_apikey": "",
    "iam_apikey_description": "",
    "iam_apikey_name": "",
    "iam_role_crn": "",
    "iam_serviceid_crn": "",
    "url": "https://gateway.watsonplatform.net/assistant/api"
});


const TOKEN = 'COLOCA O TOKEN DO BOT AQUI'

const bot = new TelegramBot(TOKEN, { polling: true });


bot.on('message', (msg) => {
    
    let username = msg.from.first_name;
    context.username = username;
    console.log(JSON.stringify(msg, null, 4));
  
  const params = {
    input: { text: msg.text },
    workspace_id: 'COLOCA O WORKSPACE_ID AQUI,
    text: msg.text,
    context,
};
  watsonAssistant.message(params, (err, response) => {
    if(err)
        bot.sendMessage(msg.chat.id, 'Eita... deu algum  erro na API :S');

    let dialog = response.output.generic[0];


    if(dialog.response_type === 'image') {
        const photo = dialog.source
        bot.sendPhoto(msg.chat.id, photo, { caption: dialog.title });
    } else if(dialog.response_type === 'option') {
        const opts = {
            reply_to_message_id: msg.message_id,
            reply_markup: JSON.stringify({
              keyboard: [
                dialog.options.map(option => option.label)
              ]
            })
          };
          bot.sendMessage(msg.chat.id, 'Test?', opts);
    } else {
        bot.sendMessage(msg.chat.id, response.output.text.join('\n'));
    }
    //   console.log(JSON.stringify(response, null, 4));
    
    

    context = response.context;

});
});
