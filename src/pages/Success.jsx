import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./success.css";

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    
    const bookingDone = sessionStorage.getItem("bookingSuccess");
    if (!bookingDone) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.removeItem("bookingSuccess");
      navigate("/");
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="tick"></div>
        <h1>Booking Confirmed!</h1>
        <p>You’ll be redirected shortly...</p>

        <button onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    </div>
  );
}
