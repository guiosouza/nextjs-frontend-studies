"use client";
import React from "react";

function IdealHeartRate() {
  const [age, setAge] = React.useState(0);
  const [intensity, setIntensity] = React.useState("leve");
  const [idealHeartRateRange, setIdealHeartRate] = React.useState("0 e 0");

  const maxHeartRateRage = React.useMemo(() => 220 - age, [age]);

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= 0) {
      setAge(value);
    }
  };

  const handleIntensityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIntensity(event.target.value);
  };

  const handleCalculateIdealHeartRate = () => {
    if (age <= 0) return;

    let minHeartRate = 0;
    let maxHeartRate = 0;

    if (intensity === "leve") {
      minHeartRate = maxHeartRateRage * 0.5;
      maxHeartRate = maxHeartRateRage * 0.7;
    } else if (intensity === "moderado") {
      minHeartRate = maxHeartRateRage * 0.7;
      maxHeartRate = maxHeartRateRage * 0.8;
    } else if (intensity === "alto") {
      minHeartRate = maxHeartRateRage * 0.75;
      maxHeartRate = maxHeartRateRage * 0.85;
    }

    setIdealHeartRate(`${minHeartRate.toFixed(0)} e ${maxHeartRate.toFixed(0)}`);
  };

  return (
    <div>
      <label htmlFor="age-input">Idade</label>
      <input id="age-input" type="text" placeholder="Idade" onChange={handleAgeChange} />
      <label htmlFor="intensity-select">Intensidade</label>
      <select id="intensity-select" onChange={handleIntensityChange}>
        <option value="leve">Leve</option>
        <option value="moderado">Moderado</option>
        <option value="alto">Alto</option>
      </select>
      <button onClick={handleCalculateIdealHeartRate} disabled={age <= 0}>
        Calcular
      </button>
      <div>
        <h2>Resultado</h2>
        <p>
          {age > 0
            ? `Seu batimento cardíaco ideal é entre: ${idealHeartRateRange}`
            : "Por favor, insira uma idade válida."}
        </p>
      </div>
    </div>
  );
}

export default IdealHeartRate;
