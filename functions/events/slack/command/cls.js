const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
/**
* An HTTP endpoint that acts as a webhook for Slack command event
* @param {object} event Slack command event body (raw)
* @returns {object} result The result of your workflow steps
*/
module.exports = async (event) => {

  // Prepare workflow object to store API responses
  
  let result = {};
  
  // [Workflow Step 1]
  
  console.log(`Running slack.conversations[@0.2.5].info()...`);
  
  result.step1 = {};
  result.step1.channel = await lib.slack.conversations['@0.2.5'].info({
    id: `${event.channel_id}`
  });
  
  // [Workflow Step 2]
  
  console.log(`Running slack.channels[@0.6.3].messages.list()...`);
  
  result.step2 = {};
  result.step2.messages = await lib.slack.channels['@0.6.3'].messages.list({
    channel: `#${result.step1.channel.name}`,
    latest: null,
    oldest: null,
    filterLinks: false
  });
  
  // [Workflow Step 3]
  
  // Retrieve messageCount from /cls command
  // min. being "1", max being "10"
  let messageCount = Math.min(Math.max(parseInt(event.text) || 0, 1), 10);
  // Only loop through the number of messages in channel at maximum
  messageCount = Math.min(messageCount, result.step2.messages.length);
  
  // Destroy every message in array
  for (let i = 0; i < messageCount; i++) {
  
    console.log(`Running slack.messages[@0.5.5].destroy()...`);
        
    result.step3 = {};
    result.step3.response = await lib.slack.messages['@0.5.5'].destroy({
      id: result.step1.channel.id, // required
      ts: result.step2.messages[i].ts, // required
      as_user: true
    });
    
  }

  return result;
};