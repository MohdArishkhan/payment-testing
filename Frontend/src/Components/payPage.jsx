import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const PayPage = () => {
  const navigate = useNavigate();
  const handlePay = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/payment/createOrder', {
        amount: 1000,
      });
      console.log("🚀 Order ID from server:", data.orderId);

      const options = {
        key: 'rzp_test_MVF2JZXNexqxaE',
        amount: 1000,
        currency: 'INR',
        name: 'Demo Payment',
        description: 'Test Transaction',
        order_id: data.orderId,
        handler: async function (response) {
          try {
            const verificationRes = await axios.post('http://localhost:5000/api/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verificationRes.data.success) {
              navigate('/success');
            } else {
              navigate('/failure');
            }
          } catch (error) {
            console.error('Verification error:', error);
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', function () {
        navigate('/success');
      });

      rzp.open();

    } catch (error) {
      console.error('Error in payment:', error);
      navigate('/success');
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Pay Now</h2>
        <p>Click the button below to pay ₹100 using Razorpay test mode.</p>
        <button className="btn-primary" onClick={handlePay}>
          Pay ₹100
        </button>
      </div>
    </div>
  );
};

export default PayPage;
