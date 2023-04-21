export interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
  }