import "./Hero.css";
import { FaArrowRight, FaPlay } from "react-icons/fa";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <span className="hero-badge">✨ AI Powered Decision Simulator</span>

        <h1>
          Simulate <span>Future.</span>
          <br />
          Decide <span>Smarter.</span>
        </h1>

        <p>
          Experience the power of AI-driven future simulation. Analyze multiple
          possibilities before making important life and career decisions.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Start Simulation
            <FaArrowRight />
          </button>

          <button className="secondary-btn">
            <FaPlay />
            Watch Demo
          </button>
        </div>
      </div>

      <div className="hero-right">
        <div className="floating-card card-one">
          <div className="status-dot"></div>

          <div>
            <h4>Prediction</h4>
            <span>98% Success</span>
          </div>
        </div>

        <div className="floating-card card-two">
          <div className="status-dot purple"></div>

          <div>
            <h4>AI Models</h4>
            <span>12 Running</span>
          </div>
        </div>

        <div className="floating-card card-three">
          <div className="status-dot cyan"></div>

          <div>
            <h4>Scenarios</h4>
            <span>250+</span>
          </div>
        </div>
        <div className="ai-panel">
          <div className="ai-glow"></div>
          <div className="ai-circle"></div>

          <h3>Future Analysis</h3>

          <p>AI Prediction Accuracy</p>

          <h2>90%</h2>

          <div className="progress">
            <div className="progress-fill"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
