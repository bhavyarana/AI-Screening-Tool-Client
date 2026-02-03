export default function CandidateTranscript({ transcript }) {
  if (!transcript || !transcript.length) {
    return <p className="text-sm text-gray-500">No transcription available.</p>;
  }

  return (
    <div className="space-y-6">
      {transcript.map((item) => (
        <div key={item.index} className="border rounded p-4 bg-gray-50">
          <p className="font-semibold text-sm mb-2">
            Q{item.index}. {item.question}
          </p>

          <p className="text-sm text-gray-800 whitespace-pre-wrap">
            <span className="font-medium">Answer:</span> {item.answer}
          </p>

          {item.duration ? (
            <p className="text-xs text-gray-500 mt-2">
              Duration: {item.duration}s
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
