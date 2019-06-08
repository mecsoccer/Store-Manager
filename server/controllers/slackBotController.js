import fetch from 'node-fetch';

const dialog = {
  dialog: {
    callback_id: 'progress-46e2b0',
    title: 'Request a Ride',
    submit_label: 'Request',
    notify_on_cancel: true,
    state: 'Limo',
    elements: [
      {
        label: 'What are you up to today?',
        name: 'comment1',
        type: 'textarea',
        hint: 'Provide additional information if needed.',
      },
      {
        label: 'What do you intend to achieve this week?',
        name: 'comment2',
        type: 'textarea',
        hint: 'Provide additional information if needed.',
      },
    ],
  },
};

function sendMessage(submission, user, channel) {
  const reportMessage = {
    channel: channel.name,
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `*Weekly Standup Report*\n*<google.com|${user.name}>*`
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `*What I am up to today:*\n${submission.comment1}\n*What I am up to for the week:*\n${submission.comment2}`,
        },
        "accessory": {
          "type": "image",
          "image_url": "https://api.slack.com/img/blocks/bkb_template_images/approvalsNewDevice.png",
          "alt_text": "computer thumbnail"
        }
      },
    ],
  };
  return fetch('https://hooks.slack.com/services/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', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reportMessage),
  })
    .then(reply => reply.json())
    .then(data => data)
    .catch(err => err);
}

function openDialog(triggerId) {
  dialog.trigger_id = triggerId;
  fetch('https://slack.com/api/dialog.open', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer xoxb-641771922531-657174156405-nWtNY6U3kD7oKjqEzoV3ChJt',
    },
    body: JSON.stringify({ trigger_id: triggerId, dialog: dialog.dialog }),
  })
    .then(data => data.json())
    .then(json => json)
    .catch(err => err);
}

function botController(req, res) {
  const payload = req.body;
  const {
    trigger_id: id, type, submission, user,
  } = req.body;

  if (id) openDialog(id);

  if (type === 'dialog_submission') {
    sendMessage(submission, user);
  }
  res.status(200).json({ challenge: payload.challenge });
}

export default botController;
