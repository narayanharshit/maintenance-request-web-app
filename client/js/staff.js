document.getElementById('staff-link').addEventListener('click', async () => {
    document.getElementById('content').innerHTML = `
      <h2>Staff Portal</h2>
      <div>
        <label for="filter-apartment">Filter by Apartment:</label>
        <input type="text" id="filter-apartment">
        <label for="filter-status">Filter by Status:</label>
        <select id="filter-status">
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button id="apply-filters">Apply Filters</button>
      </div>
      <table id="requests-table" border="1">
        <thead>
          <tr>
            <th>Apartment</th>
            <th>Area</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `;
  
    // Load all requests
    const loadRequests = async (filters = {}) => {
      try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`http://localhost:9000/api/staff/view-requests?${queryParams}`);
        const requests = await response.json();
  
        const tableBody = document.querySelector('#requests-table tbody');
        tableBody.innerHTML = '';
  
        requests.forEach((request) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${request.apartment}</td>
            <td>${request.area}</td>
            <td>${request.description}</td>
            <td>${request.status}</td>
            <td>
              ${request.status === 'pending' ? `<button class="mark-completed" data-id="${request._id}">Mark Completed</button>` : ''}
            </td>
          `;
          tableBody.appendChild(row);
        });
  
        // Add event listeners to "Mark Completed" buttons
        document.querySelectorAll('.mark-completed').forEach((button) => {
          button.addEventListener('click', async () => {
            const requestId = button.dataset.id;
            await fetch(`http://localhost:9000/api/staff/update-request/${requestId}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ status: 'completed' }),
            });
            alert('Request marked as completed!');
            loadRequests(filters);
          });
        });
      } catch (error) {
        console.error('Failed to load requests:', error);
      }
    };
  
    // Apply filters
    document.getElementById('apply-filters').addEventListener('click', () => {
      const filters = {
        apartment: document.getElementById('filter-apartment').value,
        status: document.getElementById('filter-status').value,
      };
      loadRequests(filters);
    });
  
    // Initial load
    loadRequests();
  });
  