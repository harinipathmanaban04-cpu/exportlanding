import Reveal from './Reveal';
import CountUp from './CountUp';

export default function Strip() {
  const metrics = [
    {
      value: 8,
      suffix: '',
      label: 'stages from enquiry to payment',
    },
    {
      value: 5,
      suffix: '+',
      label: 'currencies including INR',
    },
    {
      value: 6,
      suffix: '',
      label: 'Incoterms supported',
    },
    {
      value: 3,
      suffix: '',
      label: 'transport modes tracked',
    },
  ];

  return (
    <section className="strip" aria-label="Key export metrics">
      <Reveal className="wrap" as="div">
        <div className="strip-card">
          {metrics.map((m, idx) => (
            <div className="strip-col" key={idx}>
              <div className="strip-num-wrap">
                <span className="strip-big-num">
                  <CountUp end={m.value} />
                </span>
                {m.suffix && <span className="strip-suffix">{m.suffix}</span>}
              </div>
              <span className="strip-small-label">{m.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
