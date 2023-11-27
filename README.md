- qq 登录流程
  > 由于 qq 的 openID 需要由运维提供回调地址也是

# 1. 准备好回调地址 calback.vue 文件在 router 中配置

由于域名是www.corho.com和localhost不一致无法回调页面，需要在本地修改hosts地址。
windows

1. 找到 C:\Windows\System32\drivers\etc 下 hosts 文件
2. 在文件中加入 127.0.0.1 www.corho.com
3. 保存即可。

#### 如果提示没有权限

1. 将 hosts 文件移到桌面，然后进行修改，确认保存。
2. 将桌面 hosts 文件替换 c 盘文件

### 测试用 appid

### 100556005

### 测试用 redirect_uri

### http://www.corho.com:8080/#/login/callback

# 2. 放置登录按钮

# 3. 在 index.html 引入 js

> <script src="http://connect.qq.com/qc_jssdk.js" data-appid="100556005" data-redirecturi="http://www.corho.com:8080/#/login/callback"></script>

# 4. 调用方法

- 注意
  <!-- 这个是为了在本窗口打开 -->

             <!-- a标签的href就是要打开的窗口地址 -->
             <a
                 href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">

                 <img src="../assets/qq.jpg" alt="">
             </a>

             <!-- 官方步骤 会打开新窗口调用window.open方法-->
             <!-- return window.open('https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback', 'oauth2Login_10796' ,'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes'); -->
             <!-- <span id="qqLoginBtn"></span> -->

- const flag = QC.Login.check()//用于检查 qq 是否登录
  const uniodId = ref('')
  const token = ref('')
  const qqdata = ref({})

// QC.Login.getMe Function 无 回调函数 function(openId, accessToken)
// openId：用户身份的唯一标识。建议保存在本地，以便用户下次登录时可对应到其之前的身份信息，不需要重新授权。
// accessToken：表示当前用户在此网站 / 应用的登录状态与授权信息，建议保存在本地。
// 注意： getMe 方法只能在用户登录授权后调用，建议总是在使用 check 方法并返回 true 的条件下，调用 getMe 方法

// 拿取 openID 和这个授权信息
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

## }
