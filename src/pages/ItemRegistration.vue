<!-- views/ItemRegistration.vue -->

<template>
    <div class="item-registration">
        <h1 class="item-register-title">Register Your Product Here!</h1>

        <!-- 상품 등록 폼 -->
        <form @submit.prevent="submitForm" class="item-form">
            <div class="form-group">
                <label for="itemName" class="form-label">Product Name</label>
                <input type="text" id="itemName" v-model="formData.name" placeholder="상품명" class="form-control" required />
            </div>

            <div class="form-group">
                <label for="itemImage" class="form-label">Upload Image</label>
                <input type="file" id="itemImage" @change="handleImageUpload" class="form-control" required />
                <img v-if="previewImage" :src="previewImage" alt="Preview" class="preview-image">
                <span v-if="previewImage">[미리보기]</span>
            </div>

            <!-- 비디오 업로드 -->
            <div class="form-group">
                
                <label for="itemVideo" class="form-label">Upload Video</label>
                <input type="file" id="itemVideo" @change="handleVideoUpload" class="form-control" required />
                <video v-if="previewVideo" :src="previewVideo" alt="Preview" class="preview-video" controls></video>
                <span v-if="previewVideo">[미리보기]</span>
            </div>


            <div class="form-group">
                <label for="itemDescription" class="form-label">Product Description</label>
                <textarea id="itemDescription" v-model="formData.description" placeholder="상품 설명" class="form-control" required></textarea>
            </div>

            <div class="form-group">
                <label for="itemPrice" class="form-label">Product Price</label>
                <input type="number" id="itemPrice" v-model="formData.price" class="form-control" required />
            </div>

            <div class="form-group">
                <label for="itemCategory" class="form-label">Product Category</label>
                <select id="itemCategory" v-model="formData.category_id" class="form-select" required>
                    <option value="1">책상</option>
                    <option value="2">침대</option>
                    <option value="3">의자</option>
                    <option value="4">기타</option>
                </select>
            </div>

            <button type="submit" class="item-register-submit">Submit</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import router from "@/scripts/router";

export default {
    data() {
        return {
            formData: {
                name: "",
                description: "",
                price: 0,
                category_id: 1,
                image: null,
                video: null
            },
            previewImage: null,
            previewVideo: null
        };
    },
    methods: {
        handleImageUpload(event) {
            this.formData.image = event.target.files[0];
            if (this.formData.image) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.previewImage = reader.result;
                };
                reader.readAsDataURL(this.formData.image);
            }
        },
        handleVideoUpload(event) {
            this.formData.video = event.target.files[0];
            if (this.formData.video) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.previewVideo = reader.result;
                };
                reader.readAsDataURL(this.formData.video);
            }
        },
        submitForm() {
            const formData = new FormData();
            formData.append('name', this.formData.name);
            formData.append('description', this.formData.description);
            formData.append('price', this.formData.price);
            formData.append('category_id', this.formData.category_id);
            formData.append('image', this.formData.image);
            formData.append('video', this.formData.video);

            axios.post("/api/items/", formData).then((response) => {
                console.log("상품이 성공적으로 등록되었습니다:", response.data);
                window.alert('상품이 성공적으로 등록되었습니다.');
                router.push({ path: '/' });

            }).catch((error) => {
                console.error("상품 등록에 실패했습니다:", error);
            });
        }
    },
}
</script>

<style scoped>
@import '../assets/css/pages/itemregistration.css'
</style>