import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { fetchSchedule } from '../services/api';
import { Anime } from '../types/anime';
import { AnimeCard } from '../components/AnimeCard';

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const SchedulePage: React.FC = () => {
  const [schedule, setSchedule] = useState<Record<string, Anime[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const results = await Promise.all(days.map(day => fetchSchedule(day)));
        const data: Record<string, Anime[]> = {};
        days.forEach((day, index) => {
          data[day] = results[index];
        });
        setSchedule(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Weekly Anime Schedule</h2>
      {days.map(day => (
        <div key={day} className="mb-10">
          <h3 className="text-2xl font-semibold capitalize mb-4">{day}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedule[day]?.map(anime => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SchedulePage;
