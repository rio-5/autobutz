module.exports.config = {
  name: 'status',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usage: "Ai [promot]",
  credits: 'Developer',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const pyModule = await import('./python_aternos.mjs');
  const serverInfo = await pyModule.srv_info();
  
  api.sendMessagw(`Server IP: ${serverInfo.domain}`)
};
