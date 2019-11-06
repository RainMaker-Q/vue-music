<template>
<div id="login-bg" >
    <div class="login">
        <el-row style="margin: 10px auto;">
            <img src="./../assets/pencil.png" width="150px">
        </el-row>

        <el-row style="margin: 30px auto;">
            <el-radio-group v-model="choose">
                <el-radio-button label="登录" ></el-radio-button>
                <el-radio-button label="注册"></el-radio-button>
            </el-radio-group>
        </el-row>

        <div v-if="choose=='登录'">
            <el-row style="margin: 30px; " >
                <el-col :span="5">
                    <font size="2" >账号:</font>
                </el-col>
                <el-col :span="18">
                    <el-input 
                        placeholder="请输入账号"
                        v-model="username">
                        <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                    </el-input>
                </el-col>
            </el-row>
            <el-row style="margin: 30px">
                <el-col :span="5">
                    <font size="2" >密码:</font>
                </el-col>
                <el-col :span="18">
                    <el-input
                        placeholder="请输入密码"
                        v-model="password"
                        show-password>
                        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                    </el-input>
                </el-col>
            </el-row>

            <el-row style="margin: 30px">
                <el-col :span="5">
                    <font size="2" >验证码:</font>
                </el-col>
                <el-col :span="18">
                    <el-input
                        placeholder="请输入验证码"
                        v-model="captchaInput"
                        >
                    </el-input>
                </el-col>
            </el-row>
            <div v-html="captchaSvg"></div>

        </div>
        <div v-if="choose=='注册'">

            <el-row style="margin: 30px; ">
                <div v-if="!userNameOk" style="display:flex;flex-direction:row-reverse;margin-bottom:2px;">
                    <el-tag type="danger"> {{userNameMsg}} </el-tag>
                </div>

                <el-col :span="6">
                    <font size="2" >账号:</font>
                </el-col>
                <el-col :span="18">
                    <el-input 
                        placeholder="请输入账号"
                        @blur="checkUserNameOk"
                        v-model="username">
                        <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                    </el-input>
                </el-col>
            </el-row>
            <el-row style="margin: 30px">
                <div v-if="!pwdSameOk" style="display:flex;flex-direction:row-reverse;margin-bottom:2px;">
                    <el-tag type="danger"> {{pwdMsg}} </el-tag>
                </div>
                <el-col :span="6">
                    <font size="2" >密码:</font>
                </el-col>
                <el-col :span="18">
                    <el-input
                        placeholder="请输入密码"
                        v-model="password"
                        @blur="checkPwdSame"
                        show-password>
                        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                    </el-input>
                </el-col>
            </el-row>
            <el-row style="margin: 30px">
                <el-col :span="6">
                    <font size="2" >确认密码:</font>
                </el-col>
                <el-col :span="18">
                    <el-input
                        placeholder="请再次输入密码"
                        v-model="password2"
                        @blur="checkPwdSame"
                        show-password>
                        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                    </el-input>
                </el-col>
            </el-row>
            <el-row style="margin: 30px">
                <el-col :span="6">
                    <font size="2" >邀请码:</font>
                </el-col>
                <el-col :span="18">
                    <el-input
                        placeholder="请输入邀请码"
                        v-model="invitCode"
                        >
                        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                    </el-input>
                </el-col>
            </el-row>

        </div>


        
        
        
        <el-row style="margin: 20px auto;">
            <el-button @click="submit" type="success" style="width:280px;" :disabled="!(pwdSameOk&&userNameOk)">提交</el-button>
        </el-row>
        
    </div>

</div>
    
</template>

<script>
import axios from 'axios'

const baseUrl = 'http://10.128.232.65:3000/myapi';

