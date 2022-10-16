<template>
<div id="main">
  <div class="editor">
    <mavon-editor
        ref="md"
        style="
        height: 100%;
        width: 100%;
        overflow: hidden;
        border-radius: 15px;"
        v-model="data.content"
        @imgAdd="imgAdd"
        @imgDel="imgDel"
        @save="submitcontent"
        :subfield="subfield">

      <template #right-toolbar-after>
        <div style="
        display: flex;
        align-content: center;
        justify-content: right;
        align-items: center;
        padding: 3px;
                    ">
          <el-button type="primary" disabled round >{{ this.data.creater }}</el-button>
          <el-button type="primary" disabled round >{{ this.data.createdTime }}</el-button>
          <el-button type="primary" disabled round >{{ this.data.lastedittime }}</el-button>
          <el-button
              type="primary"
              circle
          @click="uploadimages"><el-icon><UploadFilled /></el-icon></el-button>
        </div>
      </template>
    </mavon-editor>
  </div>
</div>
</template>

<script>
import {notestore} from "@/store/note";
import {UserStore} from "@/store/user";
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import {ElMessage} from "element-plus";
export default {
  name: "OnlineNotePage",
  components:{
  },
  setup(){
    const md = ref('')
    const note = notestore()
    const user = UserStore()
    return{
      md,
      note,
      user
    }
  },
  data(){
    return{
      data:{
        creater:'',
        createdTime:'',
        lastedittime:'',
        content:'',
        subfield:false,
        imgs:{},
        id:'',
        noteid:''
      }

    }
  },
  methods:{
    imgAdd(pos,$file){
      this.imgs[pos]=$file
    },
    imgDel(pos){
      delete this.imgs[pos]
    },
    uploadimages(){
      const formdata = new FormData
      for(var img in this.imgs){
        formdata.append(img,this.imgs[img])
      }
      this.note.upload(formdata).then(res=>{
        for(var img in res.data.imgs){
          this.md.$img2Url(img[0],img[1])
        }
      })
    },
    submitcontent(){
      this.note.submitcontent(this.data)
    }
  },
  computed:{

  },
  async mounted() {
    await this.note.getnote(this.$route.params.id).then((res) => {
      this.data.content = res.data.data.content
      this.data.creater = res.data.data.creater
      this.data.lastedittime = res.data.data.lastedittime
      this.data.createdTime = res.data.data.createdTime
      this.data.id = res.data.data.id
      this.data.noteid = res.data.data.noteid
    })
  }
}
</script>

<style scoped>
#main{
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  right: 0;
}
</style>
