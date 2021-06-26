const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const { OAuth2 } = google.auth;

// const {
//   MAILING_SERVICE_CLIENT_ID,
//   MAILING_SERVICE_CLIENT_SECRET,
//   SENDER_EMAIL_ADDRESS,
//   MAILING_SERVICE_REFRESH_TOKEN,
//   REDIRECT_URI,
//   PASSWORD_EMAIL
// } = process.env

const MAILING_SERVICE_CLIENT_ID = '251075614261-b2iu4bmobrtnmto0q8v17iknj4g2d1pe.apps.googleusercontent.com';
const MAILING_SERVICE_CLIENT_SECRET = 'O_d7euqJ_R0pOyidGC6Kl2Pt';
const SENDER_EMAIL_ADDRESS = 'tp2770256@gmail.com';
const MAILING_SERVICE_REFRESH_TOKEN = '1//04DMgdQy3ih31CgYIARAAGAQSNwF-L9IrwartOWKaSCHHQn63YvWA3TKSNfKUywd7PsGiJEWHzgjHPb37sRUpSpOtv7pv7VpbhK8';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const PASSWORD_EMAIL = 'TP123456789'


const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  REDIRECT_URI
);

module.exports = {
  SEND_MAIL: (to, url, txt) => {
    oauth2Client.setCredentials({ refresh_token: MAILING_SERVICE_REFRESH_TOKEN });
    const accessToken = oauth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: SENDER_EMAIL_ADDRESS,
        name: 'TRAN DINH PHUONG',
        pass: PASSWORD_EMAIL,
        clientId: MAILING_SERVICE_CLIENT_ID,
        clientSecret: MAILING_SERVICE_CLIENT_SECRET,
        refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
        accessToken: accessToken
      }
    });
    const mailOptions = {
      from: SENDER_EMAIL_ADDRESS,
      to: to,
      subject: "Verify your email address",
      html: `
              <div style="max-width: 700px; margin:40px auto; border: 1px solid #ddd; padding: 50px 20px; font-size: 110%; border-radius: 10px; background: #001232;">
              <h2 style="text-align: center; text-transform: uppercase;color: teal; color: #31d7a9;">WELCOME, THANK YOU FOR SIGNUP!</h2>
              <p style="color: #ffffff; text-align: center;">You have successfully signed up! you are about to get started with cinema, Please click the button below to verify your address.</p>
              <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px auto; display: block; border-radius: 20px; width: 260px; text-align: center; background-image: -webkit-linear-gradient(169deg, #5560ff 17%, #aa52a1 63%, #ff4343 100%);">${txt}</a>
              </div>
          `
    };
    transport.sendMail(mailOptions, (err, inFor) => {
      if (err) return err;
      return inFor
    });
  },
  FORGOT_PASSWORD_SEND_MAIL: (to, url, name) => {
    oauth2Client.setCredentials({ refresh_token: MAILING_SERVICE_REFRESH_TOKEN });
    const accessToken = oauth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: SENDER_EMAIL_ADDRESS,
        name: 'TRAN DINH PHUONG',
        pass: PASSWORD_EMAIL,
        clientId: MAILING_SERVICE_CLIENT_ID,
        clientSecret: MAILING_SERVICE_CLIENT_SECRET,
        refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
        accessToken: accessToken
      }
    });
    const mailOptions = {
      from: SENDER_EMAIL_ADDRESS,
      to: to,
      subject: "Reset password",
      html: `
              <div style="max-width: 700px; margin:40px auto; border: 1px solid #ddd; padding: 50px 20px; font-size: 110%; border-radius: 10px; background: #001232;">
              <h2 style="text-align: center; text-transform: uppercase;color: teal; color: #31d7a9;">HI ${name}</h2>
              <p style="color: #ffffff; text-align: center;">We received a request to reset the password for your account. Please reset your password below</p>
              <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px auto; display: block; border-radius: 20px; width: 260px; text-align: center; background-image: -webkit-linear-gradient(169deg, #5560ff 17%, #aa52a1 63%, #ff4343 100%);">Click here to reset password</a>
              </div>
          `
    };
    transport.sendMail(mailOptions, (err, inFor) => {
      if (err) return err;
      return inFor
    });
  },
  TICKET_PAYMENT_SEND_MAIL: (to, name, ticketInfo) => {
    oauth2Client.setCredentials({ refresh_token: MAILING_SERVICE_REFRESH_TOKEN });
    const accessToken = oauth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: SENDER_EMAIL_ADDRESS,
        name: 'TRAN DINH PHUONG',
        pass: PASSWORD_EMAIL,
        clientId: MAILING_SERVICE_CLIENT_ID,
        clientSecret: MAILING_SERVICE_CLIENT_SECRET,
        refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
        accessToken: accessToken
      }
    });

    const data = JSON.parse(ticketInfo);
    let cinemaTicketHTML = "";
    for (let ticket of data.listInsertedTickets){
      cinemaTicketHTML += `
      <ul style="border-bottom: 1px dashed #11326f; margin: 0; padding: 0;">
        <li style="padding: 0; margin-bottom: 30px; list-style: none; display: list-item; text-align: -webkit-match-parent;">
            <h6 style="text-transform: uppercase; -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between; margin-bottom: 7px; display: flex; flex-wrap: wrap; font-size: 18px; margin-top: -5px; font-weight: 600; margin: 0; line-height: 1.3; color: #ffffff; font-family: 'Open Sans', sans-serif;">
              <span>${ticket._ticketID}</span>
            </h6>
        </li>
          <li style="margin-top: 30px; padding: 0; margin-bottom: 30px; list-style: none; display: list-item; text-align: -webkit-match-parent;">
              <h6 style="text-transform: uppercase; -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between; margin-bottom: 7px; flex-wrap: wrap; font-size: 18px; margin-top: -5px; font-weight: 600; margin: 0; line-height: 1.3; color: #ffffff; font-family: 'Open Sans', sans-serif;">
                ${data.infoMovie.movieName}
              </h6>
              <span style="margin-bottom: -14px; -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between; font-size: 14px; text-transform: uppercase; color: #9aace5; display: flex; flex-wrap: wrap;">
                ${data.infoMovie.genre}
              </span>
          </li>
          <li style="padding: 0; margin-bottom: 30px; list-style: none; display: list-item; text-align: -webkit-match-parent;">
              <h6 style="text-transform: uppercase; -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between; margin-bottom: 7px; display: flex; flex-wrap: wrap; font-size: 18px; margin-top: -5px; font-weight: 600; margin: 0; line-height: 1.3; color: #ffffff; font-family: 'Open Sans', sans-serif;">
                <span>${data.infoMovie.cinemaName}</span>
              </h6>
              <div style="margin-bottom: -14px; -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between; font-size: 14px; text-transform: uppercase; color: #9aace5; flex-wrap: wrap; display: flex; box-sizing: border-box;">
                <span>${data.infoMovie.startTime} ~ ${data.infoMovie.endTime}</span>
                <span>${data.infoMovie.showAt}</span>
              </div>
          </li>
          <li style="margin-top: 30px; padding: 0; margin-bottom: 30px; list-style: none; display: list-item; text-align: -webkit-match-parent;">
              <h6 style="text-transform: uppercase; -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between; margin-bottom: 7px; flex-wrap: wrap; font-size: 18px; margin-top: -5px; font-weight: 600; margin: 0; line-height: 1.3; color: #ffffff; font-family: 'Open Sans', sans-serif;">
                ${data.infoMovie.cineplexName}
              </h6>
              <span style="margin-bottom: -14px; -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between; font-size: 14px; text-transform: uppercase; color: #9aace5; display: flex; flex-wrap: wrap;">
                ${data.infoMovie.address}
              </span>
          </li>
          <li style="padding: 0; margin-bottom: 30px; list-style: none; display: list-item; text-align: -webkit-match-parent;">
              <h6 style="text-transform: uppercase; -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between; margin-bottom: 7px; display: flex; flex-wrap: wrap; font-size: 18px; margin-top: -5px; font-weight: 600; margin: 0; line-height: 1.3; color: #ffffff; font-family: 'Open Sans', sans-serif;">
                <span>${ticket.row} - ${ticket.column}</span>
                <span>01</span>
              </h6>
              <div style="margin-bottom: -14px; -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between; font-size: 14px; text-transform: uppercase; color: #9aace5; flex-wrap: wrap; display: flex; box-sizing: border-box;">
                <span>${data.createdAt}</span>
                <span>${name}</span>
              </div>
          </li>
          <li style="padding: 0; margin-bottom: 30px; list-style: none; display: list-item; text-align: -webkit-match-parent;">
              <h6 style="text-transform: uppercase; -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between; margin-bottom: 7px; display: flex; flex-wrap: wrap; font-size: 18px; margin-top: -5px; font-weight: 600; margin: 0; line-height: 1.3; color: #ffffff; font-family: 'Open Sans', sans-serif;">
                <span>Tickets  Price</span>
                <span>vnd ${ticket.price}</span>
              </h6>
          </li>
      </ul>`
    }

    const mailOptions = {
      from: SENDER_EMAIL_ADDRESS,
      to: to,
      subject: "Cinema tickets",
      html: `
            <div style="overflow: hidden;padding-bottom: 80px;padding-top: 80px; font-size: 16px; color: #dbe2fb; line-height: 28px; font-family: 'Open Sans', sans-serif; background: #001232;">
                <div style="width: 100%; padding-right: 15px; padding-left: 15px; margin-right: auto; margin-left: auto; max-width: 450px; display: block;">
                    <div style="display: -ms-flexbox; display: flex; -ms-flex-wrap: wrap; flex-wrap: wrap; margin-right: -15px; margin-left: -15px;">
                        <div style="position: relative; width: 100%; padding-right: 15px; padding-left: 15px;">
                            <div style="padding: 30px;border: 1px solid #11326f; border-bottom-style: dashed; padding-bottom: 10px; margin-top: 60px; background-color: #032055; display: block;">
                                <h4 style="font-size: 28px; margin-top: -9px; margin-bottom: 40px; text-align: center; border-bottom: 1px dashed #11326f; padding-bottom: 23px; margin-bottom: 35px; font-weight: 600; text-transform: uppercase;">
                                    cinema tickets
                                </h4>
                                ${cinemaTicketHTML}
                            </div>
                            <div style="padding: 30px; border: 1px solid #11326f; border-bottom-style: dashed; padding-bottom: 10px; background-color: #032055; display: block; height: 50px;">
                              <h6 style="text-transform: uppercase; -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between; margin-bottom: 7px; display: flex; flex-wrap: wrap; font-size: 18px; margin-top: -5px; font-weight: 600; margin: 0; line-height: 1.3; color: #ffffff; font-family: 'Open Sans', sans-serif;">
                                <span>Total</span>
                                <span>VND ${data.total.toLocaleString()}</span>
                              </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
    };
    transport.sendMail(mailOptions, (err, inFor) => {
      if (err) return err;
      return inFor
    });
  }
};
