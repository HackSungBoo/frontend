<template>
    <div class="join-container">
        <form @submit.prevent="submitForm" class="join-form">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" id="email" v-model="email" />
            </div>
            <div class="form-group">
                <label for="password">비밀번호</label>
                <input type="password" id="password" v-model="password" />
            </div>
            <div class="form-group">
                <label for="passwordConfirm">비밀번호 확인</label>
                <input type="password" id="passwordConfirm" v-model="passwordConfirm" />
                <p v-if="password !== passwordConfirm" style="color: red;">비밀번호가 일치하지 않습니다.</p>
            </div>
            <button type="submit">회원가입</button>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';
import router from "@/scripts/router";


export default {
    name: 'Join',
    data() {
        return {
            email: '',
            password: '',
            passwordConfirm: '',
           };
    },
    methods: {
        async submitForm() {
            try {
                if (this.password !== this.passwordConfirm) {
                    console.error('비밀번호가 일치하지 않습니다.');
                    window.alert("비밀번호가 일치하지 않습니다");
                    return;
                }
                const userData = {
                    email: this.email,
                    password: this.password,
                };

                const response = await axios.post('/api/join/', userData);
                //console.log('서버 응답:', response.id);
                console.log('서버 응답:', response ? response.data : 'No response data');
                window.alert('회원가입이 완료되었습니다.');

                const moveTo = window.confirm('로그인 화면으로 이동하시겠습니까?');
                console.log('moveTo:', moveTo);
                if (moveTo) {
                    console.log('이동: 로그인 화면');
                    router.push({ path: '/login' }); // 로그인 화면으로 이동
                } else {
                    console.log('이동: 메인 화면');
                    router.push({ path: '/' }); // 메인 화면으로 이동
                }

            } catch (error) {
                console.error('오류 발생:', error.response.data);
            }
        },
    },
};
</script>
  
<style scoped>
.join-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.join-form {
    width: 300px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 3px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}
</style>
  