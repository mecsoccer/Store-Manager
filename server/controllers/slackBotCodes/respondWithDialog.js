import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const dialog = {
  callback_id: 'progress-46e2b0',
  title: 'Request a Standup',
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
};

function openDialog(triggerId) {
  dialog.trigger_id = triggerId;
  return fetch('https://slack.com/api/dialog.open', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.slack_token}`,
    },
    body: JSON.stringify({ trigger_id: triggerId, dialog }),
  })
    .then(data => data.json())
    .then((json) => {
      console.log(json);
    })
    .catch(err => console.log(err));
}

export default openDialog;
