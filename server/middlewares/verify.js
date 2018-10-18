
exports.admin = (req, res, next) => {
	if (req.headers.authorization != 'Bearer admin') {
		return res.status(401).send('Sorry unauthorized access.');
	}

	return next();
};

exports.attendant = (req, res, next) => {
	if (req.headers.authorization != 'Bearer attendant') {
		return res.status(401).send('Sorry unauthorized access.');
	}
	
	return next();
};

exports.creator = (req, res, next) => {
	next();
};