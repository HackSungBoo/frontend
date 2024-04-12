<template>
  <div class="productdetail-layout">
    <!-- Product Card -->
    <div class="product-card">
      <!-- Product Image Block -->
      <div class="product-image-block">
        <!-- Product Image -->
        <img class="product-image" :src="itemImg" />
        <!-- Product Image Buttons -->
        <div class="product-image-block-top">
          <button class="product-image-block-top-button1">
            <img :src="img_left" class="img-left">
          </button>
          <button class="product-image-block-top-button2">
            <img :src="img_share" class="img-share">
          </button>
        </div>
      </div>
      <!-- Product Info -->
      <div class="product-info-block">
        <!-- Product Info Header -->
        <div class="heading">
          <!-- Category and Product Name -->
          <div class="product-category-and-name">
            <div class="category-name">{{ getCategoryName(state.product.category_id) }}</div>
            <div class="product-name">{{ state.product.name }}</div>
          </div>
          <!-- Product Price -->
          <div class="product-price">\ {{ formatPrice(state.product.price) }}</div>
        </div>
        <!-- Product Info Middle Container -->
        <div class="product-info-middle-container">
          <!-- Review and Rating -->
          <div class="review-star-container">
            <!-- Rating and Review Block -->
            <div class="rating-and-review-block">
              <!-- Rating Container -->
              <div class="rating-container">
                <!-- Star Ratings -->
                <div class="star-container">
                  <img class="star-1" :src="img_star">
                  <img class="star-2" :src="img_star">
                  <img class="star-3" :src="img_star">
                  <img class="star-4" :src="img_star">
                  <img class="star-5" :src="img_star_no_color">
                </div>
                <!-- Rating Number -->
                <div class="rating-number">4.4</div>
              </div>
              <!-- Review Number Container -->
              <div class="review-number-container">
                <!-- Review Number -->
                <div class="review-number">12 reviews</div>
                <!-- Right Arrow Icon -->
                <img class="review-number-arrow" :src="img_right">
              </div>
            </div>
            <!-- Avatars -->
            <div class="avatars">
              <img class="UnsplashMxrfbyxwdy4" :src="img_avatar1" />
              <img class="Unsplash6rruaqtwt60" :src="img_avatar2" />
              <img class="UnsplashNsze2hlxozo" :src="img_avatar3" />
              <img class="UnsplashF8iuhoidtbi" :src="img_avatar4" />
            </div>
          </div>
          <!-- Ordering -->
          <button @click="orderItem" class="order-button">주문하기</button>
          <!-- Order Modal -->
          <div v-if="isOrderModalVisible" class="order-modal-overlay">
            <div class="order-modal-content">
              <h3>주문 확인</h3>
              <p>상품을 주문하시겠습니까?</p>
              <button @click="placeOrder" class="btn btn-primary">확인</button>
              <button @click="closeOrderModal" class="btn btn-secondary">취소</button>
            </div>
          </div>
        </div>
        <!-- Product Info Lower Container -->
        <div class="product-info-lower-container">
          <!-- Tab Buttons -->
          <div class="tab-buttons">
            <button class="tab-buttons-text Description" @click="showTab('description')">Description</button>
            <button class="tab-buttons-text Materials" @click="showTab('materials')">Materials</button>
            <button class="tab-buttons-text CareInstructions" @click="showTab('careInstructions')">Care
              instructions</button>
          </div>
          <!-- Tab Content -->
          <div class="tab-content" v-if="currentTab === 'description'">
            {{ state.product.description }}
          </div>
          <div class="tab-content" v-else-if="currentTab === 'materials'">
            <!-- Material Description -->
            이 제품은 고품질 소재의 조합으로 제작되었습니다. 나무 프레임은 선택된 우수한 소나무나 메이플 우드를 사용하여 견고하고 안정된 구조를 제공합니다. 프레임의 표면은 특별한 마감 처리가 되어 있어
            오랜 기간 사용해도 마모나 변형 없이 보호됩니다. 부드럽고 편안한 시트는 다양한 플러시 패브릭으로 제공되어 다양한 사용자의 취향과 인테리어 스타일에 맞춰 선택할 수 있습니다. 금속 부품은 우수한
            품질의 강철로 제작되어 내구성과 안정성을 보장합니다. 또한, 환경 친화적인 재료로 제작되어 안전성과 지속 가능성을 고려하였습니다.
          </div>
          <div class="tab-content" v-else-if="currentTab === 'careInstructions'">
            <!-- Care Instructions -->
            제품의 오랜 수명과 아름다움을 유지하기 위해서는 정기적인 관리가 필요합니다. 청소는 부드러운 마이크로파이버 천을 사용하여 주기적으로 하세요. 세제를 사용할 경우에는 중성 세제만을 사용하고,
            강력한 화학성 성분을 함유한 세제는 피해주세요. 또한 제품을 청소한 후에는 깨끗한 천으로 제품의 표면을 완전히 건조시켜 주세요. 직사광선을 피해 저장하고, 습기나 다습한 환경에서 사용하지 않도록
            주의해야 합니다. 필요한 경우, 제품에 특수한 보호제나 코팅제를 적용하여 오랜 시간 사용해도 품질을 유지할 수 있습니다. 이러한 지침을 준수하여 제품의 아름다움과 성능을 오랫동안 즐기실 수
            있습니다.
          </div>
        </div>
      </div>
    </div>
    <!-- 3D Viewer Button -->
    <button @click="openPopup" class="btn btn-secondary">3D로 보기</button>
    <!-- 3D Viewer Popup -->
    <div v-if="isPopupVisible" class="popup-overlay">
      <div class="popup-content">
        <button @click="closePopup" class="close-btn">X</button>

        <Rendering :url="modelUrl" v-if="currentCategoryId !== 4" />
        <Rendering :url="item_3D" v-else />
      </div>
    </div>
    <!-- Similar Products Container -->
    <div class="similar-products">
      <div class="similar-products-header">
        <div class="similar-products-title">Similar products</div>
      </div>
      <div class="similar-products-card-container">
        <!-- Similar Products Display -->
        <div class="col" v-for="(item, idx) in state.similarProducts.slice(0, 4)" :key="idx">
          <SimilarCard :item="item" />
        </div>
      </div>
    </div>
    <!-- Product Reviews -->
    <Review :productId="state.product.id" />
  </div>
