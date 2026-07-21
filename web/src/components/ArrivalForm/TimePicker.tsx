import React from 'react';
import styles from './TimePicker.module.css';

interface TimePickerProps {
  label: string;
  value: string;
  onChange: (time: string) => void;
}

export function TimePicker({ label, value, onChange }: TimePickerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        type="time"
        className={styles.input}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
