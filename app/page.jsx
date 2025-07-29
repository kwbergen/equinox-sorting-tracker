'use client';

import React, { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    startTime: '',
    endTime: '',
    totalHours: '',
  });

  const endpoint = "https://script.google.com/a/macros/bergenlogistics.com/s/AKfycbyrlZzzUFhQPctfYZMgZaEFnFD-2u-xSoW-orK5IfXVgBObUwK9X5lZDfOre56QXgLO2A/exec";

  function calculateHours(start, end) {
    if (!start || !end) return '';
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);

    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    const diff = endTotalMinutes - startTotalMinutes;
    return (diff > 0 ? (diff / 60).toFixed(2) : '');
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
    e.preventDefault
