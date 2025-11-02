import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import StreamerList from './components/StreamerList';
import StreamView from './components/StreamView';
import ChatBox from './components/ChatBox';
import StreamerProfile from './components/StreamerProfile';
import { MOCK_STREAMERS, MOCK_USER, TOKEN_PACKAGES, STREAM_CATEGORIES, IconCoin, IconCreditCard, IconPayPal, IconArrowLeft } from './constants';
import type { User, Streamer, ChatMessage, Gift, TokenTransaction, TokenPackage } from './types';
import { socketService } from './services/socketService';


// Sub-components for new views
// These are defined here to avoid creating new files, per the instructions.

// #region Token Store Component
interface TokenStoreProps {
  onBack: () => void;
  onPurchase: (pkg: TokenPackage) => Promise<void>;
  tokenToUsdRate: number;
}
const TokenStore: React.FC<TokenStoreProps> = ({ onBack, onPurchase }) => {
  const [selectedPackage, setSelectedPackage] = useState<TokenPackage | null>(TOKEN_PACKAGES.find(p => p.isBestValue) || TOKEN_PACKAGES[1]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePurchase = async (paymentMethod: string) => {
    if (!selectedPackage) return;
    
    setIsProcessing(true);
    await onPurchase(selectedPackage);
    setIsProcessing(false);
    setShowSuccess(true);
    setTimeout(() => {
        setShowSuccess(false);
        onBack();
    }, 2000);
  };

  return (
    <div className="flex-1 bg-brand-dark overflow-y-auto text-white p-4 md:p-6 animate-fade-in">
        <div className="max-w-3xl mx-auto">
            <button onClick={onBack} className="bg-brand-gray-700 hover:bg-brand-gray-600 text-white font-semibold py-2 px-4 rounded-full flex items-center space-x-2 transition-colors mb-6">
                <IconArrowLeft className="w-5 h-5" />
                <span>Back</span>
            </button>
             <div className="bg-brand-gray-900 rounded-lg shadow-xl p-6 w-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-3xl font-bold text-white flex items-center">
                    <IconCoin className="w-8 h-8 text-yellow-400 mr-3" />
                    Get More Tokens
                  </h2>
                </div>
                <p className="text-brand-gray-300 mb-6">
                  Tokens are used to send gifts and generate AI dares for streamers. Support your favorites!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {TOKEN_PACKAGES.map(pkg => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`relative text-left p-4 rounded-lg border-2 transition-all duration-200 ${selectedPackage?.id === pkg.id ? 'border-brand-purple bg-brand-purple/20 shadow-lg' : 'border-brand-gray-700 bg-brand-gray-800 hover:border-brand-purple/50'}`}
                    >
                      {pkg.isBestValue && (
                        <div className="absolute -top-3 right-3 bg-brand-pink text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">Best Value</div>
                      )}
                      <div className="flex items-center text-xl font-bold text-white">
                        <IconCoin className="w-5 h-5 text-yellow-400 mr-2" />
                        {pkg.tokens.toLocaleString()}
                      </div>
                      {pkg.bonus && <div className="text-sm text-brand-cyan mt-1">{pkg.bonus}</div>}
                      <div className="text-lg font-semibold text-brand-gray-200 mt-2">${pkg.price.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
                
                {selectedPackage && (
                  <div className="bg-brand-gray-800 p-4 rounded-lg border border-brand-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Complete Your Purchase</h3>
                    {showSuccess ? (
                         <div className="text-center text-green-400 font-bold p-4 bg-green-900/50 rounded-md">Purchase Successful! Redirecting...</div>
                    ) : (
                        <div className="flex flex-col md:flex-row gap-4">
                          <button onClick={() => handlePurchase('PayPal')} disabled={isProcessing} className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center transition-colors">
                            <IconPayPal className="w-6 h-6 mr-2" />
                            {isProcessing ? 'Processing...' : `Pay with PayPal`}
                          </button>
                          <button onClick={() => handlePurchase('Card')} disabled={isProcessing} className="flex-1 bg-brand-gray-600 hover:bg-brand-gray-500 disabled:bg-gray-500 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center transition-colors">
                            <IconCreditCard className="w-6 h-6 mr-2" />
                            {isProcessing ? 'Processing...' : `Pay with LemonSqueezy`}
                          </button>
                        </div>
                    )}
                  </div>
                )}
              </div>
        </div>
    </div>
  );
};
// #endregion

// #region User Profile Component
interface UserProfileProps {
  user: User;
  transactions: TokenTransaction[];
  onBack: () => void;
  onNavigateToStore: () => void;
  onUpdateUser: (updatedUser: User) => void;
}
const UserProfile: React.FC<UserProfileProps> = ({ user, transactions, onBack, onNavigateToStore, onUpdateUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.name);
    const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);

    const handleSave = () => {
        onUpdateUser({ ...user, name, avatarUrl });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setName(user.name);
        setAvatarUrl(user.avatarUrl);
        setIsEditing(false);
    };

    return (
        <div className="flex-1 bg-brand-dark overflow-y-auto text-white p-4 md:p-6 animate-fade-in">
            <div className="max-w-4xl mx-auto">
                <button onClick={onBack} className="bg-brand-gray-700 hover:bg-brand-gray-600 text-white font-semibold py-2 px-4 rounded-full flex items-center space-x-2 transition-colors mb-6">
                    <IconArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                </button>
                <div className="bg-brand-gray-900 rounded-lg shadow-xl p-6 mb-6 flex flex-col sm:flex-row items-center gap-6">
                    <img src={avatarUrl} alt={name} className="w-24 h-24 rounded-full border-4 border-brand-purple object-cover" />
                    <div className="flex-1 text-center sm:text-left">
                         {isEditing ? (
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="userName" className="text-sm font-bold text-brand-gray-300">Display Name</label>
                                    <input
                                        id="userName"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-brand-gray-700 text-white placeholder-brand-gray-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-brand-purple"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="avatarUrl" className="text-sm font-bold text-brand-gray-300">Avatar URL</label>
                                    <input
                                        id="avatarUrl"
                                        type="text"
                                        value={avatarUrl}
                                        onChange={(e) => setAvatarUrl(e.target.value)}
                                        className="w-full bg-brand-gray-700 text-white placeholder-brand-gray-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-brand-purple"
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-3xl font-bold">{user.name}</h1>
                                <div className="flex items-center justify-center sm:justify-start mt-2 text-2xl font-bold text-yellow-400">
                                <IconCoin className="w-7 h-7 mr-2"/> 
                                <span>{user.tokenBalance.toLocaleString()} Tokens</span>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 self-center sm:self-end">
                       {isEditing ? (
                            <>
                                <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md transition-colors">
                                    Save
                                </button>
                                <button onClick={handleCancel} className="bg-brand-gray-600 hover:bg-brand-gray-700 text-white font-bold py-2 px-6 rounded-md transition-colors">
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setIsEditing(true)} className="bg-brand-gray-600 hover:bg-brand-gray-700 text-white font-bold py-2 px-6 rounded-md transition-colors">
                                    Edit Profile
                                </button>
                                <button onClick={onNavigateToStore} className="bg-brand-purple hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md transition-colors text-lg mt-2">
                                    Buy Tokens
                                </button>
                            </>
                        )}
                    </div>
                </div>
                
                <div className="bg-brand-gray-900 rounded-lg shadow-xl p-6">
                    <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
                    <div className="overflow-x-auto">
                        {transactions.length > 0 ? (
                             <ul className="space-y-3">
                                {transactions.map(tx => (
                                    <li key={tx.id} className="bg-brand-gray-800 p-3 rounded-md flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-white">{tx.description}</p>
                                            <p className="text-sm text-brand-gray-400">{tx.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-bold text-lg ${tx.type === 'Purchase' ? 'text-green-400' : 'text-red-400'}`}>
                                                {tx.type === 'Purchase' ? '+' : ''}{tx.tokenAmount.toLocaleString()}
                                            </p>
                                            {tx.usdAmount && <p className="text-sm text-brand-gray-300">${tx.usdAmount.toFixed(2)}</p>}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-brand-gray-400 text-center py-4">No transactions yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
// #endregion

// #region Admin Dashboard Component
interface AdminDashboardProps {
  allTransactions: TokenTransaction[];
  tokenToUsdRate: number;
  onUpdateRate: (newRate: number) => void;
  onBack: () => void;
}
const AdminDashboard: React.FC<AdminDashboardProps> = ({ allTransactions, tokenToUsdRate, onUpdateRate, onBack }) => {
    const [rateInput, setRateInput] = useState(tokenToUsdRate.toString());
    
    const totalRevenue = allTransactions.reduce((acc, tx) => acc + (tx.usdAmount || 0), 0);
    const tokensPurchased = allTransactions.filter(t => t.type === 'Purchase').reduce((acc, tx) => acc + tx.tokenAmount, 0);
    const tokensSpent = allTransactions.filter(t => t.type === 'Spend').reduce((acc, tx) => acc + tx.tokenAmount, 0);

    const handleRateUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        const newRate = parseFloat(rateInput);
        if (!isNaN(newRate) && newRate > 0) {
            onUpdateRate(newRate);
        }
    };

    return (
         <div className="flex-1 bg-brand-dark overflow-y-auto text-white p-4 md:p-6 animate-fade-in">
            <div className="max-w-6xl mx-auto">
                <button onClick={onBack} className="bg-brand-gray-700 hover:bg-brand-gray-600 text-white font-semibold py-2 px-4 rounded-full flex items-center space-x-2 transition-colors mb-6">
                    <IconArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                </button>
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-brand-gray-900 p-4 rounded-lg"><h3 className="text-brand-gray-300">Total Revenue</h3><p className="text-2xl font-bold text-green-400">${totalRevenue.toFixed(2)}</p></div>
                    <div className="bg-brand-gray-900 p-4 rounded-lg"><h3 className="text-brand-gray-300">Tokens Purchased</h3><p className="text-2xl font-bold text-cyan-400">{tokensPurchased.toLocaleString()}</p></div>
                    <div className="bg-brand-gray-900 p-4 rounded-lg"><h3 className="text-brand-gray-300">Tokens Spent</h3><p className="text-2xl font-bold text-pink-400">{Math.abs(tokensSpent).toLocaleString()}</p></div>
                </div>

                <div className="bg-brand-gray-900 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold mb-3">Settings</h2>
                    <form onSubmit={handleRateUpdate} className="flex items-end gap-4">
                        <div>
                            <label htmlFor="rate" className="block text-sm font-medium text-brand-gray-300 mb-1">Token Price (USD)</label>
                            <div className="relative">
                               <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-gray-400">$</span>
                               <input type="number" id="rate" value={rateInput} onChange={e => setRateInput(e.target.value)} step="0.001" min="0.001" className="bg-brand-gray-700 rounded-md pl-7 pr-4 py-2 w-48 focus:ring-brand-purple focus:border-brand-purple" />
                            </div>
                        </div>
                        <button type="submit" className="bg-brand-purple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md">Update Rate</button>
                    </form>
                </div>

                <div className="bg-brand-gray-900 rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">All Transactions</h2>
                    <div className="overflow-x-auto max-h-[50vh]">
                       <table className="w-full text-left">
                            <thead className="sticky top-0 bg-brand-gray-800">
                                <tr>
                                    <th className="p-3">User</th><th className="p-3">Date</th><th className="p-3">Type</th><th className="p-3">Description</th><th className="p-3 text-right">Tokens</th><th className="p-3 text-right">USD</th>
                                </tr>
                            </thead>
                            <tbody>
                            {allTransactions.map(tx => (
                                <tr key={tx.id} className="border-b border-brand-gray-800 hover:bg-brand-gray-800/50">
                                    <td className="p-3">{tx.userName}</td><td className="p-3 whitespace-nowrap">{tx.date}</td><td className="p-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${tx.type === 'Purchase' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>{tx.type}</span></td><td className="p-3">{tx.description}</td><td className="p-3 text-right font-mono">{tx.tokenAmount.toLocaleString()}</td><td className="p-3 text-right font-mono">{tx.usdAmount ? `$${tx.usdAmount.toFixed(2)}` : '-'}</td>
                                </tr>
                            ))}
                            </tbody>
                       </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
// #endregion

// #region Go Live Dashboard
interface GoLiveDashboardProps {
  onBack: () => void;
  onStartStream: (title: string, category: string, stream: MediaStream) => void;
  streamer: Streamer;
  categories: string[];
}

const GoLiveDashboard: React.FC<GoLiveDashboardProps> = ({ onBack, onStartStream, streamer, categories }) => {
  const [title, setTitle] = useState(streamer.streamTitle || '');
  const [category, setCategory] = useState(streamer.category || categories[0]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let mediaStream: MediaStream | null = null;
    const getMedia = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
        setError("Could not access camera/microphone. Please check permissions.");
      }
    };
    getMedia();

    return () => {
      mediaStream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const handleStart = () => {
    if (title.trim() && category && stream) {
      onStartStream(title.trim(), category, stream);
    }
  };

  return (
    <div className="flex-1 bg-brand-dark overflow-y-auto text-white p-4 md:p-6 animate-fade-in">
        <div className="max-w-4xl mx-auto">
            <button onClick={onBack} className="bg-brand-gray-700 hover:bg-brand-gray-600 text-white font-semibold py-2 px-4 rounded-full flex items-center space-x-2 transition-colors mb-6">
                <IconArrowLeft className="w-5 h-5" />
                <span>Back</span>
            </button>
            <h1 className="text-3xl font-bold mb-6">Go Live</h1>
            
            <div className="bg-brand-gray-900 rounded-lg shadow-xl p-6">
                <div className="mb-4">
                    <label htmlFor="stream-title" className="block text-lg font-medium text-brand-gray-300 mb-2">Stream Title</label>
                    <input
                        id="stream-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Let's build an amazing app!"
                        className="w-full bg-brand-gray-700 text-white placeholder-brand-gray-400 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple"
                    />
                </div>
                
                <div className="mb-6">
                    <label htmlFor="stream-category" className="block text-lg font-medium text-brand-gray-300 mb-2">Category</label>
                    <select
                        id="stream-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-brand-gray-700 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple appearance-none"
                        style={{ background: 'url(\'data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23636366%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22/%3E%3C/svg%3E\') no-repeat right 1rem center/10px 10px, linear-gradient(to bottom, #2C2C2E, #2C2C2E)' }}
                    >
                        {categories.map(cat => (
                           <option key={cat} value={cat}>{cat}</option> 
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-medium text-brand-gray-300 mb-2">Stream Preview</h2>
                    <div className="aspect-video bg-black rounded-md overflow-hidden">
                        {stream ? (
                            <video ref={videoRef} autoPlay muted className="w-full h-full object-cover"></video>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-brand-gray-400">
                                {error || 'Loading camera...'}
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={handleStart}
                    disabled={!stream || !title.trim() || !category}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-brand-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-colors text-lg"
                >
                    Start Streaming
                </button>
            </div>
        </div>
    </div>
  );
};
// #endregion


const App: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(() => {
    try {
        const savedUser = localStorage.getItem('streamDareUser');
        return savedUser ? JSON.parse(savedUser) : MOCK_USER;
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        return MOCK_USER;
    }
  });
  const [streamers, setStreamers] = useState<Streamer[]>(MOCK_STREAMERS);
  const [activeStream, setActiveStream] = useState<Streamer | null>(MOCK_STREAMERS.find(s=>s.isLive) || MOCK_STREAMERS[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  
  type View = 'stream' | 'profile' | 'user_profile' | 'token_store' | 'admin_dashboard' | 'go_live';
  const [currentView, setCurrentView] = useState<View>('stream');
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [tokenToUsdRate, setTokenToUsdRate] = useState<number>(0.01);

  const currentUserIsStreamer = streamers.some(s => s.userId === currentUser.id);

  const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev.slice(-100), { ...message, id: Date.now().toString() + Math.random(), timestamp }]);
  }, []);

  useEffect(() => {
    if (activeStream && currentView === 'stream') {
        const initialMessage = { id: 'sys-1', user: { name: 'System' }, text: `Welcome to ${activeStream.name}'s stream!`, isSystem: true, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages([initialMessage]);
    }
  }, [activeStream, currentView]);

  // --- Socket.IO Integration ---
  useEffect(() => {
    if (!activeStream || !activeStream.isLive) {
      socketService.disconnect();
      return;
    }
    
    socketService.connect(activeStream.viewers);

    const handleViewerUpdate = (count: number) => {
      setStreamers(prev => prev.map(s => s.id === activeStream.id ? { ...s, viewers: count } : s));
      setActiveStream(prev => prev && prev.id === activeStream.id ? { ...prev, viewers: count } : prev);
    };

    const handleNewMessage = (message: Omit<ChatMessage, 'id'>) => {
      if (activeStream.id !== currentUser.id) {
        addMessage(message);
      }
    };

    socketService.on('viewer_count_update', handleViewerUpdate);
    socketService.on('new_message', handleNewMessage);

    return () => {
      socketService.off('viewer_count_update', handleViewerUpdate);
      socketService.off('new_message', handleNewMessage);
      socketService.disconnect();
    };
  }, [activeStream, currentUser.id, addMessage]);

  const handleSpendTokens = useCallback((amount: number, description: string): boolean => {
    if (currentUser.tokenBalance >= amount) {
        setCurrentUser(prev => ({ ...prev, tokenBalance: prev.tokenBalance - amount }));
        const newTransaction: TokenTransaction = { id: `txn-${Date.now()}`, userId: currentUser.id, userName: currentUser.name, date: new Date().toLocaleString(), type: 'Spend', description, tokenAmount: -amount, usdAmount: null };
        setTransactions(prev => [newTransaction, ...prev]);
        return true;
    }
    setCurrentView('token_store');
    return false;
  }, [currentUser.tokenBalance, currentUser.id, currentUser.name]);

  const handlePurchaseTokens = useCallback(async (pkg: TokenPackage) => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newTransaction: TokenTransaction = { id: `txn-${Date.now()}`, userId: currentUser.id, userName: currentUser.name, date: new Date().toLocaleString(), type: 'Purchase', description: `${pkg.tokens.toLocaleString()} Token Package`, tokenAmount: pkg.tokens, usdAmount: pkg.price };
      setTransactions(prev => [newTransaction, ...prev]);
      setCurrentUser(prev => ({ ...prev, tokenBalance: prev.tokenBalance + pkg.tokens }));
      addMessage({ user: { name: 'System' }, text: `You successfully purchased ${pkg.tokens.toLocaleString()} tokens!`, isSystem: true });
  }, [addMessage, currentUser.id, currentUser.name]);
  
  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    try {
        localStorage.setItem('streamDareUser', JSON.stringify(updatedUser));
    } catch (error) {
        console.error("Failed to save user to localStorage", error);
    }
    
    // Also update the streamer list if the current user is a streamer
    setStreamers(prevStreamers =>
        prevStreamers.map(streamer =>
            streamer.userId === updatedUser.id
                ? { ...streamer, name: updatedUser.name, avatarUrl: updatedUser.avatarUrl }
                : streamer
        )
    );
  };


  const handleSendMessage = useCallback((text: string) => addMessage({ user: { name: currentUser.name }, text }), [currentUser, addMessage]);
  
  const handleSendGift = useCallback((gift: Gift) => {
    if(handleSpendTokens(gift.cost, `Sent ${gift.name} gift to ${activeStream?.name || 'streamer'}`)) {
        addMessage({ user: { name: currentUser.name }, text: `${currentUser.name} sent a ${gift.name}!`, isGift: true });
    }
  }, [currentUser.name, activeStream?.name, addMessage, handleSpendTokens]);

  const handleSendDare = useCallback((dareText: string) => addMessage({ user: { name: 'AI Dare Bot' }, text: `🤖 AI DARE: ${dareText}`, isDare: true }), [addMessage]);

  const handleStopStreaming = useCallback(() => {
    localStream?.getTracks().forEach(track => track.stop());
    setLocalStream(null);
    const userStreamer = streamers.find(s => s.userId === currentUser.id);
    if (!userStreamer) return;
    const updatedStreamer = { ...userStreamer, isLive: false, viewers: 0 };
    setStreamers(prev => prev.map(s => s.id === userStreamer.id ? updatedStreamer : s));
    setActiveStream(updatedStreamer);
    socketService.disconnect();
  }, [localStream, streamers, currentUser.id]);

  const handleNavigate = useCallback((view: View) => {
    if (view !== 'stream' && localStream) {
      handleStopStreaming();
    }
    setCurrentView(view);
  }, [localStream, handleStopStreaming]);

  const handleGoLive = useCallback((title: string, category: string, stream: MediaStream) => {
    const userStreamer = streamers.find(s => s.userId === currentUser.id);
    if (!userStreamer) return;
    setLocalStream(stream);
    const updatedStreamer = { ...userStreamer, isLive: true, streamTitle: title, category: category, viewers: 1 };
    setStreamers(prev => prev.map(s => s.id === userStreamer.id ? updatedStreamer : s));
    setActiveStream(updatedStreamer);
    setCurrentView('stream');
  }, [streamers, currentUser.id]);

  const handleSelectStream = useCallback((streamer: Streamer) => {
    if (localStream) handleStopStreaming();
    setActiveStream(streamer);
    setCurrentView('stream');
  }, [localStream, handleStopStreaming]);

  const handleViewProfile = useCallback(() => setCurrentView('profile'), []);
  const handleBackToStream = useCallback(() => setCurrentView('stream'), []);
  
  const handleToggleFollow = useCallback((streamerId: number) => {
    setStreamers(prev => prev.map(s => {
      if (s.id === streamerId) {
        const updated = { ...s, isFollowed: !s.isFollowed, followers: s.isFollowed ? s.followers - 1 : s.followers + 1 };
        if (activeStream?.id === streamerId) setActiveStream(updated);
        return updated;
      }
      return s;
    }));
  }, [activeStream]);
  
  const renderCurrentView = () => {
    switch (currentView) {
        case 'go_live':
            const userAsStreamer = streamers.find(s => s.userId === currentUser.id);
            return userAsStreamer ? <GoLiveDashboard onBack={() => setCurrentView('stream')} onStartStream={handleGoLive} streamer={userAsStreamer} categories={STREAM_CATEGORIES} /> : <p>You are not a streamer.</p>;
        case 'user_profile':
            return <UserProfile user={currentUser} transactions={transactions.filter(t => t.userId === currentUser.id)} onBack={() => setCurrentView(activeStream ? 'stream' : 'profile')} onNavigateToStore={() => setCurrentView('token_store')} onUpdateUser={handleUpdateUser} />
        case 'token_store':
            return <TokenStore onBack={() => setCurrentView('user_profile')} onPurchase={handlePurchaseTokens} tokenToUsdRate={tokenToUsdRate} />
        case 'admin_dashboard':
            return currentUser.isAdmin ? <AdminDashboard allTransactions={transactions} tokenToUsdRate={tokenToUsdRate} onUpdateRate={setTokenToUsdRate} onBack={() => setCurrentView('stream')} /> : <p>Access Denied</p>;
        case 'profile':
             return activeStream ? <StreamerProfile streamer={activeStream} onBack={handleBackToStream} onToggleFollow={handleToggleFollow}/> : null;
        case 'stream':
        default:
             return activeStream ? (
              <>
                <StreamView streamer={activeStream} viewer={currentUser} onSendGift={handleSendGift} onSendDare={handleSendDare} onSpendTokens={handleSpendTokens} onViewProfile={handleViewProfile} isCurrentUserStreamer={activeStream.userId === currentUser.id} localStream={activeStream.userId === currentUser.id ? localStream : null} onStopStreaming={handleStopStreaming} />
                <ChatBox streamer={activeStream} viewer={currentUser} messages={messages} onSendMessage={handleSendMessage} />
              </>
            ) : <div className="flex-1 flex items-center justify-center bg-brand-dark"><p className="text-2xl text-brand-gray-400">Select a stream to watch</p></div>
    }
  }

  return (
    <div className="bg-brand-dark text-brand-gray-100 min-h-screen font-sans flex flex-col">
      <Header user={currentUser} onNavigate={handleNavigate} isStreamer={currentUserIsStreamer} />
      <main className="flex flex-1 overflow-hidden">
        <div className="hidden lg:flex">
             <StreamerList streamers={streamers} activeStreamerId={activeStream?.id ?? null} isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} onSelectStream={handleSelectStream} onToggleFollow={handleToggleFollow} />
        </div>
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {renderCurrentView()}
        </div>
      </main>
    </div>
  );
};

export default App;