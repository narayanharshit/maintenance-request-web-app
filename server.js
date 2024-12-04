const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import models
const Tenant = require('./models/Tenant');
const Request = require('./models/Request');

// Import routes
const tenantRoutes = require('./routes/tenantRoutes');
const staffRoutes = require('./routes/staffRoutes'); // Staff routes
const managerRoutes = require('./routes/managerRoutes'); // Manager routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Sample route
app.get('/', (req, res) => {
  res.send('Maintenance Web App API is running!');
});

// Test models route
app.get('/test-models', async (req, res) => {
  try {
    const tenant = await Tenant.create({
      tenantID: 'T1',
      name: 'John Doe',
      phone: '123-456-7890',
      email: 'john.doe@example.com',
      apartment: '101',
      checkIn: new Date(),
    });

    const request = await Request.create({
      requestID: 'R1',
      apartment: '101',
      area: 'Kitchen',
      description: 'Leaky faucet',
    });

    res.json({ tenant, request });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error testing models');
  }
});

// Register tenant routes
app.use('/api/tenant', tenantRoutes);

// Register staff routes
app.use('/api/staff', staffRoutes);

// Register manager routes
app.use('/api/manager', managerRoutes); // Added line to register manager routes

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));