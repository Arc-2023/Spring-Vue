<template>
<div id="body">
  <div class="form">
    <el-form
      ref="formref"
      :model="this.dataform"
      :rules="rules"
      size="large"
      style="
      width: 50%;
      overflow: auto;
      ">
      <el-form-item
          style="display: flex"
        label="alertToken"
        prop="alertToken">
        <el-input v-model="dataform.alertToken"></el-input>
        <el-button type="primary" @click="submit">Submit</el-button>
      </el-form-item>

    </el-form>
  </div>

</div>
</template>

<script>
import {UserStore} from "@/store/user";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "myprofile",
  setup(){
    const userstore = UserStore();
    return {
      userstore
    }
  },
  data() {
    return {
      dataform:{
        alertToken:this.userstore.alertToken
      },
      rules:{
        alertToken:[
          {required:1,message:'not null',trigger:'blur'}
        ]
      },
    }
  },
  methods:{
    submit(){
      this.userstore.changeAlertToken(this.dataform.alertToken)
    }
  },
  watch:{},
  mounted() {
  },

}
</script>

<style scoped>

</style>
