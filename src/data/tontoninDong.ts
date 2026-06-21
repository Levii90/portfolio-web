import type { MediaItem } from '../types/media';

export const mediaItems: MediaItem[] = [
  {
    id: 'anime-frost-winds',
    title: 'Frost Winds Academy',
    type: 'anime',
    year: 2024,
    genre: ['Action', 'Adventure', 'Fantasy'],
    status: 'Ongoing',
    rating: 4.7,
    poster: 'https://images.unsplash.com/photo-1517604931442-7f8f3c63600f?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1512986721456-3e4dd5b90c26?auto=format&fit=crop&w=1200&q=80',
    description:
      'Mahasiswa akademi logistik es bertempur untuk menjaga keseimbangan antara sihir, teknologi, dan ancaman gelap yang bangkit dari kutub utara.',
    episodes: 24,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 'anime-city-echoes',
    title: 'City Echoes',
    type: 'anime',
    year: 2023,
    genre: ['Sci-Fi', 'Drama'],
    status: 'Completed',
    rating: 4.5,
    poster: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=80',
    description:
      'Kisah pejuang masa depan yang menemukan kembali identitasnya di tengah kota neon dengan memori yang terfragmentasi.',
    episodes: 12,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 'anime-star-legacy',
    title: 'Star Legacy',
    type: 'anime',
    year: 2024,
    genre: ['Adventure', 'Space', 'Fantasy'],
    status: 'Ongoing',
    rating: 4.8,
    poster: 'https://images.unsplash.com/photo-1517604931442-7f8f3c63600f?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    description:
      'Petualangan luar angkasa tim remaja yang mengejar misteri warisan galaksi dan persahabatan antar planet.',
    episodes: 18,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  },
  {
    id: 'movie-midnight-run',
    title: 'Midnight Run',
    type: 'movie',
    year: 2022,
    genre: ['Thriller', 'Mystery'],
    status: 'Released',
    rating: 4.3,
    poster: 'https://images.unsplash.com/photo-1489587029253-6bfe1eb0a1ae?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1495562569060-2eec283d3391?auto=format&fit=crop&w=1200&q=80',
    description:
      'Seorang detektif malam mengejar jejak kasus hilangnya ilmuwan dalam kota yang tak pernah tidur.',
    episodes: 1,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  {
    id: 'movie-silver-river',
    title: 'Silver River',
    type: 'movie',
    year: 2021,
    genre: ['Drama', 'Romance'],
    status: 'Released',
    rating: 4.6,
    poster: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    description:
      'Sebuah perjalanan emosional tentang dua orang yang menemukan ketenangan di sepanjang sungai penuh rahasia.',
    episodes: 1,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
  },
  {
    id: 'movie-phantom-harmony',
    title: 'Phantom Harmony',
    type: 'movie',
    year: 2023,
    genre: ['Fantasy', 'Mystery'],
    status: 'Released',
    rating: 4.4,
    poster: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80',
    description:
      'Mencari melodi legendaris yang konon bisa membuka dimensi bayangan dalam orkestra magis.',
    episodes: 1,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  },
  {
    id: 'tv-echo-horizon',
    title: 'Echo Horizon',
    type: 'tv',
    year: 2024,
    genre: ['Sci-Fi', 'Drama'],
    status: 'Ongoing',
    rating: 4.5,
    poster: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    description:
      'Serial Sci-Fi tentang tim penjelajah waktu yang menghadapi jejak masa lalu dan masa depan yang saling tumpang tindih.',
    episodes: 10,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: 'tv-rainfall-city',
    title: 'Rainfall City',
    type: 'tv',
    year: 2023,
    genre: ['Crime', 'Thriller'],
    status: 'Ongoing',
    rating: 4.2,
    poster: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    description:
      'Investigasi kriminal di kota hujan yang dipenuhi konspirasi dan rahasia gelap.',
    episodes: 16,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'
  }
];
