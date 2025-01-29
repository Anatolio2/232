<template>
    <div class="dashboard">
        <ServerList @server-selected="loadServerData" @open-modal="this.showCreateServerModal = true"/>
        <div class="main-content">
           <ModalCreateServers v-if="showCreateServerModal" @close-modal="showCreateServerModal = false"/> 
           <CreateModalChannel v-if="showCreateChannelModal" :groupId="this.meta" :serverId="this.selectedServerData.serverInfo.id" @close-modal="showCreateChannelModal = false"/>
           <ServerChannels @open-modal="openChannelModal"  v-if="selectedServerData" :serverData="selectedServerData" />
        </div>
    </div>
    
</template>
<script>
import ServerList from './ServerList.vue'
import ModalCreateServers from './modal/ModalCreateServers.vue'
import CreateModalChannel from './modal/CreateModalChannel.vue'
import ServerChannels from './ServerChannels.vue';
import axios from 'axios'
export default{
    data(){
      return {
        showCreateServerModal: false,
        showCreateChannelModal: false,
        inviteCode: "",
        selectedServerData: null,
        meta: null, //временные данные которые будут гулять между файлов
      };
    },

    methods:{
      openChannelModal(groupId){
        console.log(groupId)
        this.meta = groupId;
        this.showCreateChannelModal = true;
        
      },  
      async loadServerData(server) {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const response = await axios.get(`${apiUrl}/api/servers/get/${server.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response.data.servers);
        this.selectedServerData = response.data.servers;
      } catch (error) {
        console.error("Error loading server data:", error.response?.data || error.message);
      }
    },
    },
    components:{
        ServerList,
        ModalCreateServers,
        ServerChannels,
        CreateModalChannel
    },
}
</script>

<style scoped>
/* Стили для Dashboard */
.dashboard {
  display: flex;
  overflow: hidden;
}

/* Стили для Main */
.main-content {
  flex: 1; /* Основной контент занимает оставшуюся часть */
  background-color: rgb(49,51,56);
  overflow-y: auto;
}
.channel-group {
  margin-top: 20px;
}

.channel-group h2 {
  font-size: 1.2em;
  color: #555;
}

ul {
  list-style-type: none;
  padding-left: 15px;
}

li {
  padding: 5px 0;
}

.text-channel::before {
  content: "📄 ";
}

.voice-channel::before {
  content: "🎙️ ";
}
</style>