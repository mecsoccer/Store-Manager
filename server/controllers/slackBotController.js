function botController(req, res) {
// Get event payload
  const payload = req.body;
  // Respond to this event with HTTP 200 status
  res.status(200).json({ challenge: payload.challenge });
  console.log(payload);
}

export default botController;
