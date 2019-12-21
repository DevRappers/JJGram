import { adjectives, nouns } from './words';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import jwt from 'jsonwebtoken';

// 비밀값 생성
export const generateSecret = () => {
	const randomNumber = Math.floor(Math.random() * adjectives.length);
	return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendMail = (email) => {
	const options = {
		auth: {
			api_user: process.env.SENDGRID_USERNAME,
			api_key: process.env.SENDGRID_PASSWORD
		}
	};
	const client = nodemailer.createTransport(sgTransport(options));
	return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
	const email = {
		from: 'devrappers@jjgram.com',
		to: address,
		subject: '🔑 Login Secret for JJGram 🔑',
		html: `Hello! Your login secret is <strong>${secret}</strong>. <br/>Copy paste on the app/website to log in`
	};

	return sendMail(email);
};

// JWT토큰 생성
export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
