<template>
<div id="main">
  <div class="editor">
    <mavon-editor
        ref="md"
        style="
        height: 100%;
        max-width: 100%;"
        v-model="data.content"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
        @save="savacontent">

      <template #right-toolbar-after>
        <div style="
        display: flex;
        align-content: center;
        justify-content: right;
        align-items: center;
        padding: 3px;
                    ">
          <el-button type="primary" disabled round >{{ data.creater }}</el-button>
          <el-button type="primary" disabled round >{{ data.createdTime }}</el-button>
          <el-button type="primary" disabled round >{{ data.lastedittime }}</el-button>
          <el-button
              type="primary"
              circle
          @click="uploadimages"><el-icon><UploadFilled /></el-icon></el-button>
          <el-button
            type="primary"
            circle
            @click="changenote"
            icon="edit"></el-button>
        </div>
      </template>
    </mavon-editor>
    <el-dialog
      v-model="dialogtoggle"
      title="Enter Your Basic Info">
      <el-form
        :model="tmp">
        <el-form-item
          label="title"
          >
          <el-input v-model="tmp.title"></el-input>
        </el-form-item>
        <el-form-item
          label="intro">
          <el-input v-model="tmp.intro"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button
            @click="this.dialogtoggle=false"
          type="info"
          round>Cancel</el-button>
        <el-button
          @click="submitnote"
          type="success"
          round
        icon="edit">
        </el-button>
      </template>
    </el-dialog>
  </div>
</div>
</template>

<script>
import {notestore} from "@/store/note";
import {UserStore} from "@/store/user";
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import {ElMessage} from "element-plus";
import {uploadimage} from "@/api/note";
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
        title:'',
        intro:''
      },
      dialogtoggle:false,
      tmp:{
        title:'',
        intro:''
      }

    }
  },
  methods:{
    $imgAdd(pos,$file){
      this.uploadimage(pos,$file)
    },
    $imgDel(pos){
      this.delimage(this.imgs[pos])
    },
    uploadimage(pos,$file){
      var formdata = new FormData();
      formdata.append('file',$file)
      console.log(this.user.getUsername)
      formdata.append('username',this.user.getUsername)
      this.note.uploadimg(formdata,this.user.getUsername).then(res=>{
          this.md.$img2Url(pos,'http://119.23.243.88:8888/files/imgs/'+ res.data.message)
      })
    },
    delimage(imgname){
      this.note.delimg(imgname)
    },
     savacontent(){
      if(this.data["title"]=='' || this.data["intro"]==null){
        this.dialogtoggle=true
      }else {
        this.note.submitcontent(this.data)
      }
    },
    submitnote(){
      this.data.intro = this.tmp.intro
      this.data.title=this.tmp.title
      this.note.submitcontent(this.data)
    },
    changenote(){
      this.tmp.title = this.data.title
      this.tmp.intro = this.data.intro
      this.dialogtoggle = true
    },
    setData: function (res) {
      this.data.content = res.data.data.content
      this.data.creater = res.data.data.creater
      this.data.lastedittime = res.data.data.lastedittime
      this.data.createdTime = res.data.data.createdTime
      this.data.id = res.data.data.id
      this.data.title = res.data.data.title
      this.data.intro = res.data.data.intro
    },
  },
  computed:{

  },
   async mounted() {
    await this.note.getnote(this.$route.params.id).then((res) => {
      this.setData(res);
    })
  }
}
</script>

<style scoped>
#main{
  justify-content: center;
  border-radius: 15px;
  overflow: auto;
  width: 100%;
  height: 100%;
  right: 0;
}

</style>
