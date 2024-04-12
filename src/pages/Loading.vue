<template>
    <div class="loading">
      <h1>Loading...</h1>
      <div class="progress">
        <div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">{{ progress }}%</div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import router from "@/scripts/router";
  
  export default {
    data() {
      return {
        progress: 0
      };
    },
    mounted() {
      // 백엔드 서버로부터 진행률을 주기적으로 받아옵니다.
      setInterval(async () => {
        try {
          const response = await axios.get('/api/items/progress');
          this.progress = response.data.progress;
          if (this.progress === 100) {
            // 3D 변환이 완료되면 알림창을 띄우고 메인 페이지로 이동합니다.
            window.alert('3D 변환이 완료되었습니다!');
            router.push({ path: '/' });
          }
        } catch (error) {
          console.error('진행률을 받아오는 중 오류 발생:', error);
        }
      }, 1000); // 1초마다 진행률 업데이트
    }
  };
  </script>
  
  <style scoped>
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .progress {
    width: 50%;
    margin-top: 20px;
  }
  
  .progress-bar {
    background-color: #007bff;
    width: 0;
    transition: width 0.3s ease;
  }
  </style>