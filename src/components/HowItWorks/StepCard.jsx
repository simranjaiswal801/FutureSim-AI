function StepCard({ number, title, desc }) {
  return (
    <div className="step-card">
      <div className="step-number">{number}</div>

      <h3>{title}</h3>

      <p>{desc}</p>
    </div>
  );
}

export default StepCard;