export default {
    // name: login,
    data: ()=>{
        return {
            choose: "登录",
            username: '',
            password: '',
            password2: '',
            invitCode: '',      //邀请码
            userNameOk: true,   //账号输入是否符合规范
            userNameMsg: '',    //用户名有误时提示信息
            pwdSameOk: true,    //两次密码是否一致,默认第一次一致，等再次输入密码之后进行判断
            pwdMsg: '',     //密码不一致信息
            captcha: '',        //验证码
            captchaInput: '',   //输入的验证码
            captchaSvg: '',     //验证码svg图片



        }
    },
    mounted() {
        this.getCaptcha();      //请求验证码
    },
    methods: {

        submit() {
            if(this.choose=='登录') {
                if(!this.username) {
                    this.showMessage('warning', '请输入用户名!');
                }
                else if(!this.password) {
                    this.showMessage('warning', '请输入密码!');
                }
                else if(this.captchaInput.toLowerCase()===this.captcha.toLowerCase()) {
                    this.login();
                } else {
                    this.showMessage('warning', '验证码输入错误!');
                }
                
            } else if(this.choose=='注册') {
                this.checkUser();
            }
        },

        getCaptcha() {
            let _this = this;
            axios.get(baseUrl+'/captcha')
            .then(res=>{
                let data = res.data;
                _this.captchaSvg = data.data;
                _this.captcha = data.text;
            })
        },

        login() {       //登录的接口
            axios.post(baseUrl+'/login',
                {
                username: this.username,
                password: this.password
            })
            .then(res=>{
                let data = res.data;
                if(data.code==200) {    //返回200注册成功
                    localStorage.setItem("username", data.data.username);
                    localStorage.setItem("userid", data.data.userid);
                    this.showMessage('success', data.msg);
                    this.$router.push({path: '/music'});

                } else if(data.code==2) {       //返回2说明账号密码错误
                    this.showMessage('warning', data.msg);
                } else if(data.code==4) {       //返回4说明该用户不存在
                    this.showMessage('warning', data.msg);
                }
            })
        },

        checkUser() {       //检测当前用户是否存在并注册
            let _this = this;
            if(this.invitCode!=='bupt') {
                _this.showMessage('warning', '邀请码错误，请先获得邀请码！');
                return ;
            }
            axios.post(baseUrl+ '/isUserExist',
                {
                username: _this.username
            })
            .then(res => {
                let data = res.data;
                if(data.code==200) {      //返回代码是3说明当前用户名可用
                    _this.register();     //进行注册
                } else if(data.code==3) {   //返回3说明该用户名已经被占用
                    _this.showMessage('warning', data.msg);

                }
            })
            
        },
        
        register() {    //注册用户
            let _this = this;

            axios.post(baseUrl+'/adduser',      
                {
                username: _this.username,   //当前的账号和密码
                password: _this.password
            })
            .then(res => {
                let data = res.data;
                _this.showMessage('success', data.msg);      //显示注册成功
                _this.username = '';    //清空用户名
                _this.password = '';    //清空密码
                _this.password2 = '';
                _this.invitCode = '';
            })
        },

        showMessage(type, msg) {        //提示信息，输入显示的类型和信息 elemeui实现的
            this.$message({
                message: msg,
                type: type
            })
        },

        checkPwdSame() {                    //检测两次密码输入是否一致
            if(this.password===this.password2 && this.password.length>=6) {
                this.pwdSameOk = true;
            } 
            if(this.password!==this.password2) {
                this.pwdSameOk = false;
                this.pwdMsg = '两次密码输入不一致'
            }
            if(this.password.length<6) {
                this.pwdSameOk = false;
                this.pwdMsg = '密码长度不小于6位'
            }
        },
        checkUserNameOk() { //检查注册的用户名是否符合规范: 长度大于6位且无非法字符
            var patrn=/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;  

            if(patrn.test(this.username)) {
                this.userNameMsg = '您输入的内容有非法字符';
                this.userNameOk = false;
            }
            else if(this.username.length<6) {
                this.userNameMsg = '用户名至少为6位';
                this.userNameOk = false;
            } else {
                this.userNameOk = true;
            }

            
        }
    }

}
</script>

<style scoped>

#login-bg {
    display: flex;
    /* flex-wrap: wrap; */
    width: 100%;
    height: 100%;

    position: absolute;
    align-items: center;
    justify-content: center; 
    background: url(./../assets/bg.jpeg)
}

.logo {
    margin: 10px auto;
}
.login {
    width: 300px;
    height: 700px;
    display: flex;
    flex-direction: column;
    border: solid 5px #FFF;
    border-radius: 20px;
    box-shadow: 6px 6px 10px #FFF;
} 



</style>