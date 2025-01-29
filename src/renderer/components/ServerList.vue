<template>
<!-- <div class="server__container">
    {{ this.servers[0].name }}
</div>
 -->
 <div class="sidebar">
    <div class="icon">
      <img src="../assets/images/goida.png"/>
    </div>
    <div class="menu">
        <button class="menu-button"  @click="selectServer(server)" v-for="server in servers" :key="server.id">

          <div v-if="server.avatar_url && server.avatar_url !== 'null' && server.avatar_url.length > 0">
            <img :src="'http://localhost:5000' + server.avatar_url" />
          </div>
          <div v-else>
            {{ server.name }}
          </div>
           
        </button>
        <button class="menu-button" @click="$emit('open-modal')">
            <svg width="48" height="48" viewBox="0 0 48 48" class="svg_c5f96a" overflow="visible"><defs><path d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24Z" id="2c53752f-d308-4314-a0c1-aab435050959-blob_mask"></path></defs><mask id="2c53752f-d308-4314-a0c1-aab435050959" fill="black" x="0" y="0" width="48" height="48"><use href="#2c53752f-d308-4314-a0c1-aab435050959-blob_mask" fill="white" class=""></use></mask><foreignObject x="0" y="0" width="48" height="48" mask="url(#2c53752f-d308-4314-a0c1-aab435050959)"><div class="circleIconButton_db6521" aria-label="Добавить сервер" role="treeitem" data-list-item-id="guildsnav___create-join-button" tabindex="0"><svg class="circleIcon_db6521" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M13 5a1 1 0 1 0-2 0v6H5a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V5Z" class=""></path></svg></div></foreignObject></svg>
        </button>
    </div>
</div>

</template>
<style scoped>
.circleIconButton_db6521{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
}
.svg_c5f96a{
    
    color: hsl(145.385 calc(1 * 65%) 39.216% / 1);

}
.sidebar {
  background-color: rgb(30,31,34); /* Тёмно-серый фон */
  height: 100vh;
  width: 72px; /* Ширина панели */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
}

.icon {
  margin-bottom: 20px;
}

.icon img {
  width: 48px; /* Размер логотипа */
  height: 48px;
  cursor: pointer;
  /* background-color: #5865f2; /* Фон под логотип */ 
}

.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px; /* Расстояние между кнопками */
}

.menu-button {
  width: 48px;
  height: 48px;
  border-radius: 50%; /* Круглая форма */
  background-color: #36393f; /* Цвет кнопки */
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.menu-button:hover {
  background-color: #5865f2; /* Цвет при наведении */
}

.icon-download,
.icon-compass {
  width: 24px;
  height: 24px;
  background-size: cover;
}

/* Добавьте изображения для иконок, если они кастомные */
.icon-download {
  background-image: url('/path-to-download-icon.png');
}

.icon-compass {
  background-image: url('/path-to-compass-icon.png');
}
</style>
<script>
import axios from "axios";

export default{

    data(){
        return{
            servers:[]
        }
        
    },
    methods: {
      async selectServer(server) {
        this.$emit("server-selected", server);
    //  this.selectedServer = server;
   //   await this.fetchServerDetails(server.id); // Загружаем дополнительные данные о выбранном сервере
    },

    // Метод для загрузки деталей сервера (каналы, участники и т.д.)
    async fetchServerDetails(serverId) {
      const apiUrl = import.meta.env.VITE_API_URL;

      try {
        const response = await axios.get(`${apiUrl}/api/servers/get/${serverId}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        // Обновляем данные выбранного сервера
        this.selectedServer.channels = response.data.channels;
        this.selectedServer.members = response.data.members;
        console.log("Server details:", response.data);
      } catch (error) {
        console.error("Error fetching server details:", error.response?.data || error.message);
      }
    },
        async fetchServers() {
            const apiUrl = import.meta.env.VITE_API_URL;

            if (!apiUrl) {
                console.error("API URL is not defined in environment variables.");
                return;
            }

            try {
  
                const response = await axios.get(`${apiUrl}/api/servers/user-servers`, {
                    headers: {
                        // Добавьте необходимые заголовки, если они требуются
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Пример, если требуется токен
                        'Content-Type': 'application/json',
                    },
                });

                // Обрабатываем успешный ответ
                console.log("Servers fetched successfully:", response.data);
                return  response.data.userServers; // Возвращаем данные
            } catch (error) {
                // Обрабатываем ошибку
                console.error("Error fetching servers:", error.response?.data || error.message);
            }
        }
    },
    async created(){
        this.servers = await this.fetchServers();
    }
}

</script>