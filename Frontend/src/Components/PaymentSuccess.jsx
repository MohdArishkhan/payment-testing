// src/Components/PaymentSuccess.jsx
import './Styles.css';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="card success">
        <h2>Payment Successful ✅</h2>
        <p>Thank you for your payment.</p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
