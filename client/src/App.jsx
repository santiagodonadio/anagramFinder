import { useState } from 'react';

export default function App() {
  const [word, setWord] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAnagrams = async () => {
    if (!word) return;
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const res = await fetch(`http://localhost:3001/anagrams?word=${word}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResults(data.anagrams);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Anagram Finder</h1>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter a word"
        className="border p-2 rounded mb-2 w-full max-w-md"
      />
      <button
        onClick={fetchAnagrams}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Find Anagrams
      </button>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-600">Error: {error}</p>}

      {results.length > 0 && (
        <div className="mt-4 w-full max-w-md">
          <h2 className="font-semibold mb-2">Anagrams:</h2>
          <ul className="list-disc list-inside">
            {results.map((w, idx) => (
              <li key={idx}>{w}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

