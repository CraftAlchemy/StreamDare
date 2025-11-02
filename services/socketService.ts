import type { ChatMessage } from '../types';

type EventCallback = (...args: any[]) => void;

class MockSocketService {
  private listeners: { [key: string]: EventCallback[] } = {};
  private viewerCountInterval: number | null = null;
  private chatInterval: number | null = null;
  private viewerCount = 0;
  private fakeChatters = ['StreamFan_1', 'CoolCat_88', 'NightWatcher', 'Pixel_Pro', 'MusicLover23'];

  private getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  on(event: string, callback: EventCallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: EventCallback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  private emit(event: string, ...args: any[]) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(...args));
    }
  }

  connect(initialViewers: number) {
    console.log("Mock Socket: Connected");
    this.viewerCount = initialViewers;

    // Emit initial count
    this.emit('viewer_count_update', this.viewerCount);

    this.viewerCountInterval = window.setInterval(() => {
      const change = this.getRandomInt(-5, 5);
      this.viewerCount = Math.max(0, this.viewerCount + change);
      this.emit('viewer_count_update', this.viewerCount);
    }, 3000);

    this.chatInterval = window.setInterval(() => {
      const chatter = this.fakeChatters[this.getRandomInt(0, this.fakeChatters.length - 1)];
      const message: Omit<ChatMessage, 'id'> = {
        user: { name: chatter },
        text: `This is a simulated message! Wow!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      this.emit('new_message', message);
    }, this.getRandomInt(4000, 8000));
  }

  disconnect() {
    console.log("Mock Socket: Disconnected");
    if (this.viewerCountInterval) {
      clearInterval(this.viewerCountInterval);
      this.viewerCountInterval = null;
    }
    if (this.chatInterval) {
      clearInterval(this.chatInterval);
      this.chatInterval = null;
    }
    this.listeners = {};
  }
}

// Export a singleton instance
export const socketService = new MockSocketService();
