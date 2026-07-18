import "./HowItWorks.css";
import StepCard from "./StepCard";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Choose a Scenario",
      desc: "Select the decision or situation you want AI to simulate.",
    },
    {
      number: "02",
      title: "Run AI Simulation",
      desc: "FutureSim AI analyzes thousands of possible outcomes.",
    },
    {
      number: "03",
      title: "Compare Results",
      desc: "Visualize different future paths and compare every possibility.",
    },
    {
      number: "04",
      title: "Make Smart Decisions",
      desc: "Use AI insights to confidently choose the best option.",
    },
  ];

  return (
    <section className="how">
      <div className="how-title">
        <span>HOW IT WORKS</span>

        <h2>Simple Process. Powerful Results.</h2>

        <p>
          FutureSim AI helps you explore different possibilities before making
          important decisions.
        </p>
      </div>

      <div className="steps">
        {steps.map((step, index) => (
          <StepCard
            key={index}
            number={step.number}
            title={step.title}
            desc={step.desc}
          />
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
