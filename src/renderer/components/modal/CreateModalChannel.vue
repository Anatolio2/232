<template>
    <div id="app">

      <!-- Модальное окно -->
      <div class="modal-overlay"   @click.self="$emit('close-modal')">
        <div class="modal">
          <!-- Заголовок -->
          <div class="modal-header">
            Создать канал
            <button class="close-modal-btn"  @click.self="$emit('close-modal')">&times;</button>
          </div>
  
          <!-- Контент -->
          <div class="modal-content">
            тут в какую группу
          </div>

          <div class="list">
            <h4 class="section-title">Тип канала</h4>
            <div class="list-item">
              <div class="list-item-icon">
                <svg class="icon_b545d5" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z" clip-rule="evenodd" class="foreground_b545d5"></path></svg>
              </div>
                <div class="list-item-content">
                    <span class="list-item-content-title">Текст</span>
                    <span class="list-item-content-subtitle">
                        Отправляйте сообщения, изображения, GIF, эмодзи, 
                        мнения и приколы
                    </span>
                    <div class="radioBarIcon">
                        <RadioCheckbox name="group1" v-model="this.channelInfo.type" :size="22" value="text"/>
                    </div>
                </div>

            </div>
          </div>
          <div class="list">
            <div class="list-item">
              <div class="list-item-icon">
                <svg class="icon_b545d5" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M16 4h.5v-.5a2.5 2.5 0 0 1 5 0V4h.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm4-.5V4h-2v-.5a1 1 0 1 1 2 0Z" clip-rule="evenodd" class="foreground_b545d5"></path><path fill="currentColor" d="M11 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1h-.06a1 1 0 0 1-.74-.32L5.92 17H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2.92l4.28-4.68a1 1 0 0 1 .74-.32H11ZM20.5 12c-.28 0-.5.22-.52.5a7 7 0 0 1-5.13 6.25c-.48.13-.85.55-.85 1.05v.03c0 .6.52 1.06 1.1.92a9 9 0 0 0 6.89-8.25.48.48 0 0 0-.49-.5h-1ZM16.5 12c-.28 0-.5.23-.54.5a3 3 0 0 1-1.33 2.02c-.35.23-.63.6-.63 1.02v.14c0 .63.59 1.1 1.16.83a5 5 0 0 0 2.82-4.01c.02-.28-.2-.5-.48-.5h-1Z" class="foreground_b545d5"></path></svg>
              </div>
                <div class="list-item-content">
                    <span class="list-item-content-title">Голос</span>
                    <span class="list-item-content-subtitle">
                        Общайтесь голосом или в видеочате
                        и пользуйтесь функцией показа экрана
                    </span>
                    <div class="radioBarIcon">
                       <RadioCheckbox name="group1" v-model="this.channelInfo.type" value="voice" :size="22"/>
                    </div>
                </div>

            </div>
          </div>  
          <div class="list">
            <div class="set__server__name">
                <span>Название канала</span>
                <input v-model="this.channelInfo.name" style="height: 45px; font-size: 14px;">
            </div>
          </div>
          <div class="list">
            <div class="section-title">
                <span>Приватный канал</span>
                <ToggleSwitch 
                :width="40" 
                :height="24" 
                :thumbSize="18" 
                :iconSize="13"
                v-model="this.channelInfo.private"/>
            </div>
            <span class="message-info">Только выбранные участники и участники с выбранными ролями смогут просматривать этот канал.</span>
          </div>
          <div class="modal-footer">
            <button class="modal-button" 
            style="background-color: transparent;"
            @click="prev()">Назад</button>
            <button class="modal-button" @click="next()">Создать канал</button>
          </div>
        </div>
      </div>
    </div>

  </template>
  
  <script>
  import RadioCheckbox from '../UI/RadioCheckbox.vue';
  import ToggleSwitch from '../UI/ToggleSwitch.vue';
  export default {
    props:{
        serverId:{
            type: Number,
            required: true,
        },
        groupId:{
            type: Number,
            required: true,
        }
    },
    components:{
        RadioCheckbox,
        ToggleSwitch,
    },
    data() {
      return {
        channelInfo:{
          token: localStorage.getItem('token'),
          name: `${JSON.parse(localStorage.getItem('userSession')).name}`,
          private: false,
          type: 'text',
        },
        showModal: false,
      };
    },
    methods: {
      next(){
        console.log(this.groupId);
        window.GoidaZvonAPI.createChannel({
          token: this.channelInfo.token,
          name: this.channelInfo.name,
          private: this.channelInfo.private,
          type: this.channelInfo.type,  
          groupId: this.groupId,
          serverId: this.serverId
        })
        this.closeModal();
      },

      closeModal() {
        this.showModal = false;
        this.$emit('close-modal')
      },
    },

  };

  </script>
  
  <style scoped>
  /* Базовые стили */
  .message-info{
    color: rgb(169, 171, 174);
    font-size: 16px;
  }
  body {
    font-family: TT Norms;
    margin: 0;
    padding: 0;
    background-color: #2f3136;
    color: #fff;
  }
  .uploaded-image{
    border-radius: 50%;
  }
  .radioBarIcon{
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 1 / 3; 
    grid-column: 2;
  }
