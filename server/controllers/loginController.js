function loginController(req, res) {
  const { authorization } = req.headers;
  if (authorization !== 'Bearer attendant01') {
    return res.status(401).json({ message: 'wrong username or password', data: null });
  }
  return res.status(202).json({ message: 'authenticated', data: '' });
}

export default loginController;
