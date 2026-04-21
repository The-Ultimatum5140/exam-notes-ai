import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { serverUrl } from "../App";
import axios from "axios";

const Pricing = () => {
  const navigate = useNavigate();

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payingAmount, setPayingAmount] = useState(null);

  const plans = [
    {
      title: "Starter",
      price: "₹49",
      amount: 49,
      credits: 50,
      features: ["Basic Notes", "Limited Charts"],
    },
    {
      title: "Pro",
      price: "₹99",
      amount: 99,
      credits: 150,
      features: ["Advanced Notes", "Charts + Diagrams"],
      popular: true,
    },
    {
      title: "Premium",
      price: "₹199",
      amount: 199,
      credits: 400,
      features: ["All Features", "Priority AI"],
    },
  ];

  const handleBuy = async (amount) => {
  try {
    const { data } = await axios.post(
      serverUrl + "/api/payment/create-order",
      { amount },
      { withCredentials: true }
    );

    const options = {
      key: "rzp_test_SGjtbv3hTnNJXq",
      amount: data.amount,
      currency: "INR",
      name: "ExamNotes AI",
      description: "Buy Credits",
      order_id: data.id,

      handler: async function (response) {
        await axios.post(
          serverUrl + "/api/payment/verify",
          {
            ...response,
            amount,
          },
          { withCredentials: true }
        );

        alert("Payment Success 🚀");
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-10">
      {/*  BACK */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 bg-white text-black rounded-lg"
      >
        ⬅ Back
      </button>

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-10"
      >
        Choose a plan that meets your study needs 🚀
      </motion.h1>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <PricingCard
            key={plan.amount}
            {...plan}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            onBuy={handleBuy}
            paying={paying}
            payingAmount={payingAmount}
          />
        ))}
      </div>
    </div>
  );
};

function PricingCard({
  title,
  price,
  amount,
  credits,
  features,
  popular,
  selectedPrice,
  setSelectedPrice,
  onBuy,
  paying,
  payingAmount,
}) {
  const isSelected = selectedPrice === amount;
  const isPayingThis = paying && payingAmount === amount;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={() => setSelectedPrice(amount)}
      className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 
      ${
        isSelected
          ? "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl scale-105"
          : "bg-white/10 border border-white/20"
      }`}
    >
      {/*  POPULAR */}
      {popular && (
        <span className="absolute top-3 right-3 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full">
          ⭐ Popular
        </span>
      )}

      {/* TITLE */}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      {/* PRICE */}
      <p className="text-3xl font-bold mb-2">{price}</p>

      <p className="mb-4 text-sm opacity-80">{credits} Credits</p>

      {/* FEATURES */}
      <ul className="mb-6 space-y-1 text-sm">
        {features.map((f, i) => (
          <li key={i}>✔ {f}</li>
        ))}
      </ul>

      {/* BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // important
          onBuy(amount);
        }}
        disabled={isPayingThis}
        className="w-full py-2 rounded-lg bg-black text-white font-medium"
      >
        {isPayingThis ? "Processing..." : "Buy Now"}
      </button>
    </motion.div>
  );
}

export default Pricing;
