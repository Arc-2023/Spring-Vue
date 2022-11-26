<template>
<div class="body">
  <el-form :model="submitForm"
           class="el-form"
           label-position="right"
           >
    <el-form-item label="AppID"
                  prop="AppID">
      <el-input v-model="submitForm.token"
                placeholder="Type in ID"></el-input>
    </el-form-item>
    <el-form-item label="Message"
                  prop="message">
      <el-input v-model="submitForm.message"
                placeholder="Type in Message"></el-input>
    </el-form-item>
    <el-button type="primary"
               @click="submitFormData">Submit</el-button>
  </el-form>
</div>
</template>
<script>
import {ElMessage} from "element-plus";
import {pagestore} from "@/store/page";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "thingpush",
  setup(){
    const pagest = pagestore()
    return{
      pagest
    }
  },
  data(){
    return{
      submitForm:{
        token:'',
        message:''
      }

    }
  },
  methods:{
    submitFormData(){
      pagest.submitPushForm(this.submitForm).then(()=>{
        ElMessage({
          message:'Added Push Info Successfully',
          type:'success'
        })
      }).catch(error=>{
        ElMessage({
          message:'Add Push Info Faild: ' +error,
          type:'error'
        })
      })
    },
  },
  computed:{
  },
  watch: {

  }
}
</script>

<style scoped>

</style>
