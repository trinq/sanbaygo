import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { format, setHours, setMinutes } from 'date-fns';

interface TimeInputProps {
  value: string;
  onChange: (time: string) => void;
}

export function TimeInput({ value, onChange }: TimeInputProps) {
  const [showPicker, setShowPicker] = useState(false);
  
  const [hours, minutes] = value.split(':').map(Number);
  const selectedDate = setMinutes(setHours(new Date(), hours), minutes);

  const handleConfirm = (date: Date) => {
    const newTime = format(date, 'HH:mm');
    onChange(newTime);
    setShowPicker(false);
  };

  const adjustTime = (deltaMinutes: number) => {
    const totalMinutes = hours * 60 + minutes + deltaMinutes;
    const newHours = Math.floor((totalMinutes % (24 * 60)) / 60);
    const newMinutes = totalMinutes % 60;
    const newTime = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    onChange(newTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Giờ máy bay đáp</Text>
      <View style={styles.timeDisplay}>
        <TouchableOpacity 
          style={styles.adjustButton}
          onPress={() => adjustTime(-15)}
        >
          <Text style={styles.adjustButtonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.timeButton}
          onPress={() => setShowPicker(!showPicker)}
        >
          <Text style={styles.timeText}>{value}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.adjustButton}
          onPress={() => adjustTime(15)}
        >
          <Text style={styles.adjustButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.hint}>Điều chỉnh giờ đáp máy bay của bạn</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A5F',
    marginBottom: 16,
  },
  timeDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  adjustButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8EEF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adjustButtonText: {
    fontSize: 24,
    color: '#1E3A5F',
    fontWeight: '600',
  },
  timeButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: '#1E3A5F',
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  hint: {
    fontSize: 14,
    color: '#6B7C8F',
    textAlign: 'center',
    marginTop: 16,
  },
});
