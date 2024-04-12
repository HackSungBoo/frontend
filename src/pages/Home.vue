<template>
  <div class="home">
    <div class="container mt-5">
      <div class="row mb-4">

        <div class="total_rec">
          <dev class="slider-container">
            <Slider></Slider>
          </dev>
          <div class="left_rec">
            <div class="welcome-section">
              <div class="banner_overlay"></div>
              <div class="banner_content">

                <div class="banner_title">AI-based<br />3D view of<br />Furniture</div>
                <div class="banner_description">Our furniture is made from selected and best quality materials that are
                  suitable for your dream home</div>
                <div class="banner_button-container">
                  <div class="banner_button">Shop Now</div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="features">
          <div class="feature-item">
            <div class="icon-container">
              <img :src=img_trophy alt="icon" class="icon">
            </div>
            <div class="content">
              <div class="title">High Quality</div>
              <div class="description">Crafted from top materials</div>
            </div>
          </div>
          <div class="feature-item">
            <div class="icon-container">
              <img :src=img_check alt="icon" class="icon">
            </div>
            <div class="content">
              <div class="title">Warranty Protection</div>
              <div class="description">Over 2 years</div>
            </div>
          </div>
          <div class="feature-item">
            <div class="icon-container">
              <img :src=img_delivery alt="icon" class="icon">
            </div>
            <div class="content">
              <div class="title">Free Shipping</div>
              <div class="description">Order over $150</div>
            </div>
          </div>
          <div class="feature-item">
            <div class="icon-container">
              <img :src=img_call alt="icon" class="icon">
            </div>
            <div class="content">
              <div class="title">24/7 Support</div>
              <div class="description">Dedicated support</div>
            </div>
          </div>

        </div>

      </div>


      <div class="col-md-6 text-start">
        <button @click="goToItemRegistration" class="btn btn-primary registration-btn">상품 등록</button>
      </div>
      <div class="row mb-4">
        <div class="col-md-8">
          <div class="search-container">
            <input type="text" v-model="state.searchTerm" class="form-control search-input" placeholder="상품을 검색하세요" />
            <button @click="filterItems" class="btn btn-primary search-btn">검색</button>
            <button @click="fetchItems" class="btn btn-secondary reset-btn">초기화</button>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-check form-switch">
            <input type="checkbox" class="form-check-input" id="searchByName" v-model="state.searchByName">
            <label class="form-check-label" for="searchByName">상품명으로 검색</label>
          </div>
          <div class="form-check form-switch">
            <input type="checkbox" class="form-check-input" id="searchByCategory" v-model="state.searchByCategory">
            <label class="form-check-label" for="searchByCategory">카테고리로 검색</label>
          </div>
        </div>
      </div>

      <div class="card-container">
        <div class="card-container-title">Our Products</div>
        <div class="scrollable-container">
          <div class="row row-cols-1 row-cols-md-4 g-4">
            <div class="col" v-for="(item, idx) in state.items" :key="idx">
              <Card :item="item" />
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>

  <button @click="goToTest" class="test">테스트 페이지</button>





</template>

<script>
import { categories } from "@/scripts/categories";
import axios from "axios";
import { reactive } from "vue";
import Card from "@/components/Card.vue";
import Slider from "@/components/Slider.vue";
import router from "@/scripts/router";

export default {
  name: "Home",
  components: { Card, Slider },
  data() {
    return {
      img_trophy: "/icon/trophy.png",
      img_check: "/icon/check.png",
      img_delivery: "/icon/delivery.png",
      img_call: "/icon/call.png",
      images: [
        '/slide/slide1.jpg',
        '/slide/slide2.jpg',
        '/slide/slide3.jpg',
        '/slide/slide4.jpg'
      ],
      currentIndex: 0
    };
  },
  methods: {
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
  },

  setup() {
    const state = reactive({
      items: [],
      searchTerm: "",
      searchByName: false,
      searchByCategory: false
    });

    axios.get("/api/items/").then(({ data }) => {
      state.items = data;
    });

    const fetchItems = () => {
      axios.get("/api/items/").then(({ data }) => {
        state.items = data;
        state.searchTerm = "검색어를 입력하세요";
        state.searchByName = false;
        state.searchByCategory = false;
      });
    };

    const goToItemRegistration = () => {
      router.push({ path: "/new_item" });
    };

    const goToTest = () => {
      router.push({ path: "/Test" });
    };

    const filterItems = () => {
      let filteredItems = state.items;
      if (state.searchTerm.trim() !== "") {
        if (state.searchByName) {
          filteredItems = filteredItems.filter(item => item.name.toLowerCase().includes(state.searchTerm.toLowerCase()));
        } else if (state.searchByCategory) {
          const selectedCategory = categories.find(category => category.name.toLowerCase().includes(state.searchTerm.toLowerCase()));
          if (selectedCategory) {
            filteredItems = filteredItems.filter(item => item.category_id === selectedCategory.id);
          }
        }
      }
      state.items = filteredItems;
    };

    return { state, fetchItems, goToItemRegistration, filterItems, goToTest };
  },
};
</script>

<style scoped>
@import '../assets/css/pages/home.css'
</style>
