<template>
    <Sidebar data-bs-theme="dark">
      <!-- 변경된 부분: 사이드바 디자인 -->
      <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 280px;">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="me-2"
            viewBox="0 0 24 24">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          <strong>Album</strong>
        </a>
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link text-white">메인 화면</router-link>
          </li>
          <li class="nav-item" v-if="!$store.state.account.id">
            <router-link to="/join" class="nav-link text-white">회원 가입</router-link>
          </li>
          <li class="nav-item" v-if="!$store.state.account.id">
            <router-link to="/login" class="nav-link text-white">로그인</router-link>
          </li>
          <li class="nav-item" v-if="$store.state.account.id">
            <router-link to="/login" class="nav-link text-white" @click="logout()">로그 아웃</router-link>
          </li>
        </ul>
      </div>
    </Sidebar>
  </template>
  
  <script>
  import store from "@/scripts/store";
  import router from "@/scripts/router";
  
  export default {
    name: 'Sidebar',
    setup() {
      const logout = () => {
        store.commit('setAccount', 0);
        sessionStorage.removeItem("id");
        router.push({ path: '/' });
      }
      return {logout};
    }
  }
  </script>
  
  <style scoped>
  /* 변경된 부분: 스타일은 필요에 따라 수정 가능 */
  .d-flex {
    display: flex;
  }
  
  .flex-column {
    flex-direction: column;
  }
  
  .flex-shrink-0 {
    flex-shrink: 0;
  }
  
  .p-3 {
    padding: 1rem;
  }
  
  .text-white {
    color: #fff;
  }
  
  .bg-dark {
    background-color: #343a40;
  }
  
  .mb-auto {
    margin-bottom: auto;
  }
  
  .mb-3 {
    margin-bottom: 1rem;
  }
  
  .mb-md-0 {
    margin-bottom: 0;
  }
  
  .me-md-auto {
    margin-right: auto;
  }
  
  .nav-pills {
    display: flex;
    flex-direction: column;
  }
  
  .nav-item {
    margin-bottom: 0.5rem;
  }
  </style>
  