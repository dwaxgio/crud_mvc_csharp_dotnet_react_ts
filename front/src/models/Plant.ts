export interface Plant {
    id: string;
    name: string;
    type: 'succulent' | 'tropical' | 'herb' | 'cacti';
    wateringFrequencyDays: number;
    lastWateredDate: string;
    location: string;
  }
  