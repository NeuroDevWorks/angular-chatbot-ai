import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ChatMessage } from '../../models/chat.models';

@Component({
  selector: 'ai-chat-message',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="chat-message" [class.user-message]="message.role === 'user'" [class.assistant-message]="message.role === 'assistant'">
      <div class="message-container">
        <div class="avatar" *ngIf="showAvatar">
          <mat-icon>{{ message.role === 'user' ? 'person' : 'smart_toy' }}</mat-icon>
        </div>
        <div class="message-content">
          <div class="message-header" *ngIf="showHeader">
            <span class="role">{{ message.role === 'user' ? 'You' : 'AI Assistant' }}</span>
            <span class="timestamp">{{ formatTime(message.timestamp) }}</span>
          </div>
          <div class="message-text" [innerHTML]="formatContent(message.content)"></div>
          <div class="streaming-indicator" *ngIf="message.isStreaming">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chat-message {
      margin-bottom: 16px;
      display: flex;
    }

    .user-message {
      justify-content: flex-end;
    }

    .assistant-message {
      justify-content: flex-start;
    }

    .message-container {
      display: flex;
      max-width: 80%;
      gap: 12px;
    }

    .user-message .message-container {
      flex-direction: row-reverse;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .user-message .avatar {
      background: #3f51b5;
      color: white;
    }

    .assistant-message .avatar {
      background: #4caf50;
      color: white;
    }

    .message-content {
      flex: 1;
      min-width: 0;
    }

    .message-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
      font-size: 12px;
      color: #666;
    }

    .role {
      font-weight: 500;
    }

    .timestamp {
      font-size: 11px;
    }

    .message-text {
      background: #f5f5f5;
      padding: 12px 16px;
      border-radius: 18px;
      word-wrap: break-word;
      line-height: 1.4;
    }

    .user-message .message-text {
      background: #3f51b5;
      color: white;
    }

    .assistant-message .message-text {
      background: #f5f5f5;
      color: #333;
    }

    .streaming-indicator {
      display: flex;
      gap: 4px;
      margin-top: 8px;
      padding-left: 16px;
    }

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #666;
      animation: pulse 1.4s infinite ease-in-out;
    }

    .dot:nth-child(1) { animation-delay: -0.32s; }
    .dot:nth-child(2) { animation-delay: -0.16s; }

    @keyframes pulse {
      0%, 80%, 100% {
        transform: scale(0);
        opacity: 0.5;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }

    /* Markdown-like formatting */
    .message-text code {
      background: rgba(0, 0, 0, 0.1);
      padding: 2px 4px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
    }

    .user-message .message-text code {
      background: rgba(255, 255, 255, 0.2);
    }

    .message-text pre {
      background: rgba(0, 0, 0, 0.05);
      padding: 12px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 8px 0;
    }

    .user-message .message-text pre {
      background: rgba(255, 255, 255, 0.1);
    }
  `]
})
export class ChatMessageComponent {
  @Input() message!: ChatMessage;
  @Input() showAvatar = true;
  @Input() showHeader = true;

  formatTime(timestamp: Date): string {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  formatContent(content: string): string {
    // Basic markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  }
}
