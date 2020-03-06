var handleError = function(err) {
  if (err) {
    document.querySelector(".error-text").textContent = err.message;
  }
};

// Create a Checkout Session with the selected quantity
var createCheckoutSession = function(locale) {
  return new Promise((resolve, reject) => {
    return fetch("/checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        locale: locale
      })
    })
      .then(function(response) {
        if (response.ok) {
          return response;
        }
        throw Error(response.statusText);
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        resolve(response);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

/* Get your Stripe publishable key to initialize Stripe.js */
fetch("/config")
  .then(function(result) {
    return result.json();
  })
  .then(function(config) {
    var stripe = Stripe(config.publicKey);
    // Setup event handler to create a Checkout Session on submit
    let elmButtons = document.querySelectorAll("button");

    elmButtons.forEach(elmButton => {
      elmButton.addEventListener("click", function(evt) {
        let locale = elmButton.dataset["locale"] || "en";
        createCheckoutSession(locale)
          .then(function(data) {
            stripe.redirectToCheckout({
              sessionId: data.sessionId
            });
          })
          .catch(handleError);
      });
    });
  });