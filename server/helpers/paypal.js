const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "ASEOqd0xOZQbu7Z7lFqGud4xi8kYwfdOCSB5pNraSAh8zOy8aDQWxzG1l25MezdRjJfRmnY5ropiKFm3",
  client_secret:
    "ECu_-7wsZ-PMHUzfmOLGn2OP17vceJSS2rjR7FlRwCxD6vmaS9P_F4fBqCTEap3PeLDixIBbOvCoXkf9",
});

module.exports = paypal;
