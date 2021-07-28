import Mail from 'nodemailer';

export default class EmailService {
  public static mail = Mail.createTransport({
    host: 'mail.privateemail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  public static async registerMail(email: string, username: string) {
    this.mail.sendMail({
      from: '"Pendragon Support" <support@pendragon.gg>', // sender address
      to: email, // list of receivers
      subject: 'Account Verification', // Subject line
      //       text: 'Verification Code: 56565', // plain text body
      html: `
	<p>Welcome ${username}, for confirmation <a href="development.pendragon.gg" target="_blank">click here</a></p>
      `,
    });
  }
}
