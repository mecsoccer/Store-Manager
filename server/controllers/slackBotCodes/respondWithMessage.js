import fetch from 'node-fetch';

function sendMessage(submission, user, channel, resObject) {
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
  return fetch('https://hooks.slack.com/services/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', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reportMessage),
  })
    .then(reply => reply.json())
    .then((data) => {
      resObject.status(200);
    })
    .catch(err => err);
}

export default sendMessage;
