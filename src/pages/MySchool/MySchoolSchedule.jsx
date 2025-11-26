import React, { useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const hours = ["8:00-9:00", "9:00-10:00", "10:00-11:00", "11:00-12:00"];

const initialSchedule = [
  { day: "Monday", hour: "8:00-9:00", class: "KG1", teacher: "Ahmed Khalid" },
  { day: "Tuesday", hour: "9:00-10:00", class: "KG2", teacher: "Fatima Omar" },
];

const MySchoolSchedule = () => {
  const [schedule, setSchedule] = useState(initialSchedule);

  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-semibold text-primary">Schedule / Timetable</h2>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full table-auto border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Time</th>
              {days.map((d) => (
                <th key={d} className="px-4 py-2">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((h) => (
              <tr key={h} className="border-b">
                <td className="px-4 py-2 font-medium">{h}</td>
                {days.map((d) => {
                  const entry = schedule.find((s) => s.day === d && s.hour === h);
                  return (
                    <td key={d} className="px-4 py-2 text-center">
                      {entry ? (
                        <div className="rounded bg-blue-100 px-2 py-1">
                          <p className="font-semibold">{entry.class}</p>
                          <p className="text-sm">{entry.teacher}</p>
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySchoolSchedule;
