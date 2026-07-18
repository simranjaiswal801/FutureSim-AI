function FeatureCard({ icon, title, desc }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{desc}</p>

      <span className="learn-more">Learn More →</span>
    </div>
  );
}

export default FeatureCard;
