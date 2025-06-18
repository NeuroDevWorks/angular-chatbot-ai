import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, takeUntil } from 'rxjs';

import { ChatService } from '../../services/chat.service';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatMessage, ChatOptions, ChatConfig } from '../../models/chat.models';

@Component({
  selector: 'ai-chatbot',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ChatMessageComponent
  ],
  template: `
    <mat-card class="chatbot-container" [class.full-height]="options.fullHeight">
      <mat-card-header *ngIf="options.title">
        <mat-card-title>{{ options.title }}</mat-card-title>
      </mat-card-header>
      
      <mat-card-content class="chat-content">
        <div class="messages-container" #messagesContainer>
          <div class="welcome-message" *ngIf="messages.length === 0">
            <mat-icon>smart_toy</mat-icon>
            <p>Hello! I'm your AI assistant. How can I help you today?</p>
          </div>
          
          <ai-chat-message
            *ngFor="let message of messages"
            [message]="message"
            [showAvatar]="options.showAvatars || true"
            [showHeader]="true">
          </ai-chat-message>
        </div>
      </mat-card-content>
      
      <mat-card-actions class="chat-input">
        <mat-form-field appearance="outline" class="input-field">
          <input
            matInput
            [(ngModel)]="currentMessage"
            [placeholder]="options.placeholder || 'Type your message...'"
            (keydown.enter)="sendMessage()"
            [disabled]="isLoading"
            #messageInput>
        </mat-form-field>
        
        <button
          mat-fab
          color="primary"
          (click)="sendMessage()"
          [disabled]="!currentMessage.trim() || isLoading"
          class="send-button">
          <mat-icon *ngIf="!isLoading">send</mat-icon>
          <mat-progress-spinner
            *ngIf="isLoading"
            diameter="24"
            mode="indeterminate">
          </mat-progress-spinner>
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .chatbot-container {
      display: flex;
      flex-direction: column;
      height: 500px;
      max-width: 800px;
      margin: 0 auto;
    }

    .chatbot-container.full-height {
      height: 100vh;
    }

    .chat-content {
      flex: 1;
      overflow: hidden;
      padding: 0;
    }

    .messages-container {
      height: 100%;
      overflow-y: auto;
      padding: 16px;
      scroll-behavior: smooth;
    }

    .welcome-message {
      text-align: center;
      color: #666;
      margin: 40px 0;
    }

    .welcome-message mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
      color: #4caf50;
    }

    .chat-input {
      display: flex;
      gap: 12px;
      padding: 16px;
      border-top: 1px solid #e0e0e0;
      align-items: flex-end;
    }

    .input-field {
      flex: 1;
    }

    .send-button {
      width: 48px;
      height: 48px;
      min-height: 48px;
    }

    /* Scrollbar styling */
    .messages-container::-webkit-scrollbar {
      width: 6px;
    }

    .messages-container::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    .messages-container::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 3px;
    }

    .messages-container::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
  `]
})
export class ChatbotComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() config!: ChatConfig;
  @Input() options: ChatOptions = {};
  
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

  messages: ChatMessage[] = [];
  currentMessage = '';
  isLoading = false;
  
  private destroy$ = new Subject<void>();
  private shouldScrollToBottom = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    if (this.config) {
      this.chatService.configure(this.config);
    }

    this.chatService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe(messages => {
        this.messages = messages;
        this.shouldScrollToBottom = true;
        
        // Update loading state based on streaming messages
        this.isLoading = messages.some(msg => msg.isStreaming);
      });
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom && this.options.autoScroll !== false) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async sendMessage(): Promise<void> {
    if (!this.currentMessage.trim() || this.isLoading) {
      return;
    }

    const message = this.currentMessage.trim();
    this.currentMessage = '';
    this.isLoading = true;

    try {
      await this.chatService.sendMessage(message, this.options.systemPrompt);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      this.isLoading = false;
      // Focus back to input
      setTimeout(() => {
        this.messageInput?.nativeElement?.focus();
      }, 100);
    }
  }

  clearChat(): void {
    this.chatService.clearMessages();
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      const element = this.messagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }
}
