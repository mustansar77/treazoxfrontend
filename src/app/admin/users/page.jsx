"use client";

import React, { useState } from "react";
import Allusers from "../components/Allusers";

const Page = () => {
  // ======================
  // Dummy Stats
  // ======================
  const [userStats] = useState({
    totalUsers: 120,
    activeUsers: 85,
    inactiveUsers: 25,
    premiumUsers: 10,
  });

  const cards = [
    { title: "Total Users", value: userStats.totalUsers, color: "bg-blue-500" },
    { title: "Active Users", value: userStats.activeUsers, color: "bg-green-500" },
    { title: "Inactive Users", value: userStats.inactiveUsers, color: "bg-yellow-500" },
    { title: "Premium Users", value: userStats.premiumUsers, color: "bg-red-500" },
  ];

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Admin Users
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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

      <Allusers />
    </div>
  );
};

export default Page;
