import { WebSocketServer, WebSocket } from 'ws';
import { EventEmitter } from 'events';

/**
 * WebSocketServerTransport implements Transport interface for WebSockets
 * This transport is suitable for Smithery deployments
 */
export class WebSocketServerTransport {
  private wsServer: WebSocketServer;
  private activeConnection: WebSocket | null = null;
  private messageEmitter = new EventEmitter();
  private port: number;

  constructor(port: number = 8080) {
    this.port = port;
    
    try {
      console.error(`Initializing WebSocketServer on port ${port}`);
      this.wsServer = new WebSocketServer({ port });
      
      this.wsServer.on('connection', (ws) => {
        console.error('New WebSocket connection established');
        // Store the active connection
        this.activeConnection = ws;
        
        // Set up message handler
        ws.on('message', (message) => {
          try {
            const parsedMessage = JSON.parse(message.toString());
            this.messageEmitter.emit('message', parsedMessage);
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        });
        
        // Handle connection close
        ws.on('close', () => {
          console.error('WebSocket connection closed');
          if (this.activeConnection === ws) {
            this.activeConnection = null;
          }
        });
        
        // Handle errors
        ws.on('error', (err) => {
          console.error('WebSocket connection error:', err);
        });
      });
      
      // Handle server errors
      this.wsServer.on('error', (err) => {
        console.error('WebSocketServer error:', err);
      });
      
      // Handle listening event
      this.wsServer.on('listening', () => {
        console.error(`WebSocketServer listening on port ${port}`);
      });
    } catch (error) {
      console.error('Error creating WebSocketServer:', error);
      throw error;
    }
  }

  /**
   * Start the transport
   */
  async start(): Promise<void> {
    // WebSocket server is already started in the constructor
    console.error('WebSocketServerTransport start() called');
    return;
  }

  /**
   * Send a message to the client
   */
  async send(message: unknown): Promise<void> {
    if (!this.activeConnection) {
      console.error('No active connection available for sending message');
      return;
    }
    
    try {
      const serializedMessage = JSON.stringify(message);
      this.activeConnection.send(serializedMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  /**
   * Receive a message from the client
   */
  async receiveMessage(): Promise<unknown> {
    console.error('Waiting to receive message');
    return new Promise((resolve) => {
      this.messageEmitter.once('message', (message) => {
        console.error('Message received');
        resolve(message);
      });
    });
  }

  /**
   * Close the WebSocket server
   */
  async close(): Promise<void> {
    console.error('Closing WebSocketServerTransport');
    return new Promise((resolve, reject) => {
      try {
        if (this.activeConnection) {
          this.activeConnection.close();
          this.activeConnection = null;
        }
        
        this.wsServer.close((err) => {
          if (err) {
            console.error('Error closing WebSocketServer:', err);
            reject(err);
          } else {
            console.error('WebSocketServer closed successfully');
            resolve();
          }
        });
      } catch (error) {
        console.error('Error in close():', error);
        reject(error);
      }
    });
  }

  /**
   * Get the port number 
   */
  getPort(): number {
    return this.port;
  }
} 