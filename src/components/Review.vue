<template>
  <div class="review">
    <h2>상품 리뷰</h2>

    <!-- 리뷰 작성 폼 -->
    <form @submit.prevent="submitReview" class="review-form">
      <textarea v-model="state.reviewData.content" class="form-control" placeholder="리뷰 작성란"></textarea>
      <select v-model="state.reviewData.star" class="form-select">
        <option disabled value="">별점 선택</option>
        <option value="1">1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3">3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>
      </select>
      <button type="submit" class="btn btn-primary">리뷰 등록하기</button>
    </form>

    <!-- 리뷰 목록 -->
    <div v-if="state.reviews && state.reviews.length > 0" class="review-list">
      <h3>리뷰 목록</h3>
      <ul class="list-group">
        <li v-for="(review, index) in state.reviews" :key="index" class="list-group-item">
          <div class="d-flex justify-content-between align-items-center">

            <div>
              <span class="star-rating">
                <span v-for="i in 5" :key="i"
                  :class="{ 'fas fa-star': i <= review.star, 'far fa-star': i > review.star }"></span>
              </span>
              {{ review.star }} Stars
            </div>
            <!-- 줄 바꿈하여 리뷰 내용 표시 -->
            <div class="review-content">{{ review.content }}</div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>등록된 리뷰가 없습니다.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";

export default {
  name: "Review",
  props: {
    productId: {}
  },
  setup(props) {
    const state = reactive({
      reviews: [],
      reviewData: {
        content: "",
        star: 0,
        user_id: 1,
        item_id: props.productId,
      }
    });

    const submitReview = () => {
      const productId = props.productId;
      state.reviewData.item_id = productId;
      axios.post(`/api/items/${productId}/reviews/`, state.reviewData).then((response) => {
        console.log("리뷰가 성공적으로 등록되었습니다:", response.data);
        window.alert('리뷰가 성공적으로 등록되었습니다.');
        fetchReviews();
        state.reviewData.content="";
        state.reviewData.star = ""; 
      }).catch((error) => {
        console.error("리뷰 등록에 실패했습니다:", error);
      });
    };

    const fetchReviews = () => {
      const productId = props.productId;
      axios.get(`/api/items/${productId}/reviews/`).then(response => {
        state.reviews = response.data;
      });
    };

    return { state, submitReview, fetchReviews };
  },
  watch: {
    productId() {
      if (this.productId) {
        this.fetchReviews();
      }
    }
  }
};
</script>

<style scoped>
.review {
  margin-top: 100px;
  margin-bottom: 300px;
  width: 1200px;
  padding: 24px;
  margin-left:auto;
  margin-right:auto;
}

.review h2,
h3 {
  margin-bottom: 20px;
  color: black;
  font-size: 24px;
  font-family: Poppins;
  font-weight: 600;
  word-wrap: break-word;
}

.review-form {
  margin-bottom: 20px;
}

.review-list {
  margin-top: 20px;
}

.review-list .list-group-item {
  margin-bottom: 10px;
}

.review-content {
  flex-grow: 1;
  margin-left: 10px;
  font-family: Poppins;
}
</style>
