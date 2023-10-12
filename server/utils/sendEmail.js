import nodemailer from "nodemailer";

const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    
    port: 465,
    host: process.env.SMTP_HOST,
  });
  

  const mailOptions = {
    from: { name: "BigDeals", address: process.env.SMTP_USER },
    to: email,
    subject: subject,
    html: message,
  };

  await transporter.sendMail(mailOptions);
};

export { sendEmail };
