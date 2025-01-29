<template>
    <div class="chat-container">
      <div class="chat-header">
        <h3>{{ selectedChannel ? selectedChannel.name : 'Выберите канал' }}</h3>
      </div>
      <div class="messages">
        <div v-for="message in messages" :key="message.id" class="message">
          <span class="username">{{ message.username }}:</span>
          <span class="text">{{ message.text }}</span>
        </div>
      </div>
      <div class="message-input">
        <input v-model="messageText" @keyup.enter="sendMessage" placeholder="Напишите сообщение..." />
        <button @click="sendMessage">Отправить</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      selectedChannel: Object
    },
    data() {
      return {
        messages: [],
        messageText: ''
      };
    },
    methods: {
      async sendMessage() {
        if (this.messageText.trim()) {
          const apiUrl = import.meta.env.VITE_API_URL;
          const response = await fetch(`${apiUrl}/api/messages`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              channelId: this.selectedChannel.id,
              text: this.messageText
            })
          });
  
          const data = await response.json();
          if (response.status === 200) {
            this.messages.push({
              id: this.messages.length + 1,
              username: 'Me',
              text: this.messageText
            });
            this.messageText = '';
          } else {
            alert('Ошибка отправки сообщения');
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .chat-container {
    background-color: #36393f;
    color: white;
    padding: 20px;
  }
  
  .chat-header {
    background-color: #2f3136;
    padding: 10px;
    text-align: center;
  }
  
  .messages {
    height: 400px;
    overflow-y: auto;
    padding: 10px;
    background-color: #2f3136;
    margin-bottom: 10px;
  }
  
  .message {
    margin-bottom: 10px;
  }
  
  .username {
    font-weight: bold;
  }
  
  .message-input {
    display: flex;
  }
  
  .message-input input {
    flex-grow: 1;
    padding: 10px;
    margin-right: 10px;
    background-color: #444b56;
    border: 1px solid #555;
    border-radius: 5px;
    color: white;
  }
  
  .message-input button {
    background-color: #7289da;
    border: none;
    padding: 10px;
    color: white;
    cursor: pointer;
  }
  
  .message-input button:hover {
    background-color: #5f73a1;
  }
  </style>
  