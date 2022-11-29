<template>
<div class="bodyy">
  <el-container class="main-container"
  direction="horizontal">
    <el-aside
    width="300px" class="aside">
        <div class="card"
        :coll="asidebar.isCollapse">
          <div class="avatar-box">
            <div class="avatar">
              <el-avatar
                  src="{{userdata.avatar}}"
                  class="avatar-image"
                  fit="cover">
              </el-avatar>
          </div>
          </div>
          <el-divider v-if="!asidebar.isCollapse" direction="vertical"
                      class="divider"/>
          <div v-if="!asidebar.isCollapse" class="right-box">

            <div class="profile">
              <span>{{ userdata.username}}</span>
              <el-divider class="divider-horizon"></el-divider>
              <div class="data">
                <div class="bottom">
                  <ul class="rights">
                    <li><span>{{ userdata.role }}</span></li>
                  </ul></div>
              </div>
            </div>
          </div>
        </div>
      <el-scrollbar class="el-scrollbar">
        <div class="items">
          <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical"
              default-active="2"
              text-color="#fff"
              :collapse="asidebar.isCollapse"
              menu-trigger="hover"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><Avatar /></el-icon>
                <span>个人</span>
              </template>
              <el-menu-item class="el-menu-item" index="1-1">
                <div class="sub-menu-item-content">
                  <span>个人信息</span>
                </div>
              </el-menu-item>
              <el-menu-item class="el-menu-item" index="1-2">
                <div class="sub-menu-item-content">
                  <span>系统管理</span>
                </div>
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><School /></el-icon>
                <span>学校工具</span>
              </template>
              <el-menu-item class="el-menu-item" index="2-1">
                <span>课表</span>
              </el-menu-item>
              <el-menu-item class="el-menu-item" index="2-2">
                <span>绩点工具</span>
              </el-menu-item>

            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><Menu /></el-icon>
                <span>事务</span></template>
              <router-link to="/thingmanage">
                <el-menu-item class="el-menu-item" index="3-1">
                  <span>事务管理</span>
                </el-menu-item>
              </router-link>
              <RouterLink to="/thingpush">
                <el-menu-item class="el-menu-item" index="3-2">
                  <span>事务推送</span>
                </el-menu-item>
              </RouterLink>

            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <el-icon><Memo /></el-icon>
                <span>在线笔记</span>
              </template>
              <el-menu-item index="4-1"><span>转录设置</span></el-menu-item>
              <router-link to="/onlinenotes">
                <el-menu-item index="4-2"><span>转录笔记</span></el-menu-item>
              </router-link>
            </el-sub-menu>
            <el-sub-menu index="5">
              <template #title>
                <el-icon><VideoPlay /></el-icon>
                <span>视频服务</span>
              </template>
              <el-menu-item index="5-1">
                <span>视频站</span>
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="6">
              <template #title>
                <el-icon><Folder /></el-icon>
                <span>文件服务</span>
              </template>
              <router-link to="/alist">
                <el-menu-item index="6-1">
                  <span>Alist</span>
                </el-menu-item>
              </router-link>
            </el-sub-menu>

          </el-menu>
        </div>
      </el-scrollbar>

      <div class="aside-bottom">
        <el-button type="primary" circle size="small" @click="toLogin"><el-icon><Close/></el-icon></el-button>
        <el-button v-if="!asidebar.isCollapse" type="primary" circle size="small"><el-icon><More/></el-icon></el-button>
        <el-button type="primary" circle size="small" @click="toggleAsideBar"><el-icon><Expand /></el-icon></el-button>
      </div>
    </el-aside>
    <div class="container1">
      <el-container class="main-container">
        <el-main class="el-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </el-container>
</div>
</template>
<script>
import {UserStore} from "@/store/user";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "homepage",
  setup(){
    const userstore = UserStore()
    return{
      userstore
    }
  },
  components:{},
  data(){
    return{
      userdata:{
        avatar:this.userstore.getAvatar,
        username:this.userstore.getUsername,
        userdata:this.userstore.getUserdata,
        role:this.userstore.getRole
      },
      asidebar:{
        isCollapse:true
      },
      props:{

      }
    }
  },
  methods:{
    toggleAsideBar(){
      this.asidebar.isCollapse=!this.asidebar.isCollapse
    },
    toLogin(){
      this.$router.push('/login')
    }
  },
  watch:{},
  computed:{}
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.bodyy{
  display: flex;
  justify-items: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #42b983;
  padding: 1vh 0vh;
}

.aside{
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: auto;
  margin: 5px;
  padding: 10px;
  background:gray;
  overflow:hidden;
  border-radius: 15px;
}
.card{
  display: flex;
  height: 70px;
  width: 100%;
  background: #42b983;
  border-radius: 10px;
  overflow: hidden;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 0 10px;
}
.avatar-box{
  display: flex;
  justify-content: center;
}
.right-box{
  display: flex;
  overflow: hidden;
}
.divider{
  height: 50px;
}
.profile{
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.divider-horizon{
  width: 90px;
  height: 1px;
  margin: 0;
}
.profile span{
  margin: 5px 0;
  font-family: "Arial Black",serif;
  font-size: 2px;
}
.data{
  display: flex;
  width: 100%;
  justify-content: left;
  font-size: 1px;
}
.bottom{
  display: flex;
  flex-direction: column;
}
.rights{
  display: flex;
  justify-content: left;
}
.el-menu-vertical{
  margin: 10px 0;
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
}
.container1{
  width: 100%;
  height: 100%;
  margin: 5px;
  border-radius: 15px;
  overflow: hidden;
  background: aquamarine;
}
.rights ul{
  list-style: none;
}
.rights li{
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  height:20px;
  list-style: none;
  background: gray;
  border-radius: 15px;
  overflow: hidden;
  transform: scale(50%);
  padding: 1px;
}
.bottom{
  display: flex;
  justify-content: left;
  align-items: center;
}
.aside-bottom{
  display: flex;
  position: absolute;
  bottom: 0;
  width: auto;
  justify-content: space-between;
  transform: translateY(-10px);
  right: 10px;
  left: 10px;
}
.el-menu-item{
  border: none;
  border-radius: 15px;
  overflow: hidden;
  display: flex;

}
.main-container{
  display: flex;
  align-content: center;
  justify-content: center;
  height: 100%;
}
.el-scrollbar{
  max-height: 80%;
}
.el-main{
  height: 100%;
  align-content: center;
}
</style>
