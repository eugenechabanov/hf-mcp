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
    this.wsServer = new WebSocketServer({ port });
    
    this.wsServer.on('connection', (ws) => {
      console.log('Client connected to WebSocket server');
      
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
        console.log('Client disconnected from WebSocket server');
        if (this.activeConnection === ws) {
          this.activeConnection = null;
        }
      });
      
      // Handle errors
      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
      });
    });
    
    this.wsServer.on('error', (error) => {
      console.error('WebSocket server error:', error);
    });
    
    console.log(`WebSocket server started on port ${port}`);
  }

  /**
   * Start the transport
   */
  async start(): Promise<void> {
    // WebSocket server is already started in the constructor
    return;
  }

  /**
   * Send a message to the client
   */
  async send(message: unknown): Promise<void> {
    if (!this.activeConnection) {
      console.warn('No active WebSocket connection to send message to');
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
    return new Promise((resolve) => {
      this.messageEmitter.once('message', (message) => {
        resolve(message);
      });
    });
  }

  /**
   * Close the WebSocket server
   */
  async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (this.activeConnection) {
          this.activeConnection.close();
          this.activeConnection = null;
        }
        
        this.wsServer.close((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } catch (error) {
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