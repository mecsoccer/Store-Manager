import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

function sendMessage(submission, user, channel) {
  const reportMessage = {
    channel: channel.name,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Weekly Standup Report*\n*<google.com|${user.name}>*`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*What I am up to today:*\n${submission.comment1}\n*What I am up to for the week:*\n${submission.comment2}`,
        },
        accessory: {
          type: 'image',
          image_url: 'https://api.slack.com/img/blocks/bkb_template_images/approvalsNewDevice.png',
          alt_text: 'computer thumbnail',
        },
      },
    ],
  };
  return fetch(process.env.test_bot_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reportMessage),
  })
    .then(reply => reply.json())
    .then((data) => {
      console.log(data);
    })
    .catch(err => err);
}

export default sendMessage;
