<template>
  <div id="body">
    <el-scrollbar
        class="el-scrollbar">
    <el-table
        class="el-table"
        ref="table"
      :data="filtedData"
        stripe=true
      height="100%">
      <el-table-column
        type="selection"/>
      <el-table-column
        type="expand"
      style="transition: 0.9s">
        <template #header>
          <el-button type="success"
                     icon="plus"
                     @click="handleAdd"
                     circle
                     style="justify-items: center"></el-button>
        </template>
        <template #default="scope">
          <div class="expand-card-container">
            <el-card
                class="el-card"
                shadow="hover"
            >
              <div><span>message</span></div>
              <el-divider type="vertical"/>
              <div><span>{{scope.row.message}}</span></div>
            </el-card>
            <el-card
              class="el-card"
              shadow="hover"
            >
              <div><span>type</span></div>
              <el-divider type="vertical"/>
              <div><span>{{scope.row.type}}</span></div>
            </el-card>
            <el-card
              class="el-card"
              shadow="hover"
            >
              <div><span>tag</span></div>
              <el-divider type="vertical"/>
              <div><span>{{scope.row.tag}}</span></div>
            </el-card>
            <el-card
              class="el-card"
              shadow="hover"
            >
              <div><span>creater</span></div>
              <el-divider type="vertical"/>
              <div><span>{{scope.row.creater}}</span></div>
            </el-card>
            <el-card
              class="el-card"
              shadow="hover"
            >
              <div><span>startTime</span></div>
              <el-divider type="vertical"/>
              <div><span>{{scope.row.startTime}}</span></div>
            </el-card>

          </div>
        </template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="Name"
      />
      <el-table-column
        prop="status"
        label="Status">
        <template #default="scope">
          <div v-if="scope.row.status==='Running'" class="status running">
            <el-button type="success"
                       size="small"
                       round
                       ><span>Running</span></el-button>
          </div>
          <div v-if="scope.row.status==='Expired'" class="status expired">
            <el-button type="info"
                       size="small"
                       round
                       ><span>Expired</span></el-button>
          </div>
          <div v-if="scope.row.status==='Pause'" class="status stopped">
            <el-button type="danger"
                       size="small"
                       round
                       ><span>Pause</span></el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="endTime"></el-table-column>
      <el-table-column align="right"
                        min-width="130px">
        <template #header>
          <div class="column-header">
            <el-input
                placeholder="Type in to search"
                v-model="sch"
                class="search"
            ></el-input>
            <el-button type="danger"
                       circle
                       icon="Delete"
                        @click="deleteSelectedItem"/>
            <el-button type="success"
                       icon="refresh"
                       @click="refresh"
                        circle></el-button>

          </div>
        </template>
        <template #default="scope">
          <el-button type="primary"
                     circle
                     @click="toggleEditBox(scope.row)"
                      icon="edit"></el-button>
          <el-button type="danger"
                     circle
                     @click="this.handleDeleteRow(scope.row)"
                     icon="Delete">
          </el-button>
          <el-button type="primary"
                     @click="startitem(scope.row)"
                     circle><el-icon><VideoPlay /></el-icon></el-button>
          <el-button type="danger"
                     @click="pauseitem(scope.row)"
                     circle><el-icon><VideoPause /></el-icon></el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-scrollbar>
    <el-dialog
        v-model="isEditBoxOpen"
        title="Enter Your Basic Info"
        style="
        display: flex;
        flex-direction: column;
        max-width: 1000px;
        align-content: center;
        align-items: center;
        align-self: center;
        padding: 15px;
        overflow: hidden;
        border-radius: 15px">
      <el-form :model="tmp"
               label-position="right"
      label-width="100px">

        <el-form-item label="name">
          <el-input v-model="tmp.name">
          </el-input>
        </el-form-item>
        <el-form-item label="TimePicker"
        style="
        display: flex;
        justify-content: space-between;
        flex: 1  ">
          <el-date-picker
              v-model="tmp.startTime"
              type="datetime"
              range
              value-format="YYYY-MM-DD HH:mm:ss"
              style="flex: 1"
          ></el-date-picker>
          <el-date-picker
              style="flex: 1"
              v-model="tmp.endTime"
              type="datetime"
              range
              value-format="YYYY-MM-DD HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="message">
          <el-input v-model="tmp.message"/>
        </el-form-item>
        <el-form-item label="tag">
          <el-input v-model="tmp.tag"/>
        </el-form-item>
        <el-form-item label="type">
          <el-input v-model="tmp.type"/>
        </el-form-item>
      </el-form>
      <el-button type="primary"
                 @click="this.isChangeMode==true ? changeTableItem(tmp.id) : addItem()">{{this.isChangeMode ? "Change" : "Add"}}</el-button>
    </el-dialog>>
  </div>
