import openDialog from './slackBotCodes/respondWithDialog';
import sendMessage from './slackBotCodes/respondWithMessage';

function botController(req, res) {
  const { payload } = req.body;

  if (payload.trigger_id) {
    const { trigger_id: id } = payload;
    openDialog(id, res);
  }

  if (payload.type && payload.type === 'dialog_submission') {
    const { submission, user, channel } = payload;
    sendMessage(submission, user, channel, res);
  }
}

export default botController;
