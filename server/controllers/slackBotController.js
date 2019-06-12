import openDialog from './slackBotCodes/respondWithDialog';
import sendMessage from './slackBotCodes/respondWithMessage';

function botController(req, res) {
  res.status(200).json();
  const { payload } = req.body;
  const jsonPayload = JSON.parse(payload);

  if (payload.trigger_id) {
    const { trigger_id: id } = jsonPayload;
    openDialog(id, res);
  }

  if (payload.type && payload.type === 'dialog_submission') {
    const { submission, user, channel } = jsonPayload;
    sendMessage(submission, user, channel);
  }

  console.log(jsonPayload);
}

export default botController;
