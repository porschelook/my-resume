type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
};

export default function ExperienceItem({ exp }: { exp: Experience }) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-lg">{exp.role}, {exp.company}</h3>
      <p className="text-sm text-gray-500 mb-1">{exp.location} ({exp.period})</p>
      <ul className="list-disc pl-6 text-sm">
        {exp.highlights.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}