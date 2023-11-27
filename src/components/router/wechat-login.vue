<template>
    <!-- 登录框 开始-->
    <el-dialog style="width:800px;margin:0px auto;" title="" :visible.sync="dialogFormVisible">
        <div id="loginForm">
            <el-form>
                <el-form-item>
                    <h1 style="font-size:30px;color:#00B38A">拉勾</h1>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="phone" placeholder="请输入常用手机号..."></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="password" placeholder="请输入密码..."></el-input>
                </el-form-item>
            </el-form>
            <el-button style="width:100%;margin:0px auto;background-color: #00B38A;font-size:20px" type="primary"
                @click="login">确 定</el-button>
            <p></p>
            <!-- 微信登录图标 -->
            <img @click="goToLoginWX"
                src="http://www.lgstatic.com/lg-passport-fed/static/pc/modules/common/img/icon-wechat@2x_68c86d1.png"
                alt="" />
        </div>

        <!-- 二维码 -->
        <wxlogin id="wxLoginForm" style="display:none" :appid="appid" :scope="scope" :redirect_uri="redirect_uri"></wxlogin>


    </el-dialog>
    <!-- 登录框 结束-->
</template>

<script>
export default {
    data() {
        return {
            isLogin: false, // 登录状态，true：已登录，false：未登录
            userDTO: null, // 用来保存登录的用户信息
            isHasNewMessage: false, // 是否有新的推送消息
            dialogFormVisible: false, // 是否显示登录框，true：显示，false：隐藏
            phone: "", // 双向绑定表单 手机号
            password: "", // 双向绑定表单 密码
            appid: "wxd99431bbff8305a0",
            // 应用唯一标识，在微信开放平台提交应用审核通过后获得，这里就使用我申请好的
            //注释，并不是必须写在代码上方，也是可以写在下方的，只是一般习惯于写在代码上方
            scope: "snsapi_login", // 应用授权作用域，网页应用目前仅填写snsapi_login即可，该值基本固定死的
            redirect_uri: "http://www.pinzhi365.com/wxlogin",  //重定向地址，(回调地址)
            //该地址一般保存对应的第三方地址，或者说微信服务地址(一般需要自己写)
            //他只能检测申请后的值是否正确，但可不可以访问成功却不会检测，即只要可以访问，就说明是正确的值
            //一般是我们自己编写后端使得去接受code的值

            //也就是说，我们扫描二维码后，我们会得到微信官方的地址，并去微信官方发送申请
            //微信官方给出提示，在你手机上显示是否确认允许登录，当你确认后
            //微信官方就会将对应的参数给你的上线的网站，由于你的网站是上线的
            //那么当前的前端项目可以访问该网站（但通常是本身，而不是这里的其他项目，并且这个参数是第一次扫描得到的，而那个地址是重定向的（虽然说是回调，但是是重定向地址，只是回调一般代表是对方造成的，而这个造成是不是由对方自身处理则无关系，这里是我们处理（重定向），而不是对方自身处理），所以就算再本地处理这个登录，也是可以的，也就说明，如果以后的回调是由服务器来访问的，那么就不能处理本地，这在大多数的其他公司提供的情况都是如此，只是这个微信登录还并没有，当然，微信支付一般也可以，以后不确定了（微信登录也是））
            //从而得到对应的参数值（申请后，会有的方法调用），在根据对应的地址（redirect_uri）使用get请求来操作（一般来说他只识别域名，否则通常会出现错误，不会给出二维码）
            //当然，对应的参数值就如我们自己访问返回的结果是一样的，所以自然可以得到，要不然，你浏览器访问url的页面数据是怎么来的呢
            //总体来说，就是允许后，相当于请求对应的地址，并给出对应的参数，我们的服务器接收后，再次自动的访问这个地址，由于是再次的访问，所以也称为重定向地址（一般这个再次访问的过程由对应的函数处理，即二维码的那个函数，当然也可以认为是重定向的操作（与转发对应的那个，并且这个时候重定向也可以认为存在参数操作，是可以给重定向操作参数的，浏览器存在这样的开关接口（一般是二维码的那个最终获取的），当然，其他关于这方面的也会存在，百度就知道了，如mvc的FlashMapManager组件））
            //从而当前前端对应的后端就得到了对应的code参数的值以及其他参数的值（一般是state参数的值)
            //所以code的得到，也是由对应根据微信的上线网站来得到的，所以基本三个参数必须要正确才可
            //appid基本是唯一，用它来表示不同的网站，从而得到对应的报错信息是否正确（而不是每个网站得到）
            //后面的就是网站的不同信息了

            //上面三个参数，一般申请后，基本都会给出对应的值

            //第三方在一些情况下，是客户与服务之间统一操作的一方，如这里


            //这里你可能会有疑问，为什么需要code，而不直接给令牌呢
            //从浏览器出发，如果给令牌，必然会暴露，我们从上知道，我们的前端将数据给后端时是get请求
            //这样的请求必然是通过浏览器的，所以我们需要对应的临时凭证
            //实际上你允许后，页面的确发生跳转，并可以在url上看到对应的参数信息（这样容易被拦截知道信息）
            //所以为了不在浏览器上操作，一般我们会直接在程序里进行请求（如java），而不会在浏览器上进行
            //而正是因为初始数据的传递基本必须要经过浏览器，所以令牌也基本在java程序里面进行操作
            //也为了防止code给拦截，所以发送的get请求中，不止是有code
            //还有当前网站的信息，一般对应的唯一id不会暴露出去
            //若你能破解网站的对应的唯一值
            //那么也必定可以得到对应的微信用户的私隐信息
            //但账号密码基本不会得到，因为单独的授权并不能得到账号和密码
            //实际上程序的get请求虽然也会被拦截，但是相对于安全一些，因为基本是使用类似于https来操作的
            //实际上就算被拦截，但对应的账号和密码也基本上得不到的
            //那为什么不一直使用https呢（一般前端使用的是http的），既然更加安全，那么对应的操作也就会越多
            //特别是大型多次的操作，使用https会大量的使用资源，所以不会一直用
            //虽然post不那么明显，但也是明文，所以这样，就使用更加高效的get了
        };
    },
    methods: {
        goToLoginWX() {
            //alert("微信登录");
            //普通的登录表单隐藏
            document.getElementById("loginForm").style.display = "none"

            //显示二维码
            document.getElementById("wxLoginForm").style.display = "block"


        },

    },
}
</script>