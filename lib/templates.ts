export interface Template {
  id: string;
  category: string;
  title: string;
  imageUrl: string;
  isPremium: boolean;
  defaultQuote: string;
}

export const templates: Template[] = [
  // Free Templates
  {
    id: "t1",
    category: "Love",
    title: "Romantic Sunset",
    imageUrl: "https://picsum.photos/id/1015/800/1200",
    isPremium: false,
    defaultQuote: "क्या हिसाब दूँ तुम्हें अपनी चाहत का आज टोला अपनी साँसों को..."
  },
  {
    id: "t2",
    category: "Love",
    title: "Red Rose",
    imageUrl: "https://picsum.photos/id/1074/800/1200",
    isPremium: false,
    defaultQuote: "तू पास हो या दूर, फर्क नहीं पड़ता, तेरा ख्याल ही मेरे मुस्कान ला देता है।"
  },
  {
    id: "t3",
    category: "Birthday",
    title: "Birthday Vibes",
    imageUrl: "https://picsum.photos/id/1018/800/1200",
    isPremium: false,
    defaultQuote: "Happy Birthday! May your day be filled with joy and laughter"
  },
  {
    id: "t7",
    category: "Love",
    title: "Beach Couple",
    imageUrl: "https://picsum.photos/id/1016/800/1200",
    isPremium: false,
    defaultQuote: "Together is a beautiful place to be"
  },

  // Premium Templates
  {
    id: "t4",
    category: "Anniversary",
    title: "Golden Moments",
    imageUrl: "https://picsum.photos/id/1027/800/1200",
    isPremium: true,
    defaultQuote: "Every love story is beautiful, but ours is my favorite"
  },
  {
    id: "t5",
    category: "Festival",
    title: "Diwali Lights",
    imageUrl: "https://picsum.photos/id/106/800/1200",
    isPremium: true,
    defaultQuote: "Shubh Deepavali ✨ Let your light shine bright"
  },
  {
    id: "t6",
    category: "Motivation",
    title: "New Beginnings",
    imageUrl: "https://picsum.photos/id/1036/800/1200",
    isPremium: true,
    defaultQuote: "The best time to start was yesterday. The next best time is now."
  },
];

export const categories = ["All", "Love", "Birthday", "Anniversary", "Festival", "Motivation"];