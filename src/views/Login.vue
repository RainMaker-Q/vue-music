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
            <el-row style="margin: 30px">
                <el-input 
                    placeholder="请输入账号"
                    v-model="username">
                    <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                </el-input>
            </el-row>
            <el-row style="margin: 30px">
                <el-input
                    placeholder="请输入密码"
                    v-model="password"
                    show-password>
                    <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
            </el-row>
        </div>
        <div v-if="choose=='注册'">

            <el-row style="margin: 30px">
                <el-input 
                    placeholder="请输入账号"
                    v-model="username">
                    <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                </el-input>
            </el-row>
            <el-row style="margin: 30px">
                <el-input
                    placeholder="请输入密码"
                    v-model="password"
                    show-password>
                    <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
            </el-row>
            <el-row style="margin: 30px">
                <el-input
                    placeholder="请再次输入密码"
                    v-model="password2"
                    @blur="checkPwdSame"
                    show-password>
                    <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
            </el-row>
            <el-row style="margin: 30px">
                <el-input
                    placeholder="请输入邀请码"
                    v-model="invitCode"
                    show-password>
                    <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
            </el-row>

        </div>


        <el-row style="margin: 20px auto;">
            <el-button @click="submit" type="success" style="width:280px;">提交</el-button>
        </el-row>
        
    </div>

</div>
    
</template>

<script>
import axios from 'axios'

const baseUrl = 'http://10.28.218.154:3000/myapi';

export default {
    // name: login,
    data: ()=>{
        return {
            choose: "登录",
            username: '',
            password: '',
            password2: '',
            invitCode: '',      //邀请码
            isSame: true,       //两次密码是否一致,默认第一次一致，等再次输入密码之后进行判断

        }
    },
    methods: {

        submit() {
            let _this = this;
            if(this.choose=='登录') {
                _this.login();
            } else if(this.choose=='注册') {
                _this.checkUser();
            }
        },

        login() {
            axios.post(baseUrl+'/login',
                {
                username: this.username,
                password: this.password
            })
            .then(res=>{
                let data = res.data;
                if(data.code==200) {
                    localStorage.setItem("username", data.data.username);
                    localStorage.setItem("userid", data.data.userid);
                    this.showMessage('success', data.msg);
                } else if(data.code==2) {
                    this.showMessage('warning', data.msg);
                }
                console.log(res.data)
            })
        },

        checkUser() {       //检测当前用户是否存在
            let _this = this;
            axios.post(baseUrl+ '/isUserExist',
                {
                username: _this.username
            })
            .then(res => {
                let data = res.data;
                if(data.code==200) {      //返回代码是200说明当前用户名可用
                    _this.register();     //进行注册
                } else if(data.code==3) {
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
            })
        },

        showMessage(type, msg) {        //提示信息，输入显示的类型和信息 elemeui实现的
            this.$message({
                message: msg,
                type: type
            })
        },

        checkPwdSame() {                    //检测两次密码输入是否一致
            if(this.password===this.password2) {
                this.isSame = true;
                this.showMessage('success', "密码输入一致")
            } else {
                this.isSame = false;
                this.showMessage('warning', "两次输入密码不一致");
            }
            if(this.password.length<6) {
                this.showMessage('warning', "密码长度不小于6位");
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