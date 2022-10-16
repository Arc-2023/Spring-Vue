<template>
  <div class="body">
    <div class="loginForm">
      <el-form
          ref="form"
          :model="form"
          :rules="formrules"
          class="login-form"
          show-message= 'show-message'
          status-icon= 'status-icon'
          label-position="right"
          :scroll-to-error="true"
      >
        <div class="title">
          <span>Login To Arc</span>
        </div>
        <el-form-item ref="username" label='Username' prop="username" id="form-item">
          <el-input
              ref="usernameInput"
              placeholder="username"
              v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item ref="username" label='Password' prop="password" id="form-item">
          <el-input
              ref="passwordInput"
              placeholder="password"
              v-model="form.password"
              :type="passwordtype"></el-input>
        </el-form-item>
        <div class="buttons">
          <el-button style="width: 50%" id="loginbutton" ref="loginButton" type='primary' :loading="loading" @click="submit">Login</el-button>
          <el-button style="width: 50%" id="regbutton" ref="regButton" type='primary' :loading="loading" @click="register">Register</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import {ElMessage} from "element-plus";
import {UserStore} from "@/store/user";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login-page",
  setup(){
    const userstore = UserStore()
    return{
      userstore
    }
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      formrules: {
        username: [
          { required: 1,message:'不空',trigger:'blur'},
          ],
        password:[
          {required:1,message:'不空',trigger:'blur'},
          ]
      },
      loading:false,
      passwordtype:'password',
      redirect:''
    };
  },
  computed:{

  },
  watch:{

  },
  methods: {
    submit() {
      this.loading = true
      if (this.$refs.form.validate()) {
        this.userstore.login(this.form).then(info=>{
          console.log(this.redirect)
          router.push(this.redirect=='' ? '/' : this.redirect)
          this.loading=false
        }).catch(e=>{
          ElMessage({
            message:e,
            type:'error'
          })
          this.loading=false
        })
        }
      },
    register(){
      this.userstore.register({username:this.form.username,password:this.form.password})
    }
    }
};
</script>
<style scoped>
*{
  box-sizing: content-box;
}
.body{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  overflow: hidden;
  text-align: center;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  background-image: linear-gradient(
      45deg,
      hsl(240deg 100% 44%) 0%,
      hsl(237deg 100% 44%) 13%,
      hsl(235deg 99% 44%) 19%,
      hsl(232deg 99% 44%) 24%,
      hsl(230deg 99% 44%) 28%,
      hsl(227deg 98% 44%) 32%,
      hsl(225deg 98% 44%) 35%,
      hsl(222deg 98% 44%) 39%,
      hsl(220deg 98% 44%) 42%,
      hsl(217deg 97% 44%) 45%,
      hsl(215deg 97% 44%) 48%,
      hsl(212deg 97% 44%) 52%,
      hsl(210deg 96% 44%) 55%,
      hsl(207deg 96% 44%) 58%,
      hsl(205deg 96% 44%) 61%,
      hsl(202deg 95% 44%) 65%,
      hsl(200deg 95% 44%) 68%,
      hsl(197deg 95% 43%) 72%,
      hsl(195deg 95% 43%) 76%,
      hsl(192deg 94% 43%) 81%,
      hsl(189deg 94% 43%) 87%,
      hsl(187deg 94% 43%) 100%
  );
}
.title{
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 5px;
}
#form-item{
  position: relative;
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 5px;
}
.login-form{
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  padding: 10px;
  top:30%;
  background: rgba(0,0,0,30%);

}
.buttons{
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
