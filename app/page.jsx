'use client';
import { useState } from 'react';

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', start: '', end: '' });

  function calculateHours(start, end) {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    return ((eh * 60 + em) - (sh * 60 + sm)) / 60;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const hours = calculateHours(form.start, form.end);
    setEntries([...entries, { ...form, hours }]);
    setForm({ name: '', start: '', end: '' });
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Equinox Sorting Time Tracker</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="border p-2 w-full" required placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="border p-2 w-full" required type="time" value={form.start} onChange={e => setForm({ ...form, start: e.target.value })} />
        <input className="border p-2 w-full" required type="time" value={form.end} onChange={e => setForm({ ...form, end: e.target.value })} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Start</th>
            <th className="border p-2">End</th>
            <th className="border p-2">Total Hours</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={i}>
              <td className="border p-2">{entry.name}</td>
              <td className="border p-2">{entry.start}</td>
              <td className="border p-2">{entry.end}</td>
              <td className="border p-2">{entry.hours.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
