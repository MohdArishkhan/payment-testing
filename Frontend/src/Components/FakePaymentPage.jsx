// src/Components/FakePaymentPage.jsx
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FakePaymentPage = () => {
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/payment/create-order');

      const options = {
        key: 'rzp_test_MVF2JZXNexqxaE', // Replace with your test key
        amount: 10000,
        currency: 'INR',
        name: 'Demo Shop',
        description: 'Test Payment',
        order_id: data.orderId,
        handler: function (response) {
          navigate('/success');
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      navigate('/failure');
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Fake Payment Page</h2>
        <p>Click below to simulate Razorpay test payment.</p>
        <button className="btn-primary" onClick={handlePayment}>
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default FakePaymentPage;
