<template>
  <div class="custom-card" @click="goToProductDetail">


    <div class="image-container">
      <img :src="itemImg" alt="Product Image">
      <div class="discount-badge">
        -15%
      </div>
    </div>

    <div class="content-container">
      <div class="product-category-container">
        <h5 class="product-name">{{ item.name }}</h5>
        <p class="category">카테고리 : {{ getCategoryName(item.category_id) }}</p>
      </div>
      <div class="price">
        <div class="discounted-price">{{ discountPrice(item.price) }}</div>
        <div class="original-price">{{ formatPrice(item.price) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/scripts/router";
import { categories } from "@/scripts/categories";
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "CustomCard",
  props: {
    item: Object
  },
  setup(props) {
    const itemImg = ref(null);

    const goToProductDetail = () => {
      router.push({ name: 'ProductDetail', params: { id: props.item.id } }).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    };
    const getCategoryName = (categoryId) => {
      const category = categories.find(cat => cat.id === categoryId);
      return category ? category.name : "Unknown Category";
    };

    const formatPrice = (price) => {
      if (!price) return '';
      return price.toLocaleString("ko-KR") + "원";
    };

    const discountPrice = (price) => {
      if (!price) return '';
      return (price * 0.75).toLocaleString("ko-KR") + "원";
    };

    onMounted(() => {
      axios.get(`/api/items/${props.item.id}/multi/`).then(({ data }) => {
        itemImg.value = data.image_path;
      });

 /*     const imgSrc = `/api/items/${props.item.id}/image`;
      itemImg.value = imgSrc;
    */
    });

    return { goToProductDetail, getCategoryName, itemImg, formatPrice, discountPrice };
  }
}
</script>

<style scoped>
@import '../assets/css/components/card.css'
</style>
