import nodemailer from "nodemailer";
// import sendgridTransport from "nodemailer-sendgrid-transport";
import nodemailerSendgrid from "nodemailer-sendgrid";

const API_KEY = process.env.SENDGRID_API_KEY!;

const transport = nodemailer.createTransport(
	nodemailerSendgrid({
		apiKey: API_KEY,
	})
);

export const sendMail = async (to: string, msg: string) => {
	return await transport.sendMail({
		from: "otggreen77@gmail.com",
		to: to,
		subject: "hello world",
		html: `<h1>${msg}!</h1>`,
	});
};
