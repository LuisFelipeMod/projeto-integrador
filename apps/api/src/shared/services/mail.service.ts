import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

@Injectable()
export class MailService {
  private transporter: Transporter;
  private mailOptions: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      url: process.env.EMAIL_SERVER,
    });
    this.mailOptions = {
      from: process.env.EMAIL_FROM,
    };
  }

  setTo(to: string) {
    this.mailOptions.to = to;
    return this;
  }

  setFrom(from: string) {
    this.mailOptions.from = from;
    return this;
  }

  setSubject(subject: string) {
    this.mailOptions.subject = subject;
    return this;
  }

  setText(text: string) {
    this.mailOptions.text = text;
    return this;
  }

  setHtml(html: string) {
    this.mailOptions.html = html;
    return this;
  }

  async send() {
    try {
      const info = await this.transporter.sendMail(this.mailOptions);
      return info;
    } catch (error) {
      throw new Error(error);
    }
  }
}
