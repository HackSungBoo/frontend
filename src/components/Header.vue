<template>
  <header data-bs-theme="dark">
    <div class="collapse text-bg-dark" id="navbarHeader">
      <div class="container">
        <div class="row">
          <div class="col-sm-4 py-4">
            <h4>사이트맵</h4>
            <ul class="list-unstyled">
              <li>
                <router-link to="/" class="text-white">메인 화면</router-link>
              </li>
              <li>
                <router-link to="/join" class="text-white" v-if="!$store.state.account.id">회원 가입</router-link>
              </li>
              <li>
                <router-link to="/login" class="text-white" v-if="!$store.state.account.id">로그인</router-link>
                <router-link to="/login" class="text-white" @click="logout()" v-else>로그 아웃</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="navbar navbar-dark bg-dark shadow-sm">
      <div class="container">


        <a href="/" class="navbar-brand d-flex align-items-center">
          <img class="header-logo" :src="img_logo">
        </a>


        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader"
          aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import store from "@/scripts/store";
import router from "@/scripts/router";

export default {
  name: 'Header',
  data() {
    return {
      img_logo: "/icon/ccrc_logo.png",
      img_search: "/icon/search.png",
    };
  },
  setup() {
    const logout = () => {
      store.commit('setAccount', 0);
      sessionStorage.removeItem("id");
      router.push({ path: '/' });

    }
    return { logout };
  },

}

</script>

<style scoped>
.header {
  width: 374px;
}



.list-unstyled {
  text-align: left;
}

.col-sm-4 {
  text-align: left;
}
</style>