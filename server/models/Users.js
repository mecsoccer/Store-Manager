import crypto from 'crypto';
import jwt from 'jsonwebtoken';

let userArray = [
  {
	id: 1,
    email: 'admin@email.com',
    salt: '$2a$10$z.LAaliLii86mdXK1DmOLuUn4Tw06CHBQ8Z7g.E8HyUBymPFZzrR6',
	hash: 'alfdsakdf',
  }
];

class Schema {
	constructor (email, hash, salt) {
		this.email = email;
		this.hash = hash;
		this.salt = salt;
	}
	
	static save(obj){
		return new Promise((resolve, reject) => {
			userArray.push({ email, hash, salt });
			Promise.resolve();
		})
	};
	
	setPassword(password) {
	  this.salt = crypto.randomBytes(16).toString('hex');
	  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	};

	validatePassword (password) {
	  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	  return this.hash === hash;
	};

	generateJWT () {
	  const today = new Date();
	  const expirationDate = new Date(today);
	  expirationDate.setDate(today.getDate() + 60);

	  return jwt.sign({
		email: this.email,
		id: this._id,
		exp: parseInt(expirationDate.getTime() / 1000, 10),
	  }, 'secret');
	}

	toAuthJSON () {
	  return {
		_id: this._id,
		email: this.email,
		token: this.generateJWT(),
	  };
	}	
}

/*const userFunctions = () => {
	
	let user = {};
	
	setPassword = (password) => {
		const salt = crypto.randomBytes(16).toString('hex');
		const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
		user[salt] = salt;
		user[hash] = hash;
	};
	
	validatePassword = (password) => {
		const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
		return hash === user.hash;
	};
	
	generateJWT = function() {
		const today = new Date();
		const expirationDate = new Date(today);
		expirationDate.setDate(today.getDate() + 60);

		return jwt.sign({
			email: userArray[0].email,
			id: userArray[0].email,
			exp: parseInt(expirationDate.getTime() / 1000, 10),
		}, 'secret');
	}
	
	toAuthJSON = function() {
		return {
			_id: userArray[0]id,
			email: usereArray[0]email,
			token: this.generateJWT(),
		};
	};
	
};*/

module.exports = { Schema, userArray };