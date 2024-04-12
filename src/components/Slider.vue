<template>
    <div class="slider">
      <transition name="fade">
        <img :src="currentImage" alt="Slide Image" class="slide-image">
      </transition>
      <div class="slider-current-idx">{{ currentIndex + 1 }} / {{ images.length }}</div>
      <button @click="next" class="slider-button-left">&gt;</button>
      <button @click="prev" class="slider-button-right">&lt;</button>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  
  export default {
    setup() {
      const images = ref([
        '/slide/slide2.jpg',
        '/slide/slide1.jpg',
        '/slide/slide3.jpg',
        '/slide/slide4.jpg'
      ]);
  
      const currentIndex = ref(0);
  
      const currentImage = computed(() => images.value[currentIndex.value]);
      const prev = () => {
        currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
      };
  
      const next = () => {
        currentIndex.value = (currentIndex.value + 1) % images.value.length;
      };
  
      return {
        images,
        currentIndex,
        currentImage,
        prev,
        next
      };
    }
  };
  </script>
  
  <style>
  .slider {
    position: relative;
    width: 900px;
    height: 600px;
  }
  
  .slide-image {
    width: 100%;
    height: 100%;
    object-fit: cover; 
  }
  
  .slider-current-idx {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 5px 10px;
    border-radius: 5px;
  }
  
  .slider-button-left, .slider-button-right {
    position: absolute;
    top: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 10px;
    border: none;
    cursor: pointer;
  }
  
  .slider-button-right {
    left: 100px;
  }
  
  .slider-button-left {
    right: 10px;
  }
  
  
  </style>
  