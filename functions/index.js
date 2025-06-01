const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const axios = require("axios");

// Configure your email transport.
// Replace with your actual email service details.
const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., 'Gmail', 'Outlook', etc.
  auth: {
    user: "washnrollmobilecleaning@gmail.com", // Your email address
    pass: "eena fzdk lmxf xyng",
  },
});

exports.submitBooking = functions.https.onRequest(async (req, res) => {
  try {
    // Enable CORS for cross-origin requests
    // (if your frontend is on a different domain)
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight requests
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    //reCAPTCHA verification
    const captchaToken = req.body["g-recaptcha-response"];
    const secretKey = "6LeBUEwrAAAAAHaTXHwxe9k7fvwlftviaefw0pgo";

    if(!captchaToken){
      return res.status(400).send({error: "Missing reCAPTCHA token"});
    }
    const captchaVerifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;
    const captchaResponse = await axios.post(captchaVerifyURL);

    if(!captchaResponse.data.success){
      return res.status(403).send({error: "Failed CAPTCHA verification"})
    }

    // Get the form data from the request body
    const {name, email, phone, date, time, message, selectedServices, totalPrice} = req.body;

    // Create the email message
    const mailOptions = {
      // Customize the sender
      from: "washnrollmobilecleaning@gmail.com",
      to: "washnrollmobilecleaning@gmail.com",
      subject: "New Booking Request for "+name+" on "+date,
      html: `
        <h3>New Booking Request:</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email || "N/A"}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Preferred Date:</strong> ${date || "N/A"}</p>
        <p><strong>Preferred Time:</strong> ${time || "N/A"}</p>
        <p><strong>Message:</strong><br>${message || "No message"}</p>
        <p><strong>Selected Services:</strong><br>${selectedServices || "No message"}</p>
        <p><strong>Total Price: </strong><br>${totalPrice || "No message"}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    // Send a success response back to the client
    res.status(200).send({message: "Submitted! We'll contact you shortly."});
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500)
        .send({error: "Oops, something went wrong, give us a call/text or email."});
  }
});
