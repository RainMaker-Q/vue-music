<template>
    <div class="all" >
        <div class="">
            <el-row type="flex" justify="center">
                <el-col :span="12" >
                    <el-input v-model="inputContent" placeholder="请输入上联" @input="debounceFn" @keyup.enter.native="getAnswer"></el-input>
                </el-col>
                <el-button @click="getAnswer" class="btn-search" type="success" >对下联</el-button>
                
            </el-row>
            
            <div class="content" >
                <div class="upCouplets">
                    上联：<span  class="words" v-for="(item,index) in splitUpWords" :key="index">{{ item }}</span>
                </div>

                <div class="downCouplets">
                    下联：<span  class="words" v-for="(item,index) in splitDownWords" :key="index">{{ item }}</span>
                </div>
            </div>
        </div>

       
        
        
    </div>
</template>

<script>
import axios from 'axios'


export default {
    name: 'gen-couplets',
    data: () => {
        return {
            inputContent: "",
            aiOutput: "",
            debounceFn: {}
        }
    },
    mounted() {
        let _this = this;
        let fn = this.debounce(()=>{
            console.log("防抖");
            _this.getAnswer();
            }, 1200);
        this.debounceFn = fn;
    },
    computed: {
        splitUpWords() {
            return this.inputContent.split("");
        },
        splitDownWords() {
            return this.aiOutput.split("");

        }
    },
    watch: {
        inputContent(oldval) {
            if(oldval==="") {
                this.aiOutput = "";
            }
        }
    },
    methods: {
        getAnswer() {
            if(this.inputContent == '') return;
            let _this = this;
            let url = 'https://ai-backend.binwang.me/chat/couplet/' + _this.inputContent;
            axios.get(url).
                then(function(response) {
                    let answer = response.data.output;
                    console.log( answer );
                    _this.aiOutput = answer;
                })
        },
        debounce(fn, delay=200) {
            let timer;
            return function() {
                let context = this;
                let args = arguments;
                if(timer) clearTimeout(timer);
                timer = setTimeout( ()=>{
                    fn.call(context, args);
                    timer = null;
                }, delay);
            }
        }

    }
}
</script>



<style scoped>

.all {
    margin: 0 auto;
    width: 40%;
}

.upCouplets {

    font-size: 24px;
    margin-top: 30px;
}

.downCouplets {

    font-size: 24px;
    margin-top: 30px;
}

.words {
    margin: 5px;
    display: inline-block; width: 34px; height: 34px;
    line-height: 34px; text-align: center; font-size: 24px;
    vertical-align: middle; background-repeat: no-repeat;
    background-size: cover; 
    background-image: url(../assets/text-bg.png)
}


</style>