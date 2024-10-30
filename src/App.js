import { formatInTimeZone } from "date-fns-tz";
import React, { useEffect, useState } from "react";
import "./index.css";

const TimeApp = () => {
  const [utcTime, setUtcTime] = useState(new Date());
  const [timezone, setTimezone] = useState("Asia/Dhaka"); // Default to BDT

  // Update UTC time every second
  useEffect(() => {
    const timer = setInterval(() => setUtcTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format UTC time
  const formattedUTCTime = utcTime
    .toISOString()
    .substring(0, 19)
    .replace("T", " ");
  const formattedUTCDay = utcTime.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "UTC",
  });

  // Convert to selected time zone
  const formattedLocalTime = formatInTimeZone(
    utcTime,
    timezone,
    "yyyy-MM-dd hh:mm:ss a"
  );
  const formattedLocalDay = formatInTimeZone(utcTime, timezone, "EEEE");

  // Function to calculate offset from UTC
  const getUTCOffset = (timeZone) => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour12: false,
      timeZoneName: "shortOffset",
    });
    const parts = formatter.formatToParts(now);
    const offsetPart = parts.find((part) => part.type === "timeZoneName");
    return offsetPart ? offsetPart.value : "";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-6 drop-shadow-lg">
        Time Conversion App
      </h1>

      {/* Display UTC Time */}
      <div className="card text-center p-4 mb-4 bg-white bg-opacity-20 rounded-md shadow-lg backdrop-blur-md">
        <h2 className="text-2xl font-semibold mb-2">UTC Time</h2>
        <p className="text-lg">{formattedUTCTime}</p>
        <p className="text-md">{formattedUTCDay}</p>
      </div>

      {/* Display Local Time for Selected Timezone */}
      <div className="card text-center p-4 mb-4 bg-white bg-opacity-20 rounded-md shadow-lg backdrop-blur-md">
        <h2 className="text-2xl font-semibold mb-2">{timezone} Time</h2>
        <p className="text-lg">{formattedLocalTime}</p>
        <p className="text-md">{formattedLocalDay}</p>
      </div>

      {/* Dropdown to Select Timezone */}
      <select
        className="p-2 border rounded-md bg-white bg-opacity-20 backdrop-blur-md shadow-md text-gray-900 mt-4 transition-transform duration-500 ease-in-out"
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
      >
        <option value="Europe/London">
          Greenwich Mean Time (GMT) {getUTCOffset("Europe/London")}
        </option>
        <option value="America/Los_Angeles">
          Pacific Standard Time (PST) {getUTCOffset("America/Los_Angeles")}
        </option>
        <option value="America/New_York">
          Eastern Standard Time (EST) {getUTCOffset("America/New_York")}
        </option>
        <option value="Asia/Shanghai">
          China Standard Time (CST) {getUTCOffset("Asia/Shanghai")}
        </option>
        <option value="Asia/Dhaka">
          Bangladesh Time (BDT) {getUTCOffset("Asia/Dhaka")}
        </option>
        <option value="Asia/Kolkata">
          India Standard Time (IST) {getUTCOffset("Asia/Kolkata")}
        </option>
        <option value="Asia/Tokyo">
          Japan Standard Time (JST) {getUTCOffset("Asia/Tokyo")}
        </option>
        <option value="Australia/Sydney">
          Australian Eastern Daylight Time (AEDT){" "}
          {getUTCOffset("Australia/Sydney")}
        </option>
        <option value="Europe/London">
          British Summer Time (BST) {getUTCOffset("Europe/London")}
        </option>
      </select>
    </div>
  );
};

export default TimeApp;
