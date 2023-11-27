<template>
    <div>qq回调--是否登陆{{ flag }}</div>
    <button @click="getMyval">拿取我的qq状态信息</button>
    <ul>
        <li>头像:<img :src="qqdata.figureurl_qq_2" /></li>
        <li>姓名:{{ qqdata.nickname }}</li>
        <li>性别:{{ qqdata.gender }}</li>

    </ul>
</template>
<script setup >
import { ref } from 'vue';

const flag = QC.Login.check()//用于检查qq是否登录
const uniodId = ref('')
const token = ref('')
const qqdata = ref({})

// QC.Login.getMe	Function	无	回调函数 function(openId, accessToken)
// openId：用户身份的唯一标识。建议保存在本地，以便用户下次登录时可对应到其之前的身份信息，不需要重新授权。
// accessToken：表示当前用户在此网站 / 应用的登录状态与授权信息，建议保存在本地。
// 注意： getMe方法只能在用户登录授权后调用，建议总是在使用check方法并返回true的条件下，调用getMe方法

// 拿取openID和这个授权信息
QC.Login.getMe((openId, accessToken) => {
    console.log(openId, 'openid');
    uniodId.value = openId;
    token.value = accessToken;
})
console.log(flag);

const getMyval = () => {

    //使用这个方法来拿取信息 https://wiki.connect.qq.com/js_sdk%e4%bd%bf%e7%94%a8%e8%af%b4%e6%98%8e
    // QC.api(api, paras, fmt, method)

    /**
     * api    接口名称 https://wiki.connect.qq.com/api%e5%88%97%e8%a1%a8  这个网站是qq的所有Api列表
     * paras  参数   携带参数根据要求来
     * fmt    格式   指定OpenAPI的返回格式，可用值为“json”或“xml”。默认为“json”。
     * method 请求方式  指定OpenAPI调用请求的发起方式，可用值为“GET”或“POST”。根据配置，
     */
    // https://wiki.connect.qq.com/get_user_info  网站是该接口返回的参数
    QC.api('get_user_info', { params: { openId: uniodId.value, access_token: token.value } }, 'json', 'GET').success(res => {
        console.log(res);
        qqdata.value = res.data
    })
}
</script>


<style lang='less' scoped></style>