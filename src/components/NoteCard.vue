<template>
<div id="body" v-if="id==''">
<div class="header">
  <el-card
      style="
      border-radius: 15px;
      border: none;
      color:white"
      shadow="hover"
      class="card-item">
    <template #header>
      <div class="title">
        {{this.cardData.title}}
      </div>
    </template>
    <template #default>
      <div class="cary-body">
        {{this.cardData.content}}
      </div>
    </template>
  </el-card>

</div>
</div>
</template>

<script>
import {notestore} from "@/store/note";
export default {
  name: "NoteCard",
  setup(){
    const note = notestore()
    return{
      note
    }
  },
  props:['id'],
  data(){
    return{
      cardData:{
        title:'',
        createdtime:'',
        lastedittime:'',
        content:''
      }

    }
  },
  methods:{
    getNoteContent(){
      this.note.getnote(this.id).then(res=>{
        this.cardData.title=res.data.title
        this.cardData.content=res.data.content
        this.cardData.createdtime=res.data.createdtime
        this.cardData.lastedittime=res.data.lastedittime
      })
    }
  },
  watch:{


  },
  mounted() {

  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  font-family: "Arial Black", serif;
}
#body {
  display: flex;
  border-radius: 15px;
}
.header{
  width: 150px;
}
.card-item{
  background-image: linear-gradient(
      45deg,
      hsl(166deg 100% 45%) 0%,
      hsl(172deg 100% 43%) 20%,
      hsl(179deg 100% 41%) 34%,
      hsl(186deg 100% 43%) 46%,
      hsl(191deg 100% 45%) 56%,
      hsl(196deg 100% 46%) 65%,
      hsl(200deg 100% 46%) 73%,
      hsl(204deg 100% 45%) 82%,
      hsl(207deg 100% 44%) 90%,
      hsl(210deg 98% 41%) 100%
  );

}
.title{
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: larger;
}
.cary-body{
  width: 90%;
  height: 40px;
  overflow: hidden;
  font-size: small;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
