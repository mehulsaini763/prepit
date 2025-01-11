export const dynamic = 'force-dynamic'; // defaults to auto

import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.zeptomail.in',
  port: 587,
  auth: {
    user: process.env.ZEPTOMAIL_API_KEY,
    pass: process.env.ZEPTOMAIL_PASS,
  },
});

export async function POST(request) {
  const body = await request.json();

  const { userEmail, testId, buffer } = body;

  const mailOptions = {
    from: '"PrepIt!" <noreply@basicfunda.letsnailthis.guru>',
    to: userEmail,
    subject: `${testId}: Test Results`,
    html: `These are your Test Results for the Test Id ${testId}`,
    attachments: [
      {
        filename: `${testId} Results.pdf`,
        content: Buffer.from(buffer),
        type: 'application/pdf',
      },
    ],
  };

  try {
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('########## MAIL SENT ##########');
    });
    return Response.json(200);
  } catch (error) {
    return Response.json(400);
  }
}
