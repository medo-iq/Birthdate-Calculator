import React, { useState, useEffect } from "react";
import { subYears } from "date-fns";
import Select from "react-select";
import "./App.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    
    <footer className="footer">
      <p>&copy; {currentYear} MEDO. All rights reserved.</p>
      <p>
        Developed by{" "}
        <a
          href="https://twitter.com/od_331"
          target="_blank"
          rel="noopener noreferrer"
        >
          Medo
        </a>
      </p>
    </footer>
  );
}
function App() {
  const [age, setAge] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(
    () =>
      JSON.parse(localStorage.getItem("selectedLanguage")) || {
        value: "en",
        label: "English",
      }
  );
  const [showNotification, setShowNotification] = useState(false);

  const calculateBirthdate = () => {
    try {
      const today = new Date();
      const calculatedBirthdate = subYears(today, parseInt(age));

      if (!Number.isInteger(calculatedBirthdate.getTime())) {
        throw new Error("Invalid calculation result.");
      }

      setBirthdate(
        calculatedBirthdate.toLocaleDateString(selectedLanguage.value, {
          year: "numeric",
        })
      );

      setShowNotification(true);
    } catch (error) {
      console.error("Error calculating birthdate:", error);
    }
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "ar", label: "العربية" },
  ];

  useEffect(() => {
    localStorage.setItem("selectedLanguage", JSON.stringify(selectedLanguage));
  }, [selectedLanguage]);

  const isAgeValid = age.trim() !== "" && !isNaN(age);

  return (
    <div className="App">
      <div className="language-switch">
        <Select
          options={languageOptions}
          value={selectedLanguage}
          onChange={(selectedOption) => setSelectedLanguage(selectedOption)}
        />
      </div>
      <h1 className="app-title">
        {selectedLanguage.value === "en"
          ? "Calculator converting age to date of birth"
          : "آلة حاسبة لتحويل العمر إلى تاريخ الميلاد"}
      </h1>
      <label>
        {selectedLanguage.value === "en"
          ? "Enter your age :  "
          : "أدخل عمرك:   "}
      </label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button
        className="calculate-button"
        onClick={calculateBirthdate}
        disabled={!isAgeValid}
      >
        {selectedLanguage.value === "en"
          ? "Calculate Birthdate"
          : "حساب تاريخ الميلاد"}
      </button>

      {showNotification && (
        <div className="notification">
          <h2>
            {selectedLanguage.value === "en"
              ? "Your Birth Year is:"
              : "سنة ميلادك هي:"}{" "}
            {birthdate}
          </h2>
          <button className="close-button" onClick={closeNotification}>
            {selectedLanguage.value === "en" ? "X" : "X"}
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
