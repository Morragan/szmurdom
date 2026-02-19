export type Offer = {
  id: number;
  link: string;
  imageUrl: string;
  score: number;
  status: 'PERHAPS' | 'ELIMINATED';
  lat: number;
  lon: number;
  notes: string | null;
};
