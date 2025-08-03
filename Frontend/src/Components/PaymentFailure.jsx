// src/Components/PaymentFailure.jsx
import { useNavigate } from 'react-router-dom';
import './Styles.css';

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="card failure">
        <h2>Payment Failed ❌</h2>
        <p>Something went wrong. Please try again.</p>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentFailure;