</template>

<script>
import {computed, ref} from "vue";
import {ElMessage} from "element-plus";
import {pagestore} from "@/store/page";
import {UserStore} from "@/store/user";
export default {
  name: "ThingManagement",
  setup(){
    const sch = ref('')
    const table = ref('')
    const pagest = pagestore()
    const userstore = UserStore()
    const sortTime = (a,b)=> {
      return Date.parse(a) < Date.parse(b) ? 1 : 0;
    }
    return {
      sch,
      table,
      pagest,
      userstore,
      sortTime
    }
  },
  data(){
    return{
      tableD:[],
      // eslint-disable-next-line vue/return-in-computed-property
      filtedData:computed(()=>{
        //this.tableD.forEach((item)=>{
        //  item.start = useDateFormat(item.start,'YYYY-MM-DD HH:mm:ss')
        //  item.end = useDateFormat(item.end,'YYYY-MM-DD HH:mm:ss')
        //})
        return this.tableD.filter((data)=>{
          return !this.sch || data.name.includes(this.sch)
        })
      }),
      isEditBoxOpen:false,
      tmp:
          {
          id:' ',
          name:' ',
          startTime:Date,
          endTime:Date,
          message:' ',
          type:' ',
          creater:' ',
          tag: ' ',
      },
      isChangeMode:false,

    }
  },
  watch:{
  },
  methods:{
    toggleEditBox(row){
      this.isChangeMode=true
      this.isEditBoxOpen= (this.isEditBoxOpen==false)
      this.tmp.id = row.id
      this.tmp.name = row.name
      this.tmp.startTime = row.startTime
      this.tmp.endTime = row.endTime
      this.tmp.message = row.message
      this.tmp.type = row.type
      this.tmp.tag = row.tag
      this.tmp.creater = row.creater
    },
    handleDeleteRow(row){
      this.tableD.forEach((item,index)=>{
        if(item.id==row.id){
          this.pagest.delitem(item.id).then(()=>{
            ElMessage({
              message:'successfully del',
              type:'success'
            })
            this.tableD.splice(index,1)
          }).catch(e=>{
            ElMessage({
              message:'faild to del',
              type:'error'
            })
          })

        }
      })
    },
    changeTableItem(id){
      this.tableD.forEach((item)=>{
        if(item.id==id){
          this.pagest.changeItem(this.tmp)
              .then(()=>{
                item.startTime=this.tmp.startTime
                item.endTime=this.tmp.endTime
                item.name=this.tmp.name
                item.message=this.tmp.message
                item.type=this.tmp.type
                item.tag=this.tmp.tag
                item.creater=this.tmp.creater
                this.isChangeMode=false
                this.isEditBoxOpen= false
                this.tmp.id = ''
                this.tmp.name = ''
                this.tmp.startTime = ''
                this.tmp.endTime = ''
                this.tmp.tag=''
                this.tmp.creater=''
                this.tmp.message=''
                this.tmp.type=''
              })
        }
      })
    },
    deleteSelectedItem(){
      this.$refs.table.getSelectionRows().forEach((selecteditem)=>{
        this.tableD.forEach((tableitem,index)=>{
          if(tableitem.id==selecteditem.id){
            this.pagest.delitem(tableitem.id).then(()=>{
              ElMessage({
                message:`Successfully delete ${this.$refs.table.getSelectionRows().length} items`,
                type:'success'
              })
              this.tableD.splice(index,1)
            })
          }
        })
      })
    },
    handleAdd(){
      this.isChangeMode = false
      this.isEditBoxOpen= (this.isEditBoxOpen==false)
      //this.tmp.id = ''
      //this.tmp.name = ''
      //this.tmp.startTime = ''
      //this.tmp.endTime = ''
      //this.tmp.tag=''
      //this.tmp.creater=''
      //this.tmp.message=''
      //this.tmp.type=''
    },
    addItem(){
      this.pagest.addItem(this.tmp).then(()=>{
        this.tableD.push(this.tmp)
        this.isEditBoxOpen=false
        this.tmp.id = ''
        this.tmp.name = ''
        this.tmp.startTime = ''
        this.tmp.endTime = ''
        this.tmp.tag=''
        this.tmp.creater=''
        this.tmp.message=''
        this.tmp.type=''
      })
    },
    refresh(){
      this.tableD.splice(0,this.tableD.length)
      this.pagest.refresh().then(res=>{
        console.log(res)
        res.forEach(item=>{
          this.tableD.push(item);
        })
      })
    },
    startitem(row){
      this.pagest.startitem(row.id).then(()=>{
        this.tableD.forEach(item=>{
          if(item.id==row.id){
            item.status = 'Running'
          }
        })
      })
    },
    pauseitem(row){
      this.pagest.pauseitem(row.id).then(()=>{
        this.tableD.forEach((item)=>{
          if(item.id==row.id){
            item.status='Pause'
          }
        })
      })
    },

  },
  computed:{
  },
  mounted() {
    this.pagest.initStart().then(res=>{
      this.refresh(this.userstore.getUsername)
    })
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding:0;
}
#body{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  border-radius: 15px;
}
.expand-card-container{
  padding:20px;
  display: flex;
  justify-content: space-between;
}
.el-table{
  justify-content: center;
  justify-items: center;
}

