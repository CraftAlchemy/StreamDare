import React from 'react';
import type { Streamer } from '../types';
import { IconArrowLeft, IconCalendar, IconUsers, IconPlay, IconHeart } from '../constants';

interface StreamerProfileProps {
  streamer: Streamer;
  onBack: () => void;
  onToggleFollow: (streamerId: number) => void;
}

const StreamerProfile: React.FC<StreamerProfileProps> = ({ streamer, onBack, onToggleFollow }) => {
  return (
    <div className="flex-1 bg-brand-dark overflow-y-auto text-white animate-fade-in">
      {/* Banner */}
      <div className="relative h-48 md:h-64 bg-brand-gray-800">
        <img src={streamer.bannerUrl} alt={`${streamer.name}'s banner`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent"></div>
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-black/50 hover:bg-black/80 text-white font-semibold py-2 px-4 rounded-full flex items-center space-x-2 transition-colors z-10"
        >
          <IconArrowLeft className="w-5 h-5" />
          <span>Back to Stream</span>
        </button>
      </div>

      {/* Header Info */}
      <div className="p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-end -mt-16 sm:-mt-20 z-10 relative">
        <img src={streamer.avatarUrl} alt={streamer.name} className="w-32 h-32 rounded-full border-4 border-brand-dark flex-shrink-0" />
        <div className="sm:ml-4 mt-2 sm:mt-0 flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-end">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{streamer.name}</h1>
            <div className="flex items-center space-x-4 text-brand-gray-300 mt-1">
              <div className="flex items-center space-x-1">
                <IconUsers className="w-5 h-5" />
                <span>{streamer.followers.toLocaleString()} followers</span>
              </div>
            </div>
          </div>
          <button
              onClick={() => onToggleFollow(streamer.id)}
              className={`mt-4 sm:mt-0 font-semibold py-2 px-6 rounded-md flex items-center space-x-2 transition-colors ${
                  streamer.isFollowed
                  ? 'bg-brand-gray-600 hover:bg-brand-gray-700 text-white'
                  : 'bg-brand-purple hover:bg-purple-700 text-white'
              }`}
          >
              <IconHeart className={`w-5 h-5 ${streamer.isFollowed ? 'fill-current text-brand-pink' : ''}`} />
              <span>{streamer.isFollowed ? 'Following' : 'Follow'}</span>
          </button>
        </div>
      </div>

      <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <div className="bg-brand-gray-900 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">About {streamer.name}</h2>
            <p className="text-brand-gray-200 whitespace-pre-line leading-relaxed">{streamer.bio}</p>
          </div>

          {/* Past Streams */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Past Streams</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {streamer.pastStreams.slice(0, 4).map(stream => (
                <div key={stream.id} className="bg-brand-gray-900 rounded-lg overflow-hidden group transition-transform transform hover:-translate-y-1">
                  <div className="relative">
                    <img src={stream.thumbnailUrl} alt={stream.title} className="w-full h-auto aspect-video object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <IconPlay className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold truncate text-white">{stream.title}</h3>
                    <p className="text-sm text-brand-gray-400">{stream.views.toLocaleString()} views &bull; {stream.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar content area */}
        <div className="lg:col-span-1 space-y-6">
           {/* Schedule */}
          <div className="bg-brand-gray-900 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-3 flex items-center">
              <IconCalendar className="w-5 h-5 mr-2" />
              Schedule
            </h2>
            <ul className="space-y-2">
              {streamer.schedule.length > 0 ? streamer.schedule.map((s, index) => (
                <li key={index} className="flex justify-between items-center bg-brand-gray-800 p-3 rounded">
                  <span className="font-semibold text-white">{s.day}</span>
                  <span className="text-brand-gray-300">{s.time}</span>
                </li>
              )) : (
                <p className="text-brand-gray-400">No schedule set yet.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamerProfile;