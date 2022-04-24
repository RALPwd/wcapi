const {
  createDonation,
  getDonations,
} = require ('./donations.service');

const { updatePlayer, getPlayerEmail } = require ('../player/player.service');

const Player = require ('./../player/player.model');

const epayco = require('epayco-sdk-node')({
  apiKey: process.env.EPAYCO_PUBLIC_KEY,
  privateKey: process.env.EPAYCO_PRIVATE_KEY,
  lang: 'ES',
  test: true
})


async function handlecreateDonation(req, res) {
 
  try {
    const creditInfo = {
      "card[number]": req.body.cardNumber,
      "card[exp_year]": req.body.cardExpYear,
      "card[exp_month]": req.body.cardExpMonth,
      "card[cvc]": req.body.cardCvc,
    }
  
    const player = req.player._doc;
    const token = await epayco.token.create(creditInfo);
    if(!player.customerId) {
      const customerInfo = {
        token_card: token.id,
        name: req.body.name,
        last_name: req.body.lastName, 
        email: player.email,
        default: true,
      }
      const customer = await epayco.customers.create(customerInfo);
      const donator = { ...player, customerId: customer.data.customerId };
      newCustomerId = donator.customerId;
      await updatePlayer(donator);
    }
    const newPlayer = await getPlayerEmail(player.email);
    const paymentInfo = {
      token_card: token.id,
      customer_id: newPlayer.customerId,
      doc_type: req.body.docType,
      doc_number: req.body.docNumber,
      name: req.body.name,
      last_name: req.body.lastName,
      email: newPlayer.email,
      description: req.body.message,
      value: req.body.amount,
      currency: 'COP',
      dues: 1,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    }
    
    const payment = await epayco.charge.create(paymentInfo)
    console.log(payment);
    if(payment.status === false){
      res.status(400).json({ message: payment.message, error: payment.data.errors[0] });
    } else {
      if(payment.data.estado === ('Rechazada' || 'Fallida' || 'Pendiente')){
        res.status(402).json({message: payment.data.respuesta, status: '402'})
      } else {
        const donationInfo={
          player:player._id,
          amount:req.body.amount,
          message:req.body.message,
          bill:{
            ref_payco:payment.data.ref_payco,
            factura:payment.data.factura,
            autorizacion:payment.data.autorizacion,
            fecha:payment.data.fecha
          }
        }

        await createDonation(donationInfo);
        res.status(201).json({message: `Gracias por donar, por ti ahora somos ${paymentInfo.value} pesos más ricos.`, status: '201'});
      }
    }
  } catch (error) {
    res.status(500).json({message: error, status: '500'});
  }
}

async function handlegetDonations(req, res) {
  const donations = await getDonations();
  res.status(200).json(donations);
}

module.exports = {
  handlecreateDonation,
  handlegetDonations,
}