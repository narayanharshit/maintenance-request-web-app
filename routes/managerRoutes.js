const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant');

// Route to add a new tenant
router.post('/add-tenant', async (req, res) => {
  try {
    const { tenantID, name, phone, email, apartment, checkIn, checkOut } = req.body;

    // Validate input
    if (!tenantID || !name || !phone || !email || !apartment || !checkIn) {
      return res.status(400).json({ error: 'All fields except checkOut are required' });
    }

    // Ensure the apartment is not already occupied
    const existingTenant = await Tenant.findOne({ apartment });
    if (existingTenant) {
      return res.status(400).json({ error: 'Apartment is already occupied' });
    }

    // Create a new tenant
    const newTenant = new Tenant({
      tenantID,
      name,
      phone,
      email,
      apartment,
      checkIn,
      checkOut,
    });

    await newTenant.save();
    res.status(201).json({ message: 'Tenant added successfully!', tenant: newTenant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add tenant' });
  }
});

// Route to move a tenant to another apartment
router.patch('/move-tenant/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { newApartment } = req.body;

    if (!newApartment) {
      return res.status(400).json({ error: 'New apartment is required' });
    }

    // Ensure the new apartment is not already occupied
    const existingTenant = await Tenant.findOne({ apartment: newApartment });
    if (existingTenant) {
      return res.status(400).json({ error: 'New apartment is already occupied' });
    }

    // Update the tenant's apartment
    const updatedTenant = await Tenant.findByIdAndUpdate(
      id,
      { apartment: newApartment },
      { new: true }
    );

    if (!updatedTenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    res.status(200).json({ message: 'Tenant moved successfully!', tenant: updatedTenant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to move tenant' });
  }
});

// Route to delete a tenant
router.delete('/delete-tenant/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the tenant
    const deletedTenant = await Tenant.findByIdAndDelete(id);

    if (!deletedTenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    res.status(200).json({ message: 'Tenant deleted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete tenant' });
  }
});

module.exports = router;