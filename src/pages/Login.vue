<template>

    <div class="login-container">
        <form @submit.prevent="submitForm" class="login-form">
            <div class="form-group">
                <label for="email" class="login-label">Email</label>
                <input type="text" class="login-input" id="email" v-model="email" />
            </div>
            <div class="form-group">
                <label for="password">비밀번호</label>
                <input type="password" id="password" v-model="password" />
            </div>
            <button type="submit" class="login-button">Log In</button>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';
import router from "@/scripts/router";
import store from "@/scripts/store";

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async submitForm() {
            try {
                const userData = {
                    email: this.email,
                    password: this.password,
                };

                const response = await axios.post('/api/login', userData);
                console.log('서버 응답:', response ? response.data : 'No response data');
                window.alert('로그인이 완료되었습니다.');

                store.commit('setAccount', response.data);
                sessionStorage.setItem("id",response.data);

                console.log('이동: 메인 화면');
                router.push({ path: '/' });
            } catch (error) {
                console.error('오류 발생:', error.response.data);
                window.alert('로그인 정보가 존재하지 않습니다.');
            }
        },
    },
};
</script>
  
<style scoped>
@import '../assets/css/pages/login.css'


</style>
  