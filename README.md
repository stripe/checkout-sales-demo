# Moved to stripe-samples

Stripe maintains sample applications for various products, you can browse all the up-to-date versions in the [stripe-samples](https://github.com/stripe-samples) organization.  Here are some payment flows using Stripe Checkout:

- [Quickly collect one-time payments](https://github.com/stripe-samples/checkout-one-time-payments)
- [Combine Checkout and Billing for fast subscription pages](https://github.com/stripe-samples/checkout-single-subscription)
- [Make direct charges on a connected account](https://stripe.com/docs/connect/direct-charges)

---
_Previous README for reference:_

### Sales demo of Stripe Checkout

Sales demo of Stripe Checkout with different locales around the world. 

![Checkout across the world](checkout_accross_the_world.png)

This demo shows you how to easily create a checkout session to see what Checkout might look like for customers from around the world:

- US: English; USD; cards, Apple Pay & Google Pay
- DE: German; EUR; cards, Apple Pay & Google Pay Giropay
- NL: Dutch; EUR; cards, Apple Pay & Google Pay, iDEAL
- MY: Malay; MYR; cards, Apple Pay & Google Pay 
- BE: French; EUR; cards, Apple Pay & Google Pay, Bancontact
- PL: Polish; PLN; cards, Apple Pay & Google Pay, P24

#### How to run locally

```
git clone git@github.com:stripe-samples/checkout-with-multiple-locales.git
npm install
npm start
```
