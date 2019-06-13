import openDialog from './slackBotCodes/respondWithDialog';
import sendMessage from './slackBotCodes/respondWithMessage';

function botController(req, res) {
  res.status(200).json();
  const { payload } = req.body;
  const jsonPayload = JSON.parse(payload);

  if (jsonPayload.trigger_id) {
    const { trigger_id: id } = jsonPayload;
    openDialog(id, res);
  }

  if (jsonPayload.type && jsonPayload.type === 'dialog_submission') {
    const { submission, user, channel } = jsonPayload;
    sendMessage(submission, user, channel);
  }

  console.log(jsonPayload);
}

export default botController;
