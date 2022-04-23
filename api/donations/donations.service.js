const donationsModel = require('./donations.model');

async function createDonation(donationJson) {
  const newDonation = await donationsModel.create(donationJson);
  return newDonation;
}

async function getDonations() {
  const donations = await donationsModel.find().populate('player', 'nick');
  return donations;
}

module.exports = {
  createDonation,
  getDonations,
};