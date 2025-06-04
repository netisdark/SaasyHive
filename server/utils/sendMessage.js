import nodemailer from 'nodemailer';

export const sendMessageMail = async (email, namee, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  const mailOptions = {
    from: `"SaasyHIVE Mail Management" <${process.env.EMAIL_USER}>`,
    to:"saasyhive@gmail.com",
    subject: "Mail from Customers",
    html: "<h2>Email: "+email+"<br>Name: "+namee+"<br>Message: "+text+"</h2>"
  };

  await transporter.sendMail(mailOptions);
};
