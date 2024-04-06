module.exports.config = {
  name: 'gemini',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usage: "gemini [promot]",
  credits: 'james',
  cooldown: 3,
};
module.exports.run = async function ({
  api,
  event,
  args
}) {
  const axios = require('axios');
  const { threadID, messageID } = event;
  const prompt = args.join(" ");
  let uid = event.senderID;
  
  
  if (!prompt) {
    api.sendMessage(`please put a prompt!`, threadID, messageID);
    return;
  };
  
  api.sendMessage(`[🔍] searching for "${prompt}"`, threadID, messageID);
  
  try {
    let apiUrl = "https://gemini-api.replit.app";
    
    if (event.type == "message_reply") {
      if (event.messageReply.attachments[0]?.type == "photo") {
        url = encodeURIComponent(event.messageReply.attachments[0].url);
        const res = await axios.get(apiUrl + "/gemini?prompt=" + prompt + "&uid=" + uid + "&url=" + url);
        return api.sendMessage(res.data.gemini, threadID, messageID);
      } else{
        return api.sendMessage("please reply to an image", threadID, messageID);
      };
    };
    
    const result = await axios.get(apiUrl + "/gemini?prompt=" + prompt + "&uid=" + uid);
    return api.sendMessage(result.data.gemini, threadID, messageID);
  } catch (e) {
    api.sendMessage(e, threadID, messageID)
  }
}
