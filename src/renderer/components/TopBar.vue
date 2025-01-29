<template>
<div class="top-bar" >
    <span class="app-title">GoidaZvon</span>
    <div class="top-bar-icons">
    <span class="icon minimize" @click="this.minimize()"></span>
    <span class="icon maximize"  @click="this.maximize()"></span>
    <span class="icon close"  @click="this.close()"></span>
    </div>
</div>
</template>

<script>
export default {
    methods: {
      minimize() {
        window.appAPI.minimize();
      },
      maximize() {
        window.appAPI.maximize();
      },
      close() {
        window.appAPI.close();
      }
    }
  
}
</script>
<style scoped>
.top-bar {
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(30,31,34); /* Цвет фона */
  color: #ffffff; /* Цвет текста */
  padding: 5px 10px;
  height: 25px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* Лёгкая тень */
  font-family: TT Norms;
}

.app-title {
  font-size: 14px;
  font-weight: bold;
}

.top-bar-icons {
  display: flex;
  gap: 10px;
}

.icon {
  width: 14px;
  height: 14px;
  display: inline-block;
  border-radius: 50%;
  background-color: #7289da; /* Цвет кнопок */
  -webkit-app-region: no-drag
}

.icon.minimize {
  background-color: #3ba55c; /* Зеленый */
}

.icon.maximize {
  background-color: #faa61a; /* Оранжевый */
}

.icon.close {
  background-color: #f04747; /* Красный */
}

.icon:hover {
  filter: brightness(1.2); /* Подсветка при наведении */
  cursor: pointer;
}
</style>