<template>
  <div class="websocket-test">
    <h1>WebSocket Test</h1>
    <button @click="sendMessage">Send</button>
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: progressBarWidth }">{{ progressBarWidth }}</div>
    </div>
  </div>
</template>

<script>
import router from "@/scripts/router";

export default {
  name: 'WebSocketTest',
  data() {
    return {
      progressBarWidth: '0%',
      socket: null
    };
  },
  mounted() {
    // WebSocket 연결
    this.socket = new WebSocket("ws://43.200.158.21/ws");
    // 연결이 성공하면
    this.socket.onopen = () => {
      console.log("WebSocket 연결 성공.");
    };
    // 메시지 수신 시
    this.socket.onmessage = (event) => {
      console.log("서버에서 메시지 수신:", event.data);
      // 받은 메시지가 숫자인 경우 프로그래스 바 업데이트
      const progress = parseInt(event.data);
      if (!isNaN(progress)) {
        this.progressBarWidth = `${progress}%`;
      }
    };
    // 연결이 종료되면
    this.socket.onclose = () => {
      console.log("WebSocket 연결 종료.");
      window.alert('3D 변환이 완료되었습니다.');
      router.push({ path: '/' });

    };
  },
  methods: {
    sendMessage() {
      console.log("서버로 'send' 메시지 전송...");
      this.socket.send("send");
    }
  }
};
</script>

<style scoped>
.websocket-test {
  text-align: center;
}

.progress-container {
  width: 300px;
  height: 30px;
  border: 1px solid #ccc;
  margin: 20px auto; /* 화면 중앙 정렬 */
  position: relative;
}

.progress-bar {
  height: 100%;
  background-color: #4CAF50;
  text-align: center;
  line-height: 30px;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
}
</style>