.el-card{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 15%;
  align-content: center;
  justify-items: center;
  align-items: center;
  background-image: linear-gradient(
      320deg,
      hsl(240deg 100% 20%) 0%,
      hsl(237deg 100% 21%) 5%,
      hsl(234deg 100% 22%) 10%,
      hsl(232deg 100% 23%) 14%,
      hsl(229deg 100% 24%) 19%,
      hsl(226deg 100% 26%) 24%,
      hsl(223deg 99% 27%) 29%,
      hsl(220deg 99% 28%) 33%,
      hsl(217deg 99% 29%) 38%,
      hsl(215deg 99% 30%) 43%,
      hsl(212deg 99% 31%) 48%,
      hsl(209deg 99% 32%) 52%,
      hsl(206deg 99% 33%) 57%,
      hsl(203deg 99% 35%) 62%,
      hsl(201deg 99% 36%) 67%,
      hsl(198deg 99% 37%) 71%,
      hsl(195deg 99% 38%) 76%,
      hsl(192deg 99% 39%) 81%,
      hsl(189deg 98% 40%) 86%,
      hsl(186deg 98% 41%) 90%,
      hsl(184deg 98% 42%) 95%,
      hsl(181deg 98% 44%) 100%
  );
  -webkit-text-fill-color: antiquewhite;
  font-family: "Cascadia Code";
  border-radius: 15px;
  overflow: hidden;

}

.el-card div{
  display: flex;
  justify-content: center;
}
.column-header{
  display: flex;
  align-content: center;
  justify-content: space-around;
}
.search{
  margin: 0 10px;
}
.el-scrollbar{
  width: 100%;
}
</style>
