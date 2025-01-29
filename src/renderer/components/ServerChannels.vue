<template>
  <div class="server-channels">
    <!-- Заголовок сервера с выпадающим меню -->
    <div class="server-header">
      <h2 @click="toggleDropdown" class="server-name">
        {{ serverData.serverInfo.name }}
        <span class="dropdown-icon">▼</span>
      </h2>
    </div>

    <!-- Выпадающее меню -->
    <div v-if="showDropdown" class="dropdown-menu">
      <ul>
        <li @click="boostServer">Буст сервера</li>
        <li @click="invitePeople">Пригласить людей</li>
        <li>Каталог приложений</li>
        <li>
          <label>
            <input type="checkbox" v-model="showAllChannels" />
            Показать все каналы
          </label>
        </li>
        <li>Параметры уведомлений</li>
        <li>Настройки конфиденциальности</li>
        <li>Настр. профиль сервера</li>
        <li>Скрыть заглушенные каналы</li>
        <li class="leave-server" @click="leaveServer">Покинуть сервер</li>
      </ul>
    </div>

    <!-- Группы каналов -->
    <div class="channel-groups">
      <div class="channel-group">
          <div class="channel-item">
            Мероприятия
          </div>
      </div>
      <div class="sectionDevider">

      </div>
      <div class="channel-groups">
        <div v-for="(group, index) in serverData.groupedChannels" :key="index" class="channel-group">
          <div class="group-header">
            <span class="collapse-icon" @click="toggleGroup(index)">{{ collapsedGroups.includes(index) ? '▶' : '▼' }}</span>
            {{ group.groupName }}
            <span class="add-channel" @click="$emit('open-modal', group.id)"><svg class="addButtonIcon_a08117" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M13 6a1 1 0 1 0-2 0v5H6a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5V6Z" class=""></path></svg></span>
          </div>

          <div v-if="!collapsedGroups.includes(index)" class="channels-list">
            <div v-for="channel in group.channels" :key="channel.id" class="channel-item">
              <span class="channel-icon">#</span> 
              {{ channel.name }}
              <span class="channel-actions">
               <!--  <img src="/icons/user-icon.png" class="channel-icon-small" alt="users">
                <img src="/icons/settings-icon.png" class="channel-icon-small" alt="settings"> -->
              </span>
            </div>
          </div>
        </div>
       <!--  <div v-for="(group, index) in serverData.groupedChannels" :key="group.id" class="channel-group">
          <span class="group_name" @click="toggleGroup(index)">{{ group.groupName.trim() }}</span>
          <div
              v-for="channel in group.channels"
              :key="channel.id"
              :class="[channel.type === 'voice' ? 'voice-channel' : 'text-channel', 'channel-item']"
            >
              <span v-if="channel.type === 'text'"><svg class="icon_d8bfb3" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z" clip-rule="evenodd" class=""></path></svg></span>
              <span v-if="channel.type === 'voice'"><svg class="icon_d8bfb3" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z" class=""></path><path fill="currentColor" d="M15.16 16.51c-.57.28-1.16-.2-1.16-.83v-.14c0-.43.28-.8.63-1.02a3 3 0 0 0 0-5.04c-.35-.23-.63-.6-.63-1.02v-.14c0-.63.59-1.1 1.16-.83a5 5 0 0 1 0 9.02Z" class=""></path></svg></span>
              {{ channel.name }}
              <span class="unread-count" v-if="channel.unreadCount > 0">
                {{ channel.unreadCount }}
              </span>
            </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    serverData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showDropdown: false,
      showAllChannels: false,
      collapsedGroups: [],
    };
  },
  methods: {

    toggleGroup(index) {
      if (this.collapsedGroups.includes(index)) {
        this.collapsedGroups = this.collapsedGroups.filter(i => i !== index);
      } else {
        this.collapsedGroups.push(index);
      }
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    boostServer() {
      console.log("Буст сервера нажат!");
    },
    invitePeople() {
      console.log("Пригласить людей нажато!");
    },
    leaveServer() {
      console.log("Покинуть сервер нажато!");
    },
  },
};
</script>

<style scoped>
.addButtonIcon_a08117{
  width: 18px;
  height: 18px;
}
.icon_d8bfb3{
  width: 20px;
  height: 20px;
  flex: 0 0 auto;
}
.sectionDevider{
    height: 1px;
    margin-left: 8px;
    margin-right: 8px;
    background-color: rgb(63, 63, 63);
}
.server-channels {
  font-family: TT Norms;
  width: 250px;
  border-radius: 6px 0px 0px 0px;
  background-color: rgb(41,43,47);
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative; /* Нужно для абсолютного позиционирования внутри */
}

.server-header {
  display: flex;
  justify-content: space-between;
  border-radius: 6px 0px 0px 0px;
  padding: 10px;
  background-color: rgb(43,45,49); 

  box-shadow: 0 2px 0 0 hsl(none 0% 0% / 0.05), 0 1.5px 0 0 hsl(none 0% 0% / 0.05), 0 1px 0 0 hsl(none 0% 0% / 0.16);;
  color: white;
}

.server-name {
  cursor: pointer;
  font-size: 1.7vh;
}

.dropdown-icon {
  font-size: 0.8em;
}

/* Выпадающее меню */
.dropdown-menu {
  position: absolute; /* Абсолютное позиционирование */
  top: 76px; /* Позиция ниже заголовка */
  left: 10px;
  width: 230px;
  background-color: rgb(17,18,20);
  border: 1px solid #23272a;
  border-radius: 5px;


  z-index: 10;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
  color: #b9bbbe;
  display: flex;
  align-items: center;
}

.dropdown-menu li:hover {
  background-color: #3a3d42;
}

.leave-server {
  color: #f04747;
}

/* Группы каналов */
/* .channel-groups {
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  padding-top: 16px;
}

.channel-group .group_name {
  color: color-mix( in oklab, hsl(213.75 calc(1 * 8.081%) 61.176% / 1) 100%, black 0% );
  font-size: 1.7vh;
  margin-left: 15px;
  text-transform: uppercase;
}

.channel-group  {
  list-style: none;
  padding: 0;
  margin: 0;
}

.channel-item {
  margin-left: 13px;
  padding: 6px 8px;
  display: flex;
  align-items: center;
  color: gray;
  cursor: pointer;
}

.channel-item:hover {
  width: 85%;
  background-color: #3a3d42;
  border-radius: 3px;
}

.unread-count {
  margin-left: auto;
  background-color: #5865f2;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8em;
  color: white;
} */
 .channel-groups{
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  padding-top: 16px;
 }
.channel-group {
}
.group-header {
  display: flex;
  align-items: center;
  color: color-mix( in oklab, hsl(213.75 calc(1 * 8.081%) 61.176% / 1) 100%, black 0% );
  font-size: 1.9vh;
  padding: 5px;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 5px;
/*   display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  padding: 5px;
  background: #292b2f;
  border-radius: 5px; */
}
.collapse-icon {
  margin-right: 5px;
}
.add-channel {
  font-size: 1.8vh;
  margin-left: auto;
  cursor: pointer;
}
.channels-list {
  padding-left: 13px;
}
.channel-item {
  padding: 6px 8px;
  display: flex;
  align-items: center;
  color: gray;
  cursor: pointer;
}
.channel-item:hover {
  width: 85%;
  background-color: #3a3d42;
  border-radius: 3px;
}
.channel-icon {
  margin-right: 5px;
}
.channel-actions {
  margin-left: auto;
}
.channel-icon-small {
  width: 16px;
  height: 16px;
  margin-left: 5px;
}
</style>
