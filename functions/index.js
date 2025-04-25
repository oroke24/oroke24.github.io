const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

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

    // Get the form data from the request body
    const {name, email, phone, date, time, message} = req.body;

    // Create the email message
    const mailOptions = {
      // Customize the sender
      from: "<noreply@washnrollmobilecleaning.com>",
      to: "washnrollmobilecleaning.com",
      subject: "Job for ${name}",
      html: `
        <h3>New Booking Request:</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email || "N/A"}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Preferred Date:</strong> ${date || "N/A"}</p>
        <p><strong>Preferred Time:</strong> ${time || "N/A"}</p>
        <p><strong>Message:</strong><br>${message || "No message"}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    // Send a success response back to the client
    res.status(200).send({message: "Booking request submitted successfully!"});
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500)
        .send({error: "Oops, something went wrong, try call/text/email"});
  }
});
