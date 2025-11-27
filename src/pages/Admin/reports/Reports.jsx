import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Reports() {
  const navigate = useNavigate();
  const [openStudent, setOpenStudent] = useState(true);
  const [openFinance, setOpenFinance] = useState(true);

  return (
    <div className="space-y-6 p-6">
      <h2 className="mb-4 text-2xl font-semibold">Reports</h2>

      {/* STUDENT REPORTS */}
      <div className="rounded-lg bg-white shadow">
        <button
          onClick={() => setOpenStudent(!openStudent)}
          className="flex w-full items-center justify-between border-b px-6 py-4 font-semibold text-teal-700"
        >
          <span>Student Reports</span>
          {openStudent ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {openStudent && (
          <div className="grid grid-cols-1 gap-6 p-6 text-sm md:grid-cols-4">
            {/* General */}
            <div>
              <h3 className="mb-2 font-semibold text-gray-700">General</h3>
              <ul className="space-y-1">
                <li
                  onClick={() => navigate("/admin/reports/student-activity-report")}
                  className="cursor-pointer hover:text-teal-600"
                >
                  Student Activity report
                </li>
                <li className="cursor-pointer hover:text-teal-600">Student Age report</li>
                <li className="cursor-pointer hover:text-teal-600">Student Contact Report</li>
              </ul>
            </div>

            {/* Medical */}
            <div>
              <h3 className="mb-2 font-semibold text-gray-700">Medical</h3>
              <ul className="space-y-1">
                <li className="cursor-pointer hover:text-teal-600">Student Medication Report</li>
                <li className="cursor-pointer hover:text-teal-600">Student Allergy Report</li>
              </ul>
            </div>

            {/* Learning */}
            <div>
              <h3 className="mb-2 font-semibold text-gray-700">Learning</h3>
              <ul className="space-y-1">
                <li className="cursor-pointer hover:text-teal-600">Current Milestone Status Report</li>
                <li className="cursor-pointer hover:text-teal-600">Student Progress Report</li>
                <li className="cursor-pointer hover:text-teal-600">Observation Report</li>
              </ul>
            </div>

            {/* Attendance */}
            <div>
              <h3 className="mb-2 font-semibold text-gray-700">Attendance</h3>
              <ul className="space-y-1">
                <li className="cursor-pointer hover:text-teal-600">Attendance per Student</li>
                <li className="cursor-pointer hover:text-teal-600">Consolidated Attendance report</li>
                <li className="cursor-pointer hover:text-teal-600">Daily Attendance report</li>
                <li className="cursor-pointer hover:text-teal-600">Monthly Attendance report</li>
                <li className="cursor-pointer hover:text-teal-600">Period Attendance report</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* FINANCE REPORTS */}
      <div className="rounded-lg bg-white shadow">
        <button
          onClick={() => setOpenFinance(!openFinance)}
          className="flex w-full items-center justify-between border-b px-6 py-4 font-semibold text-teal-700"
        >
          <span>Finance Reports</span>
          {openFinance ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {openFinance && (
          <div className="grid grid-cols-1 gap-6 p-6 text-sm md:grid-cols-4">
            {/* General */}
            <div>
              <h3 className="mb-2 font-semibold text-gray-700">General</h3>
              <ul className="space-y-1">
                <li className="cursor-pointer hover:text-teal-600">Reconciliation Report</li>
                <li className="cursor-pointer hover:text-teal-600">Ageing Report Summary</li>
                <li className="cursor-pointer hover:text-teal-600">Ageing Report Detailed</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
