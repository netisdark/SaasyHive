import nodemailer from 'nodemailer';

export const sendConfirmationEmail = async (to) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  const mailOptions = {
    from: `"SaasyHIVE" <${process.env.EMAIL_USER}>`,
    to,
    subject: "🎉 You're on the List!",
    html: "<h2>Thanks for signing up!</h2><p>We'll notify you at launch 🚀</p>"
  };

  await transporter.sendMail(mailOptions);
};
