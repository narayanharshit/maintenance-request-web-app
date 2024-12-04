document.getElementById('manager-link').addEventListener('click', () => {
    document.getElementById('content').innerHTML = `
      <h2>Manager Portal</h2>
      <div>
        <h3>Add a New Tenant</h3>
        <form id="add-tenant-form">
          <label for="tenantID">Tenant ID:</label>
          <input type="text" id="tenantID" required><br><br>
          <label for="name">Name:</label>
          <input type="text" id="name" required><br><br>
          <label for="phone">Phone:</label>
          <input type="text" id="phone" required><br><br>
          <label for="email">Email:</label>
          <input type="email" id="email" required><br><br>
          <label for="apartment">Apartment:</label>
          <input type="text" id="apartment" required><br><br>
          <label for="checkIn">Check-In Date:</label>
          <input type="date" id="checkIn" required><br><br>
          <button type="submit">Add Tenant</button>
        </form>
      </div>
      <div>
        <h3>Move a Tenant</h3>
        <form id="move-tenant-form">
          <label for="tenantIDToMove">Tenant ID:</label>
          <input type="text" id="tenantIDToMove" required><br><br>
          <label for="newApartment">New Apartment:</label>
          <input type="text" id="newApartment" required><br><br>
          <button type="submit">Move Tenant</button>
        </form>
      </div>
      <div>
        <h3>Delete a Tenant</h3>
        <form id="delete-tenant-form">
          <label for="tenantIDToDelete">Tenant ID:</label>
          <input type="text" id="tenantIDToDelete" required><br><br>
          <button type="submit">Delete Tenant</button>
        </form>
      </div>
    `;
  
    // Add a new tenant
    document.getElementById('add-tenant-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const tenantData = {
        tenantID: document.getElementById('tenantID').value,
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        apartment: document.getElementById('apartment').value,
        checkIn: document.getElementById('checkIn').value,
      };
      try {
        const response = await fetch('http://localhost:9000/api/manager/add-tenant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tenantData),
        });
        const result = await response.json();
        alert(result.message || 'Tenant added successfully!');
      } catch (error) {
        alert('Failed to add tenant. Please try again.');
      }
    });
  
    // Move a tenant
    document.getElementById('move-tenant-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const tenantID = document.getElementById('tenantIDToMove').value;
      const newApartment = document.getElementById('newApartment').value;
      try {
        const response = await fetch(`http://localhost:9000/api/manager/move-tenant/${tenantID}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newApartment }),
        });
        const result = await response.json();
        alert(result.message || 'Tenant moved successfully!');
      } catch (error) {
        alert('Failed to move tenant. Please try again.');
      }
    });
  
    // Delete a tenant
    document.getElementById('delete-tenant-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const tenantID = document.getElementById('tenantIDToDelete').value;
      try {
        const response = await fetch(`http://localhost:9000/api/manager/delete-tenant/${tenantID}`, {
          method: 'DELETE',
        });
        const result = await response.json();
        alert(result.message || 'Tenant deleted successfully!');
      } catch (error) {
        alert('Failed to delete tenant. Please try again.');
      }
    });
  });  