/*   .radioBarIcon input[type="radio"] {
    display: none; 
}

.radioBarIcon label {
    cursor: pointer;
}

.radioBarIcon input[type="radio"]:checked + label svg circle {
    fill: #007bff; 
}

.radioBarIcon svg {
    width: 24px;
    height: 24px;
    transition: fill 0.3s ease;
} */
  .set__server__upload input{
    cursor: pointer;
    position: absolute;
    height: 80px; /* Занимает всю площадь контейнера */
    opacity: 0;
    
  }
  .set__server__upload{
    cursor: pointer;
    display: flex;
    justify-content: center;
  }
  .set__server__name{
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 15px;
  }
  .set__server__name input{
    font-family: TT Norms;
    padding: 1vh;
    font-size: 1.6vh;
    border-radius: 3px;
    height: 25px;
    border: none;
    color: rgb(169, 171, 174);
    outline: none;
    background-color: rgb(30, 31, 34);
  }
  .content {
    display: flex;
    flex-direction: column;
    text-align: start;
    gap: 10px;
  }
  .open-modal-btn {
    cursor: pointer;
    padding: 10px 20px;
    background-color: #5865f2;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    margin: 20px;
  }
  
  .open-modal-btn:hover {
    background-color: #4752c4;
  }
  
  /* Фон модального окна */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  /* Стили модального окна */
  .modal {
    font-family: TT Norms;
    background: #36393f;
    border-radius: 8px;
    width: 90%;
    max-width: 470px;
    color: #fff;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
  }
  
  .close-modal-btn {
    background: none;
    border: none;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
  }
  
  .close-modal-btn:hover {
    color: #f04747;
  }
  
  .modal-content {
    font-size: 14px;
    color: #b9bbbe;
  }
  
  /* Заголовок секции */
  .section-title {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    font-weight: bold;
    margin: 10px 0;
    color: #b9bbbe;
  }
  
  /* Разделитель */
  .separator {
    height: 1px;
    background: #444;
    margin: 10px 0;
  }
  
  /* Элементы списка */
  .list {
    margin: 10px 0;
  }
  .list-item-content{
    display: grid;
    grid-template-rows: auto auto; /* Два ряда: первый для заголовка, второй для описания */
  }
  .list-item-content-title{
    grid-column: 1 / -1;
    font-size: 16px
  }
  .list-item-content-subtitle{
    font-size: 14px;
    grid-column: 1 / -1;
    color: hsl(215 calc(1 * 8.824%) 73.333% / 1)
  }
  .icon_b545d5{
    opacity: 0.6;
    margin-right: 25px;
    width: 18px;
    height: 18px;
  }
  .list-item {
    display: flex;
    align-items: center;
    padding: 10px;
    background: #2f3136;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 10px;
    transition: background 0.3s ease;
  }
  
  .list-item:hover {
    background: #40444b;
  }
  
  .list-item span {
    display: flex;
    align-items: center;
  }
  
  .list-item span img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
  
  /* Кнопка внизу */
  .modal-footer {
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin-top: 20px;
  }
  .modal-button{
    cursor: pointer;
    background: #5865f2;
    color: #fff;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    font-size: 14px;
    font-weight: bold;
  }
  .join-button {
    background: #5865f2;
    color: #fff;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    width: 100%;
    font-size: 14px;
    font-weight: bold;
  }
  
  .join-button:hover {
    background: #4752c4;
  }
  
  .bottom-text {
    color: #b9bbbe;
    font-size: 14px;
    margin-bottom: 10px;
  }
  </style>
  