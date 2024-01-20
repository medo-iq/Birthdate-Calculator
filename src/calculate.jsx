// calculate.jsx

import React, { useState } from "react";

const AgeToBirthdateConverter = () => {
  const [age, setAge] = useState(0);
  const [birthYear, setBirthYear] = useState(null);

  const calculateBirthYear = () => {
    const currentYear = new Date().getFullYear();
    const calculatedBirthYear = currentYear - age;
    setBirthYear(calculatedBirthYear);
  };

  return (
    <div>
      <h2>حاسبة تحويل العمر إلى تاريخ ميلاد</h2>
      <label>
        العمر:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </label>
      <button onClick={calculateBirthYear}>احسب تاريخ الميلاد</button>

      {birthYear !== null && <p>تاريخ الميلاد المقدر: {birthYear}</p>}
    </div>
  );
};

export default AgeToBirthdateConverter;
