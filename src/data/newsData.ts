export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'partnership' | 'event' | 'update' | 'announcement';
  publishedAt: string;
  author: string;
  image?: string;
  linkedinUrl?: string;
  featured: boolean;
  tags: string[];
  readingTime: number;
}

export const newsCategories = [
  { id: 'all', label: 'All News', count: 0 },
  { id: 'partnership', label: 'Partnerships', count: 0 },
  { id: 'event', label: 'Events', count: 0 },
  { id: 'update', label: 'Company Updates', count: 0 },
  { id: 'announcement', label: 'Announcements', count: 0 },
];

export const newsData: NewsItem[] = [
  // Real news content from LinkedIn to be added here
];

// Update category counts
newsCategories.forEach(category => {
  if (category.id === 'all') {
    category.count = newsData.length;
  } else {
    category.count = newsData.filter(item => item.category === category.id).length;
  }
});