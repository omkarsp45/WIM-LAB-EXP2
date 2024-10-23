document.getElementById('paymentForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = {
        name: document.querySelector('input[name="name"]').value,
        email: document.querySelector('input[name="email"]').value,
        studentId: document.querySelector('input[name="studentId"]').value,
        course: document.querySelector('input[name="course"]').value,
        semester: document.querySelector('select[name="semester"]').value,
        paymentMethod: document.querySelector('select[name="paymentMethod"]').value,
        amount: document.querySelector('input[name="amount"]').value
    };

    try {
        const response = await fetch('http://localhost:3000/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        alert(result.message);

        if (response.ok) {
            // Add success message or animation
            document.querySelector('.payment-form').innerHTML = '<h3>Payment Successful! Check your email for the receipt.</h3>';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Payment failed. Please try again.');
    }
});
