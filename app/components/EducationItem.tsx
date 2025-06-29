type Education = {
    school: string;
    degree: string;
    location: string;
    period: string;
    details: string[];
};

export default function EducationItem({ edu }: { edu: Education }) {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-3">
                <h3 className="font-semibold text-lg">{edu.degree}, {edu.school}</h3>
            </div>
            <p className="text-sm text-gray-500 mb-1">{edu.location} ({edu.period})</p>
            <ul className="list-disc pl-6 text-sm">
                {edu.details.map((line, i) => (
                    <li key={i}>
                        {line.startsWith("GitHub: ") ? (
                            <>
                                GitHub:&nbsp;
                                <a
                                    href={line.replace("GitHub: ", "").trim()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    {line.replace("GitHub: ", "").trim()}
                                </a>
                            </>
                        ) : (
                            line
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}