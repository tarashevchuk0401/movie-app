export interface Movie {
  id: number;
  title: string;
  year: number;
  category: string;
  rating: number;
  description: string;
  actors?: string[];
}
