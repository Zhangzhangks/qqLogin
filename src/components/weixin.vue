<template>
    <div class="login-window">
        <button @click="getWechatQRCode">微信扫码登录</button>
        <div v-if="qrCodeUrl">
            <img :src="qrCodeUrl" alt="微信登录二维码" />
        </div>
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
    setup() {
        const qrCodeUrl = ref(null);

        const getWechatQRCode = async () => {
            try {
                // 请求后端接口获取二维码 URL
                const response = await axios.get('http://localhost:8081/api/wechat-login-qrcode');
                qrCodeUrl.value = response.data.url; // 这里假设后端返回的数据中有 url 字段
            } catch (error) {
                console.error('获取二维码失败:', error);
            }
        };

        return {
            qrCodeUrl,
            getWechatQRCode
        };
    }
});
</script>

<style scoped>
.login-window {
    text-align: center;
    padding: 20px;
}

.login-window img {
    margin-top: 20px;
    max-width: 200px;
    border: 1px solid #ddd;
}
</style>