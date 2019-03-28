const TelegramBot = require('node-telegram-bot-api');
const AssistantV1 = require('watson-developer-cloud/assistant/v1');

const watsonAssistant = new AssistantV1({
  "version": "2018-07-10",
  "iam_apikey": "",
  "iam_apikey_description": "",
  "iam_apikey_name": "",
  "iam_role_crn": "",
  "iam_serviceid_crn": "",
  "url": ""
});

const TOKEN = 'token do telegram'
const bot = new TelegramBot(TOKEN, { polling: true })

let context = {};

bot.on('message', (msg) => {
  console.log(JSON.stringify(msg));

  let userName = msg.from.first_name;
  if (!context.userName){
    context.userName = userName;
  }

  const params = {
    input: { text: msg.text },
    workspace_id: 'usar work space do watson',
    text: msg.text,
    context
  };

  watsonAssistant.message(params, (err, response) => {
    if(err)
          bot.sendMessage(msg.chat.id, 'Eita... deu algum  erro na API :S');

    dialog = response.output.generic[0];
    context = response.context;

    if(dialog.response_type === 'image'){
   	const photo = dialog.source;
	bot.sendPhoto(msg.chat.id, photo, {caption: dialog.title}); 
    } else {
	bot.sendMessage(msg.chat.id, response.output.text.join('\n'));
	console.log(
	    "\nRESPONSE-WATSON: " + context.userName + "\n" + response.output.text.join('\n') + "\n"
	);
    }
  });
})
