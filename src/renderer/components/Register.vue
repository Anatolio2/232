<template>
    <div class="auth__container">
        <div class="auth__form">
            <div class="auth__main">
                <div class="auth">
                    <div class="auth__header">
                        <a class="auth__text" style="font-weight: 600;">Создать учетную запись</a>
                        <!--   <p class="auth__text top" style="margin-top: 1vh;">Мы так рады видеть вас снова</p> -->
                    </div>
                    <InputAuthField
                    label="E-MAIL"
                    v-model="this.user.email"
                    required
                    />
                    <InputAuthField
                    label="Отображаемое имя"
                    v-model="this.user.nickname"
                    />
                    <InputAuthField
                    label="Имя пользователя"
                    v-model="this.user.name"
                    required
                    />
                    <InputAuthField
                    label="Пароль"
                    v-model="this.user.password"
                    required
                    />
                    <div class="checkbox__container">
                        <label class="checkbox__Wrapper checkbox">
                            <!-- Скрытый стандартный чекбокс -->
                            <input type="checkbox">
                            <!-- Кастомная часть чекбокса -->
                            <div class="checkbox__custom">
                                <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
                                    <path fill="var(--primary-360)" d="M21.7 5.3a1 1 0 0 1 0 1.4l-12 12a1 1 0 0 1-1.4 0l-6-6a1 1 0 1 1 1.4-1.4L9 16.58l11.3-11.3a1 1 0 0 1 1.4 0Z"></path>
                                </svg>
                            </div>
                            <!-- Текстовая часть -->
                            <div class="checkbox__label">
                                (Необязательно) Я не против получать электронные письма с новостями GoidaZvon, советами и специальными предложениями. От рассылки можно отписаться в любое время.
                            </div>
                        </label>
                    </div>
                    <div class="auth__button">
                        <button @click="this.handleSubmit()">Регистрация</button>
                        <p class="auth__text no-uppercase" style="font-size: 1.4vh; line-height: 1.6vh; margin-top: 0.4vh;">Уже есть аккаунт? <span class="auth__text password" @click="this.$router.push('/login')">Авторизоваться</span>
                        </p>
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
            user:{
                email: "",
                nickname: "",
                name: "",
                password: "",
            },
        };

    },
    methods: {
        async handleSubmit() {
        const apiUrl = import.meta.env.VITE_API_URL;

        try {
          console.log('[VITE] register button activated');
          window.GoidaZvonAPI.sendEvent('registerUserAccounts',  JSON.stringify(this.user))
          
          window.GoidaZvonAPI.receiveEvent('registerUserAccountsResponse', () =>{
            console.log('[VITE] user created');
            this.$router.push('/');
          })
        } catch (error) {

            }
        },
       
    },
};
</script>
<style scoped>
@font-face {
    font-family: TT Norms;
    src: url('../assets/fonts/nice.woff2');
}

/* Состояние активного чекбокса */
.checkbox__input:checked + .checkbox__custom {
    background-color: #5865F2;
    border-color: #5865F2;
}

.checkbox__custom svg {
    width: 16px;
    height: 16px;
    fill: #FFFFFF;
    display: none; /* Скрываем галочку по умолчанию */
}

/* Показываем галочку, если чекбокс выбран */
.checkbox__input:checked + .checkbox__custom svg {
    display: block;
}
.checkbox__label {
    
    font-size: 1.3vh;
    padding-left: 8px;
    font-family: TT Norms;
    letter-spacing: .02em;
    font-weight: 700;
    font-size: 1.2vh;
    line-height: 1.6vh;
    color: rgb(174, 179, 185)
}

.checkbox__custom {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 auto;
    width: 24px;
    height: 24px;
    border-width: 1px;
    border-style: solid;
    border-color: gray;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
}

.checkbox__custom svg {
    display: none; /* Скрываем галочку по умолчанию */
}

.checkbox input[type="checkbox"]:checked + .checkbox__custom svg {
    display: block; /* Отображаем галочку, если чекбокс выбран */
}

.checkbox input[type="checkbox"] {
    display: none; /* Скрываем стандартный чекбокс */
}

.checkbox__Wrapper {
    display: flex;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    align-items: center;
    font-size: 16px;
    max-width: 100%;
}

.checkbox__container {
    
    text-align: left;
    display: flex;
    flex-direction: row;
    display: flex;
    margin-top: 8px;
}
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

.auth__input {
    text-transform: uppercase;
    text-align: left;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.auth__input input {
    font-family: TT Norms;
    padding: 1vh;
    font-size: 1.6vh;
    /* width: 41.4vh; */
/*  height: 4vh; */
    border-radius: 3px;
    border: none;
    color: rgb(169, 171, 174);
    outline: none;
    background-color: rgb(30, 31, 34);
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