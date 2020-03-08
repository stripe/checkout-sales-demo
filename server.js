require("dotenv").config({ path: ".env" });

const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const { resolve } = require("path");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT | 4242;

app.use(bodyParser.json());
app.use(express.static("static"));

app.get("/", (req, res) => {
  const path = resolve("static/index.html");
  res.sendFile(path);
});

app.get("/config", (req, res) => {
  res.send({
    publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
    basePrice: process.env.BASE_PRICE,
    currency: process.env.CURRENCY
  });
});

app.get("/checkout-session", async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

app.post("/checkout-session", async (req, res) => {
  try {
    const domainURL = req.headers.origin;
    let currency = "USD";

    const { locale } = req.body;
    let paymentMethods = ["card"];

    if (locale === "nl") {
      paymentMethods.push("ideal");
      currency = "EUR";
    }

    if (locale === "uk") {
      paymentMethods.push("bacs_debit");
      currency = "GBP";
    }

    if (locale === "de") {
      currency = "EUR";
    }

    if (locale === "at") {
      currency = "EUR";
    }

    if (locale === "be") {
      currency = "EUR";
    }

    if (locale === "pl") {
      currency = "PLN";
    }

    const quantity = 2;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethods,
      locale: locale,
      line_items: [
        {
          name: "Kitchen counter stools",
          images: ["https://zbx1k.sse.codesandbox.io/chairs.png"],
          quantity: quantity,
          currency: currency,
          amount: 89000
        }
      ],
      success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/canceled.html`
    });

    res.send({
      sessionId: session.id
    });
  } catch (err) {
    res.status(500);
    res.send({
      error: err.message
    });
  }
});

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}!`)
);
