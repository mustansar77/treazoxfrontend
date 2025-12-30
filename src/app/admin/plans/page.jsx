"use client";

import React, { useState } from "react";
import Plans from "../components/Plans";

const Page = () => {
  // ======================
  // Dummy Stats
  // ======================
  const [stats] = useState({
    totalPlans: 5,
    activePlans: 3,
  });

  const cards = [
    {
      title: "Total Plans",
      value: stats.totalPlans,
      color: "bg-blue-500",
    },
    {
      title: "Active Plans",
      value: stats.activePlans,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Admin Plans
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-lg text-white ${card.color} flex flex-col justify-between`}
          >
            <h2 className="text-lg font-medium">{card.title}</h2>
            <p className="mt-4 text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <Plans />
    </div>
  );
};

export default Page;
