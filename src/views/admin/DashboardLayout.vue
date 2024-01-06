<template>
  <div class="wrapper scroll">
    <side-bar>
      <!-- <mobile-menu slot="content"></mobile-menu> -->
      <sidebar-link to="/dashboard">
        <i class="fa fa-tachometer"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/data-suara">
        <i class="fa fa-archive"></i>
        <p>Data Suara</p>
      </sidebar-link>
      <sidebar-link to="/data-caleg">
        <i class="fa fa-users"></i>
        <p>Data Caleg</p>
      </sidebar-link>
      <sidebar-link to="/data-wilayah">
        <i class="fa fa-street-view"></i>
        <p>Data TPS</p>
      </sidebar-link>
      <sidebar-link to="/all-account" v-if="dataRole === 'Admin'">
        <i class="fa fa-user"></i>
        <p>Akun</p>
      </sidebar-link>
      <!-- <sidebar-link to="/setting">
        <i class="fa fa-cogs"></i>
        <p>Setting</p>
      </sidebar-link> -->

      <!-- <template slot="bottom-links">
        <sidebar-link class="active"
                      to="/admin/upgrade">
          <i class="nc-icon nc-alien-33"></i>
          <p>Upgrade to PRO</p>
        </sidebar-link>
      </template> -->
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  import Api from '@/helpers/api';
  import akun from '@/services/akun.service';

  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    data () {
      return {
        dataRole: '',
      }
    },
    mounted(){
      this.getProfile();
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      },
      getProfile(){
        let context = this;     
        context.onLoading = true;          
        Api(context, akun.indexProfile()).onSuccess(function(response) {
            context.dataRole = response.data.data[0].role;
        }).onError(function(error) {  
        })
        .call() 
      },
    }
  }

</script>
<style lang='scss' scoped>
  @import "@/assets/scss/light-bootstrap-dashboard.scss";
</style>
