import {io, Socket} from 'socket.io-client';
import {API_URL} from './constant';

const SOCKET_URL = API_URL;

const createSocketService = () => {
  let socket: Socket | null = null;

  const initializeSocket = async () => {
    try {
      socket = io(SOCKET_URL, {
        path: '/socket.io',
        transports: ['websocket'],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000,
      });



      socket.on('connect', () => {
        console.log('Socket is Connected');
      });

      socket.on('disconnect', () => {
        console.log('Socket is disconnected');
      });

      socket.on('error', (error: any) => {
        console.log('Error in Socket ', error);
      });
    } catch (error) {
      console.log('Error initializing socket', error);
    }
  };

  const on = (event: string, cb: (data: any) => void) => {
    socket?.on(event, cb);
  };

  const emit = (event: string, data: any = {}) => {
    socket?.emit(event, data);
  };

  const removeListener = (listenerName: string) => {
    socket?.removeListener(listenerName);
  };

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  };

  return {
    initializeSocket,
    on,
    emit,
    removeListener,
    disconnect,
  };
};

// Singleton instance (optional, but recommended for global use)
const socketServices = createSocketService();

export default socketServices;
