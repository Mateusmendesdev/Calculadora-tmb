import React, { useState } from 'react';
import './TmbCalculator.css';

function TmbCalculator() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [tmb, setTmb] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [dietRecommendation, setDietRecommendation] = useState(null);

  const getDietRecommendation = (imcFeedback) => {
    if (imcFeedback.includes("obeso")) {
      return {
        title: "Dieta para Perda de Peso",
        recommendations: [
          "Reduzir a ingestão de carboidratos refinados e açúcares.",
          "Aumentar a ingestão de proteínas magras como frango, peixe e tofu.",
          "Comer pelo menos 5 porções de frutas e vegetais todos os dias.",
          "Evitar bebidas açucaradas e álcool.",
          "Beber pelo menos 2 litros de água por dia.",
          "Evitar alimentos processados e fast food."
        ]
      };
    } else if (imcFeedback.includes("abaixo do peso")) {
      return {
        title: "Dieta para Ganho de Massa Muscular",
        recommendations: [
          "Aumentar a ingestão de proteínas: carne, ovos, produtos lácteos.",
          "Comer mais refeições por dia e incluir lanches saudáveis.",
          "Aumentar a ingestão de carboidratos saudáveis como batatas, arroz e aveia.",
          "Fazer exercícios de resistência para ajudar a construir músculos.",
          "Adicionar smoothies ou shakes de proteína à dieta.",
          "Consumir gorduras saudáveis, como abacates, nozes e azeite."
        ]
      };
    } else {
      return null;
    }
  }

  const calculateTmb = () => {
    let result;
    if (gender === "male") {
      result = 66 + (6.2 * weight) + (12.7 * (height / 2.54)) - (6.76 * age);
    } else {
      result = 655.1 + (4.35 * weight) + (4.7 * (height / 2.54)) - (4.7 * age);
    }
    setTmb(result.toFixed(2));

    const heightInMeters = height / 100;
    const imc = weight / (heightInMeters * heightInMeters);
    let imcFeedback = "";

    if (imc < 18.5) {
      imcFeedback = "Você está abaixo do peso.";
    } else if (imc < 24.9) {
      imcFeedback = "Você está com um peso saudável.";
    } else if (imc < 29.9) {
      imcFeedback = "Você está com sobrepeso.";
    } else {
      imcFeedback = "Você está obeso.";
    }

    const pesoIdeal = 22.5 * (heightInMeters * heightInMeters);
    const diferencaPeso = pesoIdeal - weight;

    imcFeedback += ` Seu peso ideal é de aproximadamente ${pesoIdeal.toFixed(2)} kg.`;
    if (diferencaPeso > 0) {
      imcFeedback += ` Você deve considerar ganhar cerca de ${diferencaPeso.toFixed(2)} kg.`;
    } else if (diferencaPeso < 0) {
      imcFeedback += ` Você deve considerar perder cerca de ${Math.abs(diferencaPeso).toFixed(2)} kg.`;
    } else {
      imcFeedback += " Você está exatamente no seu peso ideal. Parabéns!";
    }

    setFeedback(imcFeedback);

    // Chamada à função para obter recomendação de dieta
    const diet = getDietRecommendation(imcFeedback);
    setDietRecommendation(diet);
  }

  return (
    <div className="tmb-container">
      <h2>Calculadora TMB e IMC</h2>
      <input type="number" placeholder="Idade" value={age} onChange={e => setAge(e.target.value)} />
      <input type="number" placeholder="Peso (kg)" value={weight} onChange={e => setWeight(e.target.value)} />
      <input type="number" placeholder="Altura (cm)" value={height} onChange={e => setHeight(e.target.value)} />
      <select value={gender} onChange={e => setGender(e.target.value)}>
        <option value="male">Masculino</option>
        <option value="female">Feminino</option>
      </select>
      <button onClick={calculateTmb}>Calcular</button>
      {tmb && <p>Sua TMB é: {tmb} calorias/dia</p>}
      {feedback && <p>{feedback}</p>}
      {dietRecommendation && (
        <div className="diet-section">
          <h3>{dietRecommendation.title}</h3>
          <ul>
            {dietRecommendation.recommendations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TmbCalculator;




