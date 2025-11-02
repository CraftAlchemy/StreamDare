
import React from 'react';
import type { Streamer } from '../types';
import { IconChevronLeft, IconChevronRight, IconHeart } from '../constants';

interface StreamerListProps {
  streamers: Streamer[];
  activeStreamerId: number | null;
  isCollapsed: boolean;
  onToggle: () => void;
  onSelectStream: (streamer: Streamer) => void;
  onToggleFollow: (streamerId: number) => void;
}

const StreamerList: React.FC<StreamerListProps> = ({ streamers, activeStreamerId, isCollapsed, onToggle, onSelectStream, onToggleFollow }) => {
  return (
    <aside className={`bg-brand-gray-800 flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="h-12 flex items-center justify-center border-b border-brand-gray-700 relative">
        {!isCollapsed && <h2 className="text-lg font-semibold text-white">Following</h2>}
        <button onClick={onToggle} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-brand-gray-700 hover:bg-brand-purple text-white rounded-full p-1 z-10">
          {isCollapsed ? <IconChevronRight className="w-5 h-5" /> : <IconChevronLeft className="w-5 h-5" />}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul>
          {streamers.map(streamer => (
            <li key={streamer.id}>
              <button
                onClick={() => onSelectStream(streamer)}
                className={`w-full flex items-center p-2 my-1 space-x-3 transition-colors group ${activeStreamerId === streamer.id ? 'bg-brand-purple' : 'hover:bg-brand-gray-700'} ${isCollapsed ? 'justify-center' : ''}`}
              >
                <img src={streamer.avatarUrl} alt={streamer.name} className="w-10 h-10 rounded-full flex-shrink-0" />
                {!isCollapsed && (
                  <div className="flex-1 text-left overflow-hidden">
                    <p className="text-white font-semibold truncate">{streamer.name}</p>
                    <p className="text-brand-gray-300 text-sm truncate">{streamer.category}</p>
                  </div>
                )}
                {!isCollapsed && (
                  <div className="flex items-center space-x-2">
                    {streamer.isLive && (
                      <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse-fast"></span>
                        <span className="text-sm text-brand-gray-200">{streamer.viewers.toLocaleString()}</span>
                      </div>
                    )}
                     <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleFollow(streamer.id);
                        }}
                        className="p-1 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                        aria-label={streamer.isFollowed ? `Unfollow ${streamer.name}` : `Follow ${streamer.name}`}
                    >
                        <IconHeart className={`w-5 h-5 transition-colors ${streamer.isFollowed ? 'fill-current text-brand-pink' : 'text-brand-gray-500 hover:text-brand-pink'}`} />
                    </button>
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default StreamerList;