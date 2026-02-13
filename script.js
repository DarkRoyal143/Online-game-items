let currentProduct = '';

function buyNow(product, price) {
    currentProduct = { name: product, price: price };
    document.getElementById('paymentDetails').innerHTML = 
        `<p>Product: ${product}</p>
         <p>Amount: ₹${price}</p>`;
    document.getElementById('paymentModal').style.display = 'block';
    document.getElementById('amount').value = price;
    document.getElementById('productinfo').value = product;
}

// Close modal
document.querySelector('.close').onclick = function() {
    document.getElementById('paymentModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('paymentModal')) {
        document.getElementById('paymentModal').style.display = 'none';
    }
}

// Form submission
document.getElementById('payuForm').onsubmit = function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('emailInput').value;
    const phone = document.getElementById('phoneInput').value;
    const gameId = document.getElementById('gameId').value;
    const amount = currentProduct.price;
    const productName = currentProduct.name;
    
    if(!name || !email || !phone || !gameId) {
        alert('Please fill all fields');
        return;
    }
    
    // Set PayU form values
    const txnid = 'TXN' + Date.now() + Math.random().toString(36).substring(7);
    
    document.getElementById('txnid').value = txnid;
    document.getElementById('firstname').value = name;
    document.getElementById('email').value = email;
    document.getElementById('phone').value = phone;
    
    // Store order in localStorage
    const order = {
        txnid: txnid,
        product: productName,
        amount: amount,
        name: name,
        email: email,
        phone: phone,
        gameId: gameId,
        date: new Date().toISOString()
    };
    
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // For demo/testing - redirect to success
    alert(`Order placed successfully!\nTransaction ID: ${txnid}\nProduct: ${productName}\nAmount: ₹${amount}`);
    
    // In production, uncomment below line to redirect to PayU
    // this.submit();
    
    document.getElementById('paymentModal').style.display = 'none';
}

// Success page handler
function handleSuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const txnid = urlParams.get('txnid');
    const status = urlParams.get('status');
    
    if(status === 'success') {
        alert('Payment Successful! Your order will be delivered soon.');
    }
}
