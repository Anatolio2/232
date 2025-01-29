<template>
<div class="auth__container">
    <div class="auth__form">
        <div class="auth__main">
            <div class="auth">
                <div class="auth__header">
                    <a class="auth__text" style="font-weight: 600;">С возвращением!</a>
                    <!--   <p class="auth__text top" style="margin-top: 1vh;">Мы так рады видеть вас снова</p> -->
                </div>
                <div class="auth__input">
                    <p class="auth__text gray">Адрес электронной почты или номер телефона<span class="require">*</span></p>
                    <input class="" v-model="this.email">
                </div>
                <div class="auth__input">
                    <p class="auth__text gray">Пароль<span class="require">*</span></p>
                    <input class="" v-model="this.password">
                    <p class="auth__text password">Забыли пароль?</p>
                </div>
                <div class="auth__button">
                    <button @click="this.handleSubmit()">Вход</button>
                    <p class="auth__text no-uppercase" style="font-size: 1.4vh; line-height: 1.6vh; margin-top: 0.4vh;">Нужна учетная запись? <span class="auth__text password" @click="this.$router.push('/register')">Зарегистроваться</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="auth__main">
            <div class="auth__line" style="margin: 0 3.2vh;"></div>
        </div>
        <div class="auth__main qr_code">
            <div class="qr__code">
                <div class="qr__codeInit">
                    <img src="../assets/images/qr_code.svg"  id="qr_code_init" />
                </div>
                <div class="qr__code__overlay">
                    <img src="../assets/images/logo.png"/>
                </div>
            </div>
            <div class="qr__code__messages">
                <h2>Войти с помощью
                    <span>QR-кода</span>
                </h2>
                <div class="qr__mb">
                    Отсканируйте код с помощью <strong>мобильного приложения Discord</strong>, чтобы сразу же войти в систему.
                </div>
            </div>
        </div>
    </div>
</div>
  </template>
  <script>
import InputAuthField from "../components/UI/InputAuthField.vue";
import axios from 'axios'
export default {
    components: {
     InputAuthField,
    },
    data() {
      return {
        users: {},
        email: '',
        password: '',
        modalOpen: 0, //authorized
      };

    },
    methods: {
      async handleSubmit() {
            this.users = {
                email: this.email,
                password: this.password
            }
            window.GoidaZvonAPI.sendEvent('LoginUser', JSON.stringify(this.users))
            window.GoidaZvonAPI.receiveEvent('LoginUserResponse', (event, response) => {
                if (response.success) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('userSession', JSON.stringify(response.userData.user[0]));

                    this.$router.push('/')
                    } else {
                    console.error('Ошибка авторизации:', response.error);
                }
                
            })
      },
   
    },
    created(){
 
    }
  };
  </script>
<style scoped>




.auth__container {
    top: 50%;
    left: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    /* width: 78.4vh; */
    padding: 3.2vh;
    font-size: 1.8vh;
    /*   height: 40.8vh; */
    background-color: rgb(49, 51, 56);
    border-radius: 5px;
}

.auth__form {
    display: flex;
    text-align: center;
    align-items: start;
}

.auth {
    display: flex;
    flex-direction: column;
    width: 41.4vh;
    gap: 2.0vh;
}

.auth__main {
    display: flex;
    flex-direction: column;
}

.auth__text {
    padding-bottom: 0.8vh;
    font-family: TT Norms;
    color: white;
}

.require {
    color: rgb(206, 60, 64);
    padding-left: 0.2vh;
}

.auth__text.no-uppercase {
    text-transform: none;
    color: rgb(135, 141, 149);
}

.auth__text.password {
    font-size: 1.4vh;
    color: rgb(13, 137, 199);
    text-transform: none;
    margin-top: 1vh;
}

.auth__text.gray {
    letter-spacing: .02em;
    font-weight: 700;
    font-size: 1.2vh;
    line-height: 1.6vh;
    color: rgb(174, 179, 185)
}


.auth__header {
    width: 100%;
    font-size: 2.4vh;
    line-height: 3vh;
    margin-bottom: 2vh;
}

.auth__button {
    display: flex;
    flex-direction: column;
    text-align: left;
    cursor: pointer;
}

.auth__button button {
    font-family: TT Norms;
    color: white;
    background-color: rgb(88, 101, 242);
    width: 100%;
    height: 4.4vh;
    font-size: 1.6vh;
    line-height: 2.6vh;
    border-radius: 0.3vh;
    outline: none;
    border: none;
}

.qr__code {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.8vh;
    border-radius: 0.4vh;
    width: 16vh;
    height: 16vh;
    background-color: rgb(255, 255, 255);
}

.qr__code__overlay {
    position: absolute;
    display: flex;
}

.qr__code__overlay img {
    width: 5vh;
}

.qr__codeInit {
    animation: loaderAnimation-3zHV3e 2.0;
}

.qr__codeInit img {
    width: 20vh;
}

.qr__code__messages {
    max-width: 22vh;
    margin-top: 1.5vh;
}

.qr__code__messages h2 {
    max-width: 22vh;
    font-family: TT Norms;
    font-weight: 600;
    color: rgb(232, 233, 235);
    font-size: 2.4vh;
    line-height: 3vh;
}

.auth__main.qr_code {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 34.4vh;
}

.qr__mb {
    font-size: 1.6vh;
    font-family: TT Norms;
    color: rgb(152, 156, 163);
}

.qr__mb strong {
    color: rgb(167, 172, 179);
}

@-webkit-keyframes loaderAnimation-3zHV3e {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }
    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
}

@keyframes loaderAnimation-3zHV3e {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }
    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
}
</style>