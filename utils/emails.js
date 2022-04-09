const sgMail = require('@sendgrid/mail');

 async function sendMailSendGrid(data){
    sgMail.setApiKey(process.env.SENGRID_API_KEY);
    return sgMail.send(data);
}

module.exports = {sendMailSendGrid}