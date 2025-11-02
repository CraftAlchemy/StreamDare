import React from 'react';
import { Gift, Streamer, TokenPackage, User } from './types';

// ICONS
export const IconCoin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="8" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="8" />
  </svg>
);

export const IconGift = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

export const IconZap = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const IconStar = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

export const IconGem = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="6 3 18 3 22 9 12 22 2 9 6 3"></polygon>
        <line x1="2" y1="9" x2="22" y2="9"></line>
        <line x1="12" y1="22" x2="12" y2="9"></line>
        <line x1="6" y1="3" x2="12" y2="9"></line>
        <line x1="18" y1="3" x2="12" y2="9"></line>
    </svg>
);

export const IconChevronLeft = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

export const IconChevronRight = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

export const IconCreditCard = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
);

export const IconPayPal = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="currentColor" {...props}>
        <path d="M8.33 3.32C8.22 3.3 8.1 3.3 7.97 3.3H3.89L2.85 15.93h4.34c3.34 0 5.6-1.5 6.2-4.63.15-.75.22-1.5.22-2.25 0-1.8-.75-3.3-2.35-4.1-.42-.23-.88-.38-1.34-.45l-.47-.08zm3.2 4.6c-.22.65-.7 1.8-2.2 1.8H6.5l.65-4.2h2.08c1.1 0 1.7.5 1.9 1.2.2.7.1 1.2 0 1.2zM21.1 8.1c-.24-1.6-1.1-2.9-2.6-3.5-1.1-.4-2.4-.4-3.7-.4h-1.3v.8l.22 1.3.1.65.07.4h.1c.3 0 .6.04.85.1l.2.05c1.4.3 2.1 1.2 2.3 2.3.1.7-.1 1.5-.6 2.1-.5.7-1.3 1-2.4 1h-1.2l-.3-1.9v-.1c.1-.03.2-.06.3-.1.6-.2 1-.5 1.2-1 .3-.6.3-1.2.2-1.8-.1-.9-.7-1.5-1.6-1.5H12.6l-.8 5.1h2.2c1.3 0 2.4-.4 3-1.2.8-1 1-2.3.8-3.6z" />
    </svg>
);

// NEW ICONS FOR PROFILE
export const IconArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

export const IconCalendar = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

export const IconUsers = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);

export const IconPlay = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
);

export const IconHeart = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
);

export const IconVideo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="23 7 16 12 23 17 23 7"></polygon>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    </svg>
);


// DATA
export const STREAM_CATEGORIES = ['Software & Game Development', 'Retro Gaming', 'Art & Illustration', 'Just Chatting', 'Music'];

// Fix: Add GIFTS constant for use in StreamView component.
export const GIFTS: Gift[] = [
  {
    id: 'gift-1',
    name: 'Wow',
    cost: 10,
    icon: <IconStar className="w-8 h-8 text-yellow-400" />,
  },
  {
    id: 'gift-2',
    name: 'Hype',
    cost: 50,
    icon: <IconZap className="w-8 h-8 text-brand-cyan" />,
  },
  {
    id: 'gift-3',
    name: 'Diamond',
    cost: 250,
    icon: <IconGem className="w-8 h-8 text-blue-400" />,
  },
  {
    id: 'gift-4',
    name: 'Love',
    cost: 500,
    icon: <IconHeart className="w-8 h-8 text-brand-pink fill-current" />,
  },
];

// Fix: Add TOKEN_PACKAGES constant for use in App/TokenStore components.
export const TOKEN_PACKAGES: TokenPackage[] = [
  {
    id: 'tokens-500',
    tokens: 500,
    price: 4.99,
  },
  {
    id: 'tokens-1200',
    tokens: 1200,
    price: 9.99,
    bonus: '+20% Bonus',
    isBestValue: true,
  },
  {
    id: 'tokens-2500',
    tokens: 2500,
    price: 19.99,
    bonus: '+25% Bonus',
  },
  {
    id: 'tokens-7000',
    tokens: 7000,
    price: 49.99,
    bonus: '+40% Bonus',
  },
];

export const MOCK_USER: User = {
  id: 'user-codewizard',
  name: 'CodeWizard',
  avatarUrl: 'https://i.pravatar.cc/150?u=codewizard',
  tokenBalance: 5000,
  isAdmin: true, // Make user an admin for easy testing
};

export const MOCK_STREAMERS: Streamer[] = [
  // Add the current user as a streamer so they can "go live"
  {
    id: 99,
    userId: 'user-codewizard',
    name: 'CodeWizard',
    avatarUrl: 'https://i.pravatar.cc/150?u=codewizard',
    streamTitle: 'Live Coding: Building a React App',
    category: 'Software & Game Development',
    viewers: 0,
    isLive: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    followers: 125000,
    bio: `Just a dev trying to make cool things. Join me on my coding adventures!
    We'll tackle everything from simple web apps to complex AI integrations.`,
    schedule: [
      { day: 'Monday', time: '8 PM EST' },
      { day: 'Wednesday', time: '8 PM EST' },
      { day: 'Friday', time: '9 PM EST' },
    ],
    pastStreams: [],
    isFollowed: true,
  },
  {
    id: 1,
    name: 'PixelPioneer',
    avatarUrl: 'https://i.pravatar.cc/150?u=pixelpioneer',
    streamTitle: 'Final Boss Rush! Speedrun attempts',
    category: 'Retro Gaming',
    viewers: 1245,
    isLive: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1555864407-73a84a62d7az?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    followers: 89000,
    bio: 'Chasing world records in classic games. Bring on the nostalgia!',
    schedule: [{ day: 'Tuesday', time: '7 PM PST' }, { day: 'Thursday', time: '7 PM PST' }],
    pastStreams: [
      { id: 's1-1', title: 'Legend of Zelda: A Link to the Past - Full Playthrough', thumbnailUrl: 'https://images.unsplash.com/photo-1612404456333-5872852aa45a?auto=format&fit=crop&w=500&q=60', views: 15200, date: '3 days ago' },
      { id: 's1-2', title: 'Super Metroid - Any% PB Attempt', thumbnailUrl: 'https://images.unsplash.com/photo-1612404456333-5872852aa45a?auto=format&fit=crop&w=500&q=60', views: 8900, date: '1 week ago' },
    ],
    isFollowed: true,
  },
  {
    id: 2,
    name: 'CreativeFlow',
    avatarUrl: 'https://i.pravatar.cc/150?u=creativeflow',
    streamTitle: 'Chill & Draw: Character Concepts',
    category: 'Art & Illustration',
    viewers: 860,
    isLive: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1506241537529-eefea1fbe44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    followers: 42000,
// Fix: Add missing properties to conform to the Streamer type.
    bio: 'Bringing ideas to life with a digital pen. Come hang out and watch the creative process!',
    schedule: [
      { day: 'Sunday', time: '2 PM EST' },
      { day: 'Wednesday', time: '7 PM EST' },
    ],
    pastStreams: [
      { id: 's2-1', title: 'Character Design Session #12', thumbnailUrl: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=500&q=60', views: 5400, date: '5 days ago' },
      { id: 's2-2', title: 'Speed Painting Challenge', thumbnailUrl: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=500&q=60', views: 3200, date: '2 weeks ago' },
    ],
    isFollowed: false,
  },
];