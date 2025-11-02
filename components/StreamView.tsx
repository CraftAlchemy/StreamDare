import React, { useState, useRef, useEffect } from 'react';
import type { Streamer, User, Gift } from '../types';
import { GIFTS, IconCoin, IconZap } from '../constants';
import AIDareGenerator from './AIDareGenerator';

interface StreamViewProps {
  streamer: Streamer;
  viewer: User;
  onSendGift: (gift: Gift) => void;
  onSendDare: (dareText: string) => void;
  onSpendTokens: (amount: number, description: string) => boolean;
  onViewProfile: () => void;
  isCurrentUserStreamer: boolean;
  localStream: MediaStream | null;
  onStopStreaming: () => void;
}

interface StreamPlayerProps {
    streamer: Streamer;
    isLiveAndIsCurrentUser: boolean;
    localStream: MediaStream | null;
}
const StreamPlayer: React.FC<StreamPlayerProps> = ({ streamer, isLiveAndIsCurrentUser, localStream }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && localStream) {
            videoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    return (
        <div className="aspect-video bg-black flex items-center justify-center text-white relative">
            {isLiveAndIsCurrentUser && localStream ? (
                <video ref={videoRef} autoPlay muted className="w-full h-full object-cover"></video>
            ) : (
                <img src={streamer.thumbnailUrl} alt={streamer.streamTitle} className="w-full h-full object-cover" />
            )}
            
            {streamer.isLive && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold flex items-center animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                    LIVE
                </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h1 className="text-2xl font-bold">{streamer.streamTitle}</h1>
            </div>
        </div>
    );
};


const StreamerInfo: React.FC<{streamer: Streamer; onViewProfile: () => void}> = ({ streamer, onViewProfile }) => (
    <button onClick={onViewProfile} className="p-4 flex items-center space-x-4 w-full text-left rounded-lg hover:bg-brand-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple">
        <img src={streamer.avatarUrl} alt={streamer.name} className="w-16 h-16 rounded-full border-2 border-brand-purple" />
        <div>
            <h2 className="text-xl font-bold text-white">{streamer.name}</h2>
            <p className="text-brand-gray-300">{streamer.category}</p>
            <p className="text-brand-gray-400">{streamer.viewers.toLocaleString()} viewers</p>
        </div>
    </button>
);

const GiftPanel: React.FC<{onSendGift: (gift: Gift) => void}> = ({ onSendGift }) => (
    <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2">Send a Gift</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GIFTS.map(gift => (
                <button
                    key={gift.id}
                    onClick={() => onSendGift(gift)}
                    className="bg-brand-gray-800 p-3 rounded-lg flex flex-col items-center justify-center space-y-2 hover:bg-brand-gray-700 transition-colors transform hover:scale-105"
                >
                    {gift.icon}
                    <span className="text-white font-medium">{gift.name}</span>
                    <div className="flex items-center text-yellow-400">
                        <IconCoin className="w-4 h-4 mr-1" />
                        <span className="font-bold">{gift.cost}</span>
                    </div>
                </button>
            ))}
        </div>
    </div>
);


const StreamView: React.FC<StreamViewProps> = ({ streamer, viewer, onSendGift, onSendDare, onSpendTokens, onViewProfile, isCurrentUserStreamer, localStream, onStopStreaming }) => {
    const [isDareModalOpen, setIsDareModalOpen] = useState(false);

    return (
        <div className="flex-1 bg-brand-dark overflow-y-auto">
            <StreamPlayer streamer={streamer} isLiveAndIsCurrentUser={isCurrentUserStreamer} localStream={localStream} />
            
            {isCurrentUserStreamer && streamer.isLive && (
                <div className="p-4 bg-brand-gray-900 border-b border-brand-gray-700">
                    <button
                        onClick={onStopStreaming}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md transition-colors"
                    >
                        Stop Streaming
                    </button>
                </div>
            )}

            <div className="border-b border-brand-gray-700">
                 <StreamerInfo streamer={streamer} onViewProfile={onViewProfile} />
            </div>

            <div className="m-4 p-4 rounded-lg bg-brand-gray-900 border border-brand-gray-700">
                <GiftPanel onSendGift={onSendGift} />
            </div>

            <div className="m-4 p-6 rounded-lg bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <IconZap />
                            Unleash the AI!
                        </h3>
                        <p className="mt-1">Challenge the streamer with a unique dare generated by AI.</p>
                    </div>
                    <button 
                        onClick={() => setIsDareModalOpen(true)}
                        className="bg-white text-brand-purple font-bold py-2 px-6 rounded-full shadow-md hover:bg-opacity-90 transform hover:scale-105 transition-all w-full md:w-auto"
                    >
                        Generate AI Dare
                    </button>
                </div>
            </div>
            
            {isDareModalOpen && (
                <AIDareGenerator
                    streamer={streamer}
                    onClose={() => setIsDareModalOpen(false)}
                    onDareGenerated={onSendDare}
                    onSpendTokens={onSpendTokens}
                />
            )}
        </div>
    );
};

export default StreamView;
