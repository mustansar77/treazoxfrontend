"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast, Toaster } from "react-hot-toast";

const BASE_URL = "https://treazoxbackend.vercel.app/api";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [openLevels, setOpenLevels] = useState({});
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) return;

    const fetchTeam = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users/team`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setTeam(data.team || []);

        // Dynamically open all levels collapsed initially
        const levels = {};
        data.team.forEach((member) => {
          levels[`level${member.level}`] = false;
        });
        setOpenLevels(levels);
      } catch (err) {
        toast.error(err.message || "Failed to fetch team");
      }
    };

    fetchTeam();
  }, [token]);

  const toggleLevel = (level) => {
    setOpenLevels((prev) => ({ ...prev, [level]: !prev[level] }));
  };

  // Group members by level
  const levels = {};
  team.forEach((member) => {
    if (!levels[member.level]) levels[member.level] = [];
    levels[member.level].push(member);
  });

  const renderMember = (member) => (
    <div
      key={member.referralCode}
      className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-2"
    >
      <p className="text-gray-900 dark:text-white font-semibold">{member.fullName}</p>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        Email: {member.email} | Balance: ${member.balance}
      </p>
    </div>
  );

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Toaster position="top-right" />
      <div className="max-w-[1170px] mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-primary dark:text-white text-center">
          My Team
        </h1>

        {[...Object.keys(levels)]
          .sort((a, b) => a - b)
          .map((lvl) => (
            <div className="mb-6" key={lvl}>
              <div
                className="flex justify-between items-center cursor-pointer py-4 px-3 rounded-[6px] mb-2 bg-gray-100 dark:bg-gray-800"
                onClick={() => toggleLevel(`level${lvl}`)}
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Level {lvl} - {lvl === "0" ? "You" : "Referrals"}
                </h2>
                <span className="text-gray-500 dark:text-gray-300">
                  {openLevels[`level${lvl}`] ? "-" : "+"}
                </span>
              </div>
              {openLevels[`level${lvl}`] && levels[lvl].map(renderMember)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Team;
