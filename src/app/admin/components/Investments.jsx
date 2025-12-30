"use client";

import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

const ITEMS_PER_PAGE = 10;

const Investments = () => {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [page, setPage] = useState(1);

  const token = Cookies.get("token"); // kept for reference

  // Dummy investments
  const dummyInvestments = [
    {
      _id: "1",
      user: { fullName: "John Doe", email: "john@example.com" },
      price: 500,
      dailyEarning: 5,
      exchange: "Bitcoin",
      transactionId: "TRX12345",
      status: "processing",
    },
    {
      _id: "2",
      user: { fullName: "Jane Smith", email: "jane@example.com" },
      price: 1000,
      dailyEarning: 10,
      exchange: "Ethereum",
      transactionId: "TRX67890",
      status: "approved",
    },
    {
      _id: "3",
      user: { fullName: "Alice Johnson", email: "alice@example.com" },
      price: 250,
      dailyEarning: 2.5,
      exchange: "USDT",
      transactionId: "TRX11223",
      status: "processing",
    },
    // Add more dummy data as needed
  ];

  // Load dummy investments
  const fetchInvestments = () => {
    setLoading(true);
    setTimeout(() => {
      const pendingData = dummyInvestments.filter(i => i.status === "processing");
      const approvedData = dummyInvestments.filter(i => i.status === "approved");
      setPending(pendingData);
      setApproved(approvedData);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  // Approve / Reject actions (frontend only)
  const handleStatusUpdate = (inv, status) => {
    if (status === "approved") setApproved(prev => [...prev, { ...inv, status }]);
    setPending(prev => prev.filter(i => i._id !== inv._id));
    toast.success(`Investment ${status} (dummy)`);
  };

  const data = activeTab === "pending" ? pending : approved;
  const filtered = data.filter(inv =>
    inv.user?.email?.toLowerCase().includes(searchEmail.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="sm:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Investments</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <button
          onClick={() => { setActiveTab("pending"); setPage(1); }}
          className={`px-4 py-2 rounded ${activeTab === "pending" ? "bg-blue-600 text-white" : "bg-gray-300 dark:bg-gray-700 dark:text-white"}`}
        >
          Pending
        </button>
        <button
          onClick={() => { setActiveTab("approved"); setPage(1); }}
          className={`px-4 py-2 rounded ${activeTab === "approved" ? "bg-green-600 text-white" : "bg-gray-300 dark:bg-gray-700 dark:text-white"}`}
        >
          Approved
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by email..."
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
        className="mb-4 w-full sm:w-1/3 px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr className="dark:text-white">
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">User</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">Amount</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">Daily Earning</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">Deposit Exchange</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase">Trx Id</th>
              <th className="px-4 py-2 text-center text-xs font-medium uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center dark:text-white py-4">Loading investments...</td>
              </tr>
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center dark:text-white py-4">No data</td>
              </tr>
            ) : (
              paginated.map(inv => (
                <tr key={inv._id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{inv.user?.fullName}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">{inv.user?.email}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">${inv.price}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">${inv.dailyEarning}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">{inv.exchange}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-white">{inv.transactionId}</td>
                  <td className="px-4 py-2 text-center flex justify-center gap-2">
                    {activeTab === "pending" ? (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(inv, "approved")}
                          className="px-2 py-1 bg-green-500 text-white rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(inv, "rejected")}
                          className="px-2 py-1 bg-red-500 text-white rounded"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-green-500 font-semibold">Approved</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2 flex-wrap">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-300 dark:bg-gray-700 dark:text-white"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Investments;
