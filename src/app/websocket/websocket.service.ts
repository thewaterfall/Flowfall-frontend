import { Injectable } from '@angular/core';
import {Client} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../../environments/environment';
import {WebSocketRowMessage} from './WebSocketRowMessage';
import {TokenStorageService} from '../auth/services/token-storage.service';

@Injectable()
export class WebsocketService {

  private stompClient: Client;

  constructor(private tokenStorage: TokenStorageService) {

  }

  initWebSocketConnection(url, onMessageReceived: (message: WebSocketRowMessage) => any) {
    this.stompClient = new Client();
    this.stompClient.webSocketFactory = () =>  new SockJS(`${environment.api_url}/webSocket`);

    this.stompClient.onConnect = () => this.onConnected(url, onMessageReceived);
    this.stompClient.onStompError = () => this.onError();
    this.stompClient.activate();
  }

  sendMessage(url, message) {
    this.stompClient.publish({
        destination: `/message/send/${url}`,
        body: JSON.stringify(message)
      });
  }

  deleteMessage(url, message) {
    this.stompClient.publish({
      destination: `/message/delete/${url}`,
      body: JSON.stringify(message)
    });
  }

  private onConnected(url, onMessageReceived) {
    this.stompClient.subscribe(`/message/${url}`, (message) => {
      onMessageReceived(JSON.parse(message.body));
    });
  }

  private onError() {

  }
}
