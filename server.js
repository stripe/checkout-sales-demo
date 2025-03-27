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

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    customer_email: "customer@example.com",
    submit_type: "donate",
    billing_address_collection: "auto",
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1R7LDqIzQrA1Y13wzqwdPMA0",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:4242/success.html`,
    cancel_url: `http://localhost:4242/cancel.html`,
    automatic_tax: { enabled: true },
  });

  res.redirect(303, session.url);
});

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}!`)
);
