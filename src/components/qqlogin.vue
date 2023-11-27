<template>
    <div class="login">
        <div class="logo">
            <!-- 这个是为了在本窗口打开 -->
            <!-- a标签的href就是要打开的窗口地址 -->
            <a
                href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">

                <img src="../assets/qq.jpg" alt="">
            </a>

            <!-- 官方步骤 会打开新窗口调用window.open方法-->
            <!-- return window.open('https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback', 'oauth2Login_10796' ,'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes'); -->
            <!-- <span id="qqLoginBtn"></span> -->
        </div>
    </div>
</template>
<script setup >
import { ref, reactive, onMounted } from 'vue'
onMounted(() => {
    QC.Login({
        btnId: "qqLoginBtn"
    })
})
</script>


<style lang='scss' scoped>
.login {
    height: 20vh;
    background-color: #efefef;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo {
    width: 100px;
    height: 100px;
    margin: 100px;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
</style>