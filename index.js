const express = require('express');
require('dotenv').config(); 
const nodemailer = require("nodemailer");
const cors = require('cors'); 

const app = express();
app.use(express.json())
app.use(cors());
const port = 3000;

async function main(req, res) {
  const { name, email, product, shippingdetails, total, city, state } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    logger: true,
    debug: true,
    auth: {
      user: process.env.USERNAME, 
      pass: process.env.PASSWORD, 
    },
  });

  // Generate HTML content for products
  let productsHTML = '';
  product.forEach(item => {
    productsHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.price}</td>
        <td>${item.Qty}</td>
      </tr>
    `;
  });

  let info = await transporter.sendMail({
    from: 'CUTY TINY TOES" <hussaijaeh320@gmail.com>',
    to: email,
    subject: "cute tiny toe",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Product Information</title>
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
          line-height: 1.4; /* Adjusted line height */
        }
        th {
          background-color: #f2f2f2;
        }
        .contact-section {
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <h2>Dear ${name}</h2>
      <p>Thank you for choosing cute tiny toe </p>
      <p>Your order is being processed</p>
      <div style="float: left; width: 50%;">
        <p>Shipping Details:</p>
        <p>Address: ${shippingdetails}</p>
        <p>City: ${city}</p>
        <p>State: ${state}</p>
      </div>
      <div class="contact-section">
        <p>If you have any questions or concerns, feel free to contact us:</p>
        <p>Email: example@example.com</p>
        <p>Phone: +1234567890</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          ${productsHTML}
        </tbody>
      </table>
      <p>Total Amount: $${total}</p>
    </body>
    </html>
    `,
  });

  console.log(info.messageId);
}

app.post("/sendemail", (req, res) => {
  main(req, res).catch(err => {
    console.error("Error sending email:", err);
    res.status(500).send("Internal server error");
  });
});

app.listen(3000, () => {
  console.log(`Server is listening at http://localhost:3000`);
});
