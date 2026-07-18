import "./Features.css";
import FeatureCard from "./FeatureCard";

import {
  FaBrain,
  FaBolt,
  FaChartLine,
  FaLock,
  FaGlobe,
  FaBullseye,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaBrain />,
      title: "AI Decision Engine",
      desc: "Advanced AI analyzes multiple future outcomes before you make a decision.",
    },

    {
      icon: <FaBolt />,
      title: "Instant Simulation",
      desc: "Generate powerful simulations and predictions within seconds.",
    },

    {
      icon: <FaChartLine />,
      title: "Interactive Analytics",
      desc: "Understand every outcome with clean charts and visual insights.",
    },

    {
      icon: <FaLock />,
      title: "Secure & Private",
      desc: "Your personal simulations stay completely safe and encrypted.",
    },

    {
      icon: <FaGlobe />,
      title: "Multiple Scenarios",
      desc: "Compare different decisions side by side for better planning.",
    },

    {
      icon: <FaBullseye />,
      title: "Smart Recommendations",
      desc: "AI suggests the most effective path based on your goals.",
    },
  ];

  return (
    <section className="features">
      <div className="features-title">
        <span>WHY CHOOSE FUTURESIM AI</span>

        <h2>Powerful AI Features</h2>

        <p>
          Everything you need to simulate smarter decisions and explore multiple
          future possibilities.
        </p>
      </div>

      <div className="features-grid">
        {features.map((item, index) => (
          <FeatureCard
            key={index}
            icon={item.icon}
            title={item.title}
            desc={item.desc}
          />
        ))}
      </div>
    </section>
  );
}

export default Features;
