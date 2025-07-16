'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarProps {
  onDateSelect?: (startDate: Date | null, endDate: Date | null) => void;
}

export default function AdvancedCalendar({ onDateSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Ajouter les jours du mois précédent
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false, isToday: false });
    }

    // Ajouter les jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const today = new Date();
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString()
      });
    }

    // Ajouter les jours du mois suivant pour compléter la grille
    const remainingDays = 42 - days.length; // 6 semaines * 7 jours
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({ date: nextDate, isCurrentMonth: false, isToday: false });
    }

    return days;
  };

  const handleDateClick = (date: Date) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // Première sélection ou nouvelle sélection
      setSelectedStartDate(date);
      setSelectedEndDate(null);
      setIsSelectingEnd(true);
    } else if (isSelectingEnd) {
      // Sélection de la date de fin
      if (date > selectedStartDate!) {
        setSelectedEndDate(date);
        setIsSelectingEnd(false);
        onDateSelect?.(selectedStartDate, date);
      } else {
        // Si la date de fin est avant la date de début, on inverse
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(date);
        setIsSelectingEnd(false);
        onDateSelect?.(date, selectedStartDate);
      }
    }
  };

  const isDateInRange = (date: Date) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  const isDateSelected = (date: Date) => {
    if (!selectedStartDate) return false;
    return date.toDateString() === selectedStartDate.toDateString();
  };

  const isDateEndSelected = (date: Date) => {
    if (!selectedEndDate) return false;
    return date.toDateString() === selectedEndDate.toDateString();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Sélectionnez vos dates</h3>
        <div className="flex items-center space-x-4">
          {selectedStartDate && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Départ:</span> {formatDate(selectedStartDate)}
            </div>
          )}
          {selectedEndDate && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Retour:</span> {formatDate(selectedEndDate)}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>

        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => day.isCurrentMonth && handleDateClick(day.date)}
            disabled={!day.isCurrentMonth}
            className={`
              relative p-3 text-sm font-medium rounded-lg transition-colors
              ${!day.isCurrentMonth ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blue-50 cursor-pointer'}
              ${day.isToday ? 'bg-blue-100 text-blue-600' : ''}
              ${isDateSelected(day.date) ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
              ${isDateEndSelected(day.date) ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
              ${isDateInRange(day.date) && !isDateSelected(day.date) && !isDateEndSelected(day.date)
                ? 'bg-blue-100 text-blue-600' : ''}
            `}
          >
            {day.date.getDate()}
            {day.isToday && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Durée minimale: 2 jours
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-600 rounded mr-2"></div>
            Dates sélectionnées
          </div>
        </div>
      </div>
    </div>
  );
} 