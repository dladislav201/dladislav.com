'use client';

import { useState, useEffect } from 'react';

export function TimeDisplay({ date }: { date: Date }) {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    setFormattedTime(date.toLocaleTimeString());
  }, [date]);

  return formattedTime;
}
