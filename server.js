import express from 'express';
import cors from 'cors';
import axios from 'axios';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Directly using the values you provided (for testing purposes only)
const MSG91_AUTHKEY = '448094A3EHgwwn5t06809338fP1'; // Direct authkey from you
const TEMPLATE_ID = '68092a30d6fc0505f33fa952';  // Direct template id from you
const SENDER_ID = 'PARLRAP';  // Direct sender id from you

// Send OTP route
app.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const response = await axios.post(
      `https://control.msg91.com/api/v5/otp?template_id=${TEMPLATE_ID}&mobile=91${phoneNumber}`,
      {},
      {
        headers: {
          'authkey': MSG91_AUTHKEY,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error sending OTP:', error.message);
    res.status(500).json({ success: false, error: 'Failed to send OTP' });
  }
});

// Verify OTP route
app.post('/verify-otp', async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    const response = await axios.get(
      `https://control.msg91.com/api/v5/otp/verify?mobile=91${phoneNumber}&otp=${otp}`,
      {
        headers: {
          'authkey': MSG91_AUTHKEY,
        },
      }
    );

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error verifying OTP:', error.message);
    res.status(500).json({ success: false, error: 'Failed to verify OTP' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
