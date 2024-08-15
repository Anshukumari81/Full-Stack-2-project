// Function to fetch and display pizzas
function fetchPizzas() {
    fetch('http://localhost:5000/pizzas')
      .then(response => response.json())
      .then(data => {
        const app = document.getElementById('app');
        app.innerHTML = '<h2>All Pizzas</h2>';
        const ul = document.createElement('ul');
        data.pizzas.forEach(pizza => {
          const li = document.createElement('li');
          li.textContent = `${pizza.name} - $${pizza.price}`;
          ul.appendChild(li);
        });
        app.appendChild(ul);
      })
      .catch(error => console.error('Error fetching data:', error));
  }
  
  // Function to display home content
  function showHome() {
    const app = document.getElementById('app');
    app.innerHTML = '<h1>Welcome to Pizza Store</h1><p>Best pizzas in town!</p>';
  }
  
  // Function to display about content
  function showAbout() {
    const app = document.getElementById('app');
    app.innerHTML = '<h1>About Us</h1><p>Learn more about our story.</p>';
  }
  
  // Function to display add new pizza form
  function showAddNewItem() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <h2>Add New Pizza</h2>
      <form id="addForm">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input type="number" id="price" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Add Pizza</button>
      </form>
    `;
    
    document.getElementById('addForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const price = document.getElementById('price').value;
      fetch('http://localhost:5000/pizzas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price: parseFloat(price) })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Pizza added:', data);
        fetchPizzas(); // Refresh the list of pizzas
      })
      .catch(error => console.error('Error adding pizza:', error));
    });
  }
  
  // Function to display contact content
  function showContact() {
    const app = document.getElementById('app');
    app.innerHTML = '<h1>Contact Us</h1><p>Get in touch with us.</p>';
  }
  
  // Main function to handle navigation
  function handleNavigation() {
    const hash = window.location.hash || '#home';
    switch (hash) {
      case '#home':
        showHome();
        break;
      case '#about':
        showAbout();
        break;
      case '#items':
        fetchPizzas();
        break;
      case '#add':
        showAddNewItem();
        break;
      case '#contact':
        showContact();
        break;
      default:
        showHome();
    }
  }
  
  // Set up initial page
  window.addEventListener('hashchange', handleNavigation);
  window.addEventListener('load', handleNavigation);
  