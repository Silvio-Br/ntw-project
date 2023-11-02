// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'Gmail',
    transport:{
        host: 'smtp.gmail.com',
        secure:false,
    auth: {
      user: 'ilyasshalimi56@gmail.com',
      pass: 'ycfo mcpf svnh tvwn',
    

    },
},
  });

  sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'iliass.halimi@etu.uae.ac.ma',
      to,
      subject,
      text,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