</template>

<script>
import axios from "axios";
import { reactive, onMounted, ref } from "vue";
import { useRoute } from 'vue-router';
import Review from "@/components/Review.vue";
import Rendering from "@/components/Rendering.vue";
import router from "@/scripts/router";
import { categories } from "@/scripts/categories";
import SimilarCard from "@/components/SimilarCard.vue";

export default {
  name: "ProductDetail",
  components: { Review, Rendering, SimilarCard },

  data() {
    return {
      img_star: "/icon/star.png",
      img_star_no_color: "/icon/star_no_color.png",
      img_right: "/icon/right.png",
      img_left: "/icon/left.png",
      img_avatar1: "/avatar/avatar1.png",
      img_avatar2: "/avatar/avatar2.png",
      img_avatar3: "/avatar/avatar3.png",
      img_avatar4: "/avatar/avatar4.png",
      img_share: "/icon/share.png",
    };
  },

  setup() {
    const route = useRoute();
    const productId = route.params.id;

    const state = reactive({
      product: {},
      similarProducts: [],
    });
    const itemImg = ref(null);
    const item_3D = ref(null);
    const isPopupVisible = ref(false);
    const isOrderModalVisible = ref(false);
    const currentCategoryId = ref(null);

    const orderItem = () => {
      isOrderModalVisible.value = true;
    };

    const placeOrder = () => {
      window.alert('상품을 주문하였습니다!');
      router.push('/');
    };

    const closeOrderModal = () => {
      isOrderModalVisible.value = false;
    };

    const openPopup = () => {
      isPopupVisible.value = true;
    };

    const closePopup = () => {
      isPopupVisible.value = false;
    };

    const formatPrice = (price) => {
      if (!price) return '';
      return price.toLocaleString("ko-KR") + "원";
    };
    const getCategoryName = (categoryId) => {
      const category = categories.find(cat => cat.id === categoryId);
      return category ? category.name : "Unknown Category";
    };

    const currentTab = ref('description');

    const showTab = (tabName) => {
      currentTab.value = tabName;
    };



      const modelUrl = "/point_cloud.ply";
    



    onMounted(() => {

      axios.get(`/api/items/${productId}`)
        .then(({ data }) => {
          state.product = data;
          getSimilarProducts(data.category_id);
          currentCategoryId.value = data.category_id;
        })
        .catch(error => {
          console.error("Error fetching product:", error);
        });


      axios.get(`/api/items/${productId}/multi/`).then(({ data }) => {
        itemImg.value = data.image_path;
        item_3D.value = data.splat_path;
        console.log("itemImg.value : ", itemImg.value);
        console.log("itemImg : ", itemImg);
        console.log("item_3D.value : ", item_3D.value);
        console.log("item_3D: ", item_3D);

      });

      /* const imgSrc = `/api/items/${productId}/image`;
       itemImg.value = imgSrc;
 */
    });

    const getSimilarProducts = (categoryId) => {
      axios.get(`/api/items/category/${categoryId}`)
        .then(({ data }) => {

          state.similarProducts = data;
          console.log("state.similarProducts", state.similarProducts);
        })
        .catch(error => {
          console.error("Error fetching similar products:", error);
        });
    };

    return {
      state, itemImg, item_3D, orderItem, isOrderModalVisible, placeOrder,
      closeOrderModal, modelUrl, openPopup, closePopup, isPopupVisible,
      formatPrice, getCategoryName, currentTab, showTab,currentCategoryId
    };
  },
};
</script>

<style scoped>
@import '../assets/css/pages/productdetail.css'
</style>
