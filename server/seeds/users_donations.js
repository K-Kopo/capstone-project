const userData = require('../seed_data/users');
const donationData = require('../seed_data/donations');

exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert(userData);
    })
    .then(() => {
      return knex('donations').del();
    })
    .then(() => {
      return knex('donations').insert(donationData);
    });
};
