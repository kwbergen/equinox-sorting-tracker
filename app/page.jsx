'use client';
import { useState } from 'react';

// ✅ Your actual Web App URL is inserted below:
const endpoint = "https://script.google.com/a/macros/bergenlogistics.com/s/AKfycbyrlZzzUFhQPctfYZMgZaEFnFD-2u-xSoW-orK5IfXVgBObUwK9X5lZDfOre56QXgLO2A/exec";

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    startTime: '',
    endTime: '',
    totalHours: '',
  });

  function calculateHours(start, end) {
    if (!start || !end) return '';
    const startDate = new Date(`1970-01-01T${start}`);
    const endDate = new Date(`1970-01-01T${end}`);
    const diff = (endDate - startDate) / (1000 * 60 * 60); // convert ms to hours
    return diff > 0 ? diff.toFixed(2) : '';
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };

    if (name === 'startTime' || name === 'endTime') {
      updatedForm.totalHours = calculateHours(updatedForm.startTime, updatedForm.endTime);
    }

    setForm(updatedForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      alert('Submitted!');
      setForm({ name: '', startTime: '', endTime: '', totalHours: '' });
    } catch (error) {
      alert('Error submitting form. Please try again.');
    }
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Equinox Sorting Tracker</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <label>Name:<br />
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label><br /><br />
        <label>Start Time:<br />
          <input type="time" name="startTime" value={form.startTime} onChange={handleChange} required />
        </label><br /><br />
        <label>End Time:<br />
          <input type="time" name="endTime" value={form.endTime} onChange={handleChange} required />
        </label><br /><br />
        <label>Total Hours:<br />
          <input type="text" name="totalHours" value={form.totalHours} readOnly />
        </label><br /><br />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

