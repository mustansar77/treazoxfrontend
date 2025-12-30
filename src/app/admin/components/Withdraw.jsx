"use client";

import React, { useState } from "react";

const WithdrawAdminPage = () => {
  const [withdraws, setWithdraws] = useState([
    {
      id: "1",
      userEmail: "user1@example.com",
      exchange: "Binance",
      network: "BSC",
      address: "0x1234567890abcdef",
      netAmount: 150,
      status: "pending",
    },
    {
      id: "2",
      userEmail: "user2@example.com",
      exchange: "Coinbase",
      network: "ETH",
      address: "0xabcdef1234567890",
      netAmount: 250,
      status: "processing",
    },
  ]);
  const [searchEmail, setSearchEmail] = useState("");
  const [activeTab, setActiveTab] = useState("pending"); // pending | processing | completed | rejected

  // ======================
  // Status Change (Frontend only)
  // ======================
  const handleStatusChange = (id, newStatus) => {
    setWithdraws((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: newStatus } : w))
    );
    alert(`Withdraw marked as ${newStatus}`);
  };

  // ======================
  // Filter Withdraws
  // ======================
  const filteredWithdraws = withdraws.filter(
    (w) =>
      w.status === activeTab &&
      w.userEmail.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        Withdraw Requests
      </h1>

      <input
        type="text"
        placeholder="Search by email..."
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
        className="w-full sm:w-1/3 px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
      />

      <div className="flex gap-2 mb-4 flex-wrap">
        {["pending", "processing", "completed", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <table className="min-w-[1100px] w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr className="text-primary dark:text-white">
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">#</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">User Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">Exchange</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">Network</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">Address</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">Amount</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">Status</th>
              <th className="px-4 py-2 text-center text-xs font-medium uppercase">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredWithdraws.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No withdraws in this tab
                </td>
              </tr>
            ) : (
              filteredWithdraws.map((item, index) => (
                <tr key={item.id} className="text-primary dark:text-white">
                  <td className="px-4 py-2 text-sm">{index + 1}</td>
                  <td className="px-4 py-2 text-sm">{item.userEmail}</td>
                  <td className="px-4 py-2 text-sm">{item.exchange}</td>
                  <td className="px-4 py-2 text-sm">{item.network}</td>
                  <td className="px-4 py-2 text-sm max-w-[220px] truncate font-mono">{item.address}</td>
                  <td className="px-4 py-2 text-sm font-semibold">${item.netAmount}</td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        item.status === "completed"
                          ? "bg-green-800 text-white"
                          : item.status === "processing"
                          ? "bg-yellow-400 text-black"
                          : item.status === "rejected"
                          ? "bg-red-600 text-white"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className="px-3 py-1 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                      disabled={item.status === "completed"}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawAdminPage;
