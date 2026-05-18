import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loadRazorpayScript } from '../utils/loadScript'; // Adjust this import path to your project structure
import './CheckoutPage.css';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "Customer";

  // Accessing passed amount with a fallback if user accesses page directly
  const totalAmount = location.state?.totalAmount || 0;
  const [processing, setProcessing] = useState(false);

  const API_BASE_URL = "https://cartnova-6tap.onrender.com";

  const handlePayment = async () => {
    if (totalAmount <= 0) {
      toast.error("Invalid checkout value.");
      return;
    }

    setProcessing(true);

    // 1. Inject Razorpay standard client SDK
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      toast.error("Failed to load Razorpay connection layer. Are you online?");
      setProcessing(false);
      return;
    }

    try {
      // 2. Network handshake to create order entries across backing tables
      const createOrderResponse = await fetch(`${API_BASE_URL}/customer/payment/create-order`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (createOrderResponse.status === 401) {
        toast.error("Session expired. Please re-login.");
        navigate('/login');
        return;
      }

      const orderData = await createOrderResponse.json();

      if (!createOrderResponse.ok) {
        throw new Error(orderData.message || "Failed to provision external gateway intent.");
      }

      // 3. Configure Razorpay overlay widget options mapped directly from Spring Boot models
      const options = {
        key: orderData.keyId, 
        amount: orderData.amount, 
        currency: orderData.currency,
        name: "CartNova Store",
        description: "Secure Order Payment Checkout",
        order_id: orderData.razorpayOrderId, 
        handler: async function (response) {
          try {
            // 4. Secure signature verification callback stage to synchronize downstream tables
            const verifyResponse = await fetch(`${API_BASE_URL}/customer/payment/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({
                localOrderId: orderData.localOrderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature
              })
            });

            const verifyResult = await verifyResponse.json();

            if (!verifyResponse.ok) {
              throw new Error(verifyResult.message || "Cryptographic signature assertion failed.");
            }

            toast.success(verifyResult.message || "Transaction approved successfully!");
            navigate('/'); // Send customer back home after success
          } catch (error) {
            toast.error(error.message || "Error validating transaction parameters.");
          } finally {
            setProcessing(false);
          }
        },
        prefill: {
          name: username
        },
        theme: {
          color: "#2563eb" // Royal Blue matching modern UX standard
        },
        modal: {
          ondismiss: function () {
            toast.info("Payment window dismissed by user.");
            setProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      toast.error(error.message || "A network handling error disrupted connection initialization.");
      setProcessing(false);
    }
  };


  const isDirectBuy = location.state?.isDirectBuy || false;


  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h2>Order Confirmation Summary</h2>
        <hr className="divider" />
        <div className="summary-row">
          <span>Billing Account Identifier:</span>
          <strong>{username}</strong>
        </div>
        <div className="summary-row">
          <span>Grand Final Due Total:</span>
          <span className="grand-total">₹{totalAmount}</span>
        </div>
        
        <button 
          className="payment-action-btn" 
          onClick={handlePayment} 
          disabled={processing || totalAmount === 0}
        >
          {processing ? "Connecting Gateway..." : "PAY WITH RAZORPAY"}
        </button>
        
        {/* <button className="cancel-action-btn" onClick={() => navigate(-1)} disabled={processing}>
          Back To Modify Cart Items
        </button> */}


        <button 
          className="cancel-action-btn" 
          onClick={() => {
            if (isDirectBuy) {
              navigate(-1); // Sends them cleanly back to the product details/home screen
            } else {
              navigate('/cart'); // Regular flow goes back to cart
            }
          }} 
          disabled={processing}
        >
          {isDirectBuy ? "Cancel and Go Back" : "Back To Modify Cart Items"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;