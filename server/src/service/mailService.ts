import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config()

class MailService {
  constructor() {
    // @ts-ignore
    this.transporter = nodemailer.createTransport({
      // @ts-ignore
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to: string, link: string) {
    // @ts-ignore
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Account activated at ${
        process.env.API_URL || "http://localhost:9080"
      }`,
      text: "",
      html: `
        <div>
          <h1>Activation link:</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
    });
  }
}

export default new MailService();
