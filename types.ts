// Fix: Import React to resolve 'Cannot find namespace 'React'' error.
import React from 'react';

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  tokenBalance: number;
  isAdmin: boolean;
}

export interface PastStream {
    id: string;
    title: string;
    thumbnailUrl: string;
    views: number;
    date: string;
}

export interface Streamer {
  id: number;
  userId?: string;
  name:string;
  avatarUrl: string;
  streamTitle: string;
  category: string;
  viewers: number;
  isLive: boolean;
  thumbnailUrl: string;
  bannerUrl: string;
  followers: number;
  bio: string;
  schedule: { day: string; time: string; }[];
  pastStreams: PastStream[];
  isFollowed: boolean;
}

export interface ChatMessage {
  id: string;
  user: {
    name: string;
    isStreamer?: boolean;
    isMod?: boolean;
  };
  text: string;
  timestamp: string;
  isSystem?: boolean;
  isGift?: boolean;
  isDare?: boolean;
}

export interface Gift {
  id: string;
  name: string;
  cost: number;
  icon: React.ReactNode;
}

export interface TokenPackage {
  id: string;
  tokens: number;
  price: number;
  bonus?: string;
  isBestValue?: boolean;
}

export interface TokenTransaction {
    id: string;
    userId: string;
    userName: string;
    date: string;
    type: 'Purchase' | 'Spend';
    description: string;
    tokenAmount: number;
    usdAmount: number | null;
}