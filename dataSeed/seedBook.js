// Run this script to add sample books to your database
// node seed-books.js

const axios = require('axios');

const API_URL = 'https://referral-credit-system-server-wwl2.onrender.com/api';

const sampleBooks = [
  {
    title: 'The Complete Guide to JavaScript',
    author: 'John Smith',
    description: 'Master JavaScript from basics to advanced concepts with practical examples and real-world projects.',
    price: 29.99,
    coverImage: '/books/javascript.jpg',
    category: 'Technology',
    rating: 4.8,
  },
  {
    title: 'Digital Marketing Mastery',
    author: 'Sarah Johnson',
    description: 'Learn proven strategies to grow your business online with social media, SEO, and content marketing.',
    price: 24.99,
    coverImage: '/books/marketing.jpg',
    category: 'Business',
    rating: 4.5,
  },
  {
    title: 'The Mindful Entrepreneur',
    author: 'Michael Chen',
    description: 'Discover how to build a successful business while maintaining work-life balance and mental wellness.',
    price: 19.99,
    coverImage: '/books/mindful.jpg',
    category: 'Self-Help',
    rating: 4.7,
  },
  {
    title: 'Data Science Fundamentals',
    author: 'Emily Rodriguez',
    description: 'A comprehensive introduction to data science, machine learning, and statistical analysis.',
    price: 34.99,
    coverImage: '/books/datascience.jpg',
    category: 'Technology',
    rating: 4.9,
  },
  {
    title: 'The Art of Storytelling',
    author: 'David Williams',
    description: 'Learn the craft of compelling narratives that captivate readers and bring stories to life.',
    price: 16.99,
    coverImage: '/books/storytelling.jpg',
    category: 'Fiction',
    rating: 4.6,
  },
  {
    title: 'Quantum Physics Simplified',
    author: 'Dr. Lisa Anderson',
    description: 'An accessible introduction to the fascinating world of quantum mechanics and modern physics.',
    price: 27.99,
    coverImage: '/books/quantum.jpg',
    category: 'Science',
    rating: 4.4,
  },
  {
    title: 'Financial Freedom Blueprint',
    author: 'Robert Martinez',
    description: 'Practical strategies for building wealth, investing wisely, and achieving financial independence.',
    price: 22.99,
    coverImage: '/books/finance.jpg',
    category: 'Business',
    rating: 4.8,
  },
  {
    title: 'Creative Writing Workshop',
    author: 'Amanda Taylor',
    description: 'Unlock your creativity with exercises and techniques used by bestselling authors.',
    price: 18.99,
    coverImage: '/books/writing.jpg',
    category: 'Fiction',
    rating: 4.5,
  },
  {
    title: 'The Psychology of Success',
    author: 'Dr. James Wilson',
    description: 'Understand the mental frameworks that drive achievement and personal growth.',
    price: 21.99,
    coverImage: '/books/psychology.jpg',
    category: 'Self-Help',
    rating: 4.7,
  },
  {
    title: 'Modern Web Development',
    author: 'Alex Thompson',
    description: 'Build responsive, performant websites using the latest frameworks and best practices.',
    price: 31.99,
    coverImage: '/books/webdev.jpg',
    category: 'Technology',
    rating: 4.6,
  },
  {
    title: 'The Innovator\'s Handbook',
    author: 'Jessica Lee',
    description: 'Learn how to turn ideas into reality and build products that customers love.',
    price: 26.99,
    coverImage: '/books/innovation.jpg',
    category: 'Business',
    rating: 4.8,
  },
  {
    title: 'Cosmos and Beyond',
    author: 'Dr. Carl Stevens',
    description: 'Explore the wonders of space, from distant galaxies to the origins of the universe.',
    price: 23.99,
    coverImage: '/books/cosmos.jpg',
    category: 'Science',
    rating: 4.9,
  },
];

async function seedBooks() {
  console.log('🌱 Starting to seed books...\n');

  for (const book of sampleBooks) {
    try {
      const response = await axios.post(`${API_URL}/books`, book);
      console.log(`✅ Added: ${book.title}`);
    } catch (error) {
      console.error(`❌ Failed to add: ${book.title}`);
      console.error(error.response?.data || error.message);
    }
  }

  console.log('\n✨ Seeding completed!');
  console.log(`📚 Total books added: ${sampleBooks.length}`);
}

seedBooks();