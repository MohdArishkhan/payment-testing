import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PayPage from './Components/payPage.jsx';
import FakePaymentPage from './Components/FakePaymentPage.jsx';
import PaymentSuccess from './Components/PaymentSuccess.jsx';
import PaymentFailure from './Components/PaymentFailure.jsx';

function App() {
  return (
      <Routes>
        <Route path="/" element={<PayPage />} />
        <Route path="/fake-payment" element={<FakePaymentPage />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/failure" element={<PaymentFailure />} />
      </Routes>
  );
}

export default App;