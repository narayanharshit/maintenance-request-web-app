document.getElementById('tenant-link').addEventListener('click', () => {
    document.getElementById('content').innerHTML = `
      <h2>Tenant Portal</h2>
      <form id="tenant-form">
        <label for="apartment">Apartment:</label>
        <input type="text" id="apartment" required><br><br>
        <label for="area">Area:</label>
        <input type="text" id="area" required><br><br>
        <label for="description">Description:</label>
        <textarea id="description" required></textarea><br><br>
        <label for="photo">Photo (URL):</label>
        <input type="text" id="photo"><br><br>
        <button type="submit">Submit Request</button>
      </form>
    `;
  
    document.getElementById('tenant-form').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const requestData = {
        apartment: document.getElementById('apartment').value,
        area: document.getElementById('area').value,
        description: document.getElementById('description').value,
        photo: document.getElementById('photo').value || null,
      };
  
      try {
        const response = await fetch('http://localhost:9000/api/tenant/submit-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData),
        });
  
        const result = await response.json();
        alert(result.message || 'Request submitted successfully!');
      } catch (error) {
        alert('Failed to submit request. Please try again.');
      }
    });
  });  