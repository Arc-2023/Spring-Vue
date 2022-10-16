<template>
<div id="app">
  <div class="card-container">

<!--    <div class="card" v-for="(item) in notelist" :key="item"><NoteCard :data="item"></NoteCard></div>-->
    <el-scrollbar
    native=false>
      <el-table
          ref="tab"
          style="
        border-radius: 15px;
        overflow:hidden;
        width: 100%"
          :data="notelist"
          :stripe=false
          :highlight-current-row=true>
        <el-table-column
          type="selection"></el-table-column>
        <el-table-column
            type="index">
          <template #header>
            <div style="justify-content: center">
              <el-button
                type="success"
                circle><el-icon><Plus /></el-icon></el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
            label="title"
            prop="title"></el-table-column>
        <el-table-column
            label="data"
            prop="data"></el-table-column>
        <el-table-column
            align="right"
        >
          <template #header>
            <div class="header-right">
              <el-input
                  style="
                  margin-right: 10px;
                  max-width: 200px"
                  v-model="search"
                  placeholder="Type in to Search"></el-input>
              <el-button
                  style="right: 0"
                  type="danger"
                  circle
                  icon="delete"></el-button>
            </div>
          </template>
          <template #default="scope">
            <div class="tools">
              <el-button
                  @click="goto(scope.row.id)"
                type="primary"
                circle
                icon="search"></el-button>
              <el-button
                type="danger"
                circle
                @click="handledelete(scope.row.id)"
                icon="delete"></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </div>
</div>
</template>

<script>
import NoteCard from "@/components/NoteCard";
import {UserStore} from "@/store/user";
import {notestore} from "@/store/note";
import Router from "@/router";
import {ref} from "vue";
import {ElMessageBox} from "element-plus";

export default {
  name: "OnlineNotesHome",
  setup(){
    const userstore = UserStore()
    const note = notestore()
    const tab = ref('')
    return{
      userstore,
      note,
      tab
    }
  },
  data(){
    return{
      notelist:[
      ],
      search:''

    }
  },
  methods:{
    async getAllnotes(){
      const username = this.userstore.getUsername
      this.note.getallnotes(username).then(res=>{
        this.notelist = res.data.data.tabledata
      })
    },
    goto(id){
      Router.push(`/onlinenotes/${id}`)
    },
    handledelete(id){
      ElMessageBox.confirm(
          'Delete the item?',
          'Confirm',
      {
        distinguishCancelAndClose: true,
            confirmButtonText: 'Delete',
          cancelButtonText: 'Calcel',
      }).then(()=>{
        this.note.delitem(id)
      })
    }
  },
  mounted() {
    this.getAllnotes()
  }
}
</script>

<style scoped>
.card-container{
  flex-basis: 140px;
}

</style>
