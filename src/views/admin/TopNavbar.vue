<template>
  <nav class="navbar navbar-expand-lg">
    <div>
      <!-- MODAL MENU -->
      <modal :show.sync="modalMenu.show">
       <template slot="header">
          <img src="img/brand/logo_umat.png" width="13%">
       </template>
       <div>
          <div style="margin-bottom: 20px">
            <router-link  to="/dashboard" @click.native="modalMenu.show = false">
              <i class="nc-icon nc-chart-pie-35 text-dark"></i> <span class="text-dark"> Dashboard </span>
            </router-link><br>
          </div>
          <div style="margin-bottom: 20px">
            <router-link  to="/data-suara" @click.native="modalMenu.show = false">
              <i class="fa fa-archive text-dark"></i> <span class="text-dark"> Data Suara </span>
            </router-link><br>
          </div>
          <div style="margin-bottom: 20px">
            <router-link  to="/data-caleg" @click.native="modalMenu.show = false">
              <i class="fa fa-users text-dark"></i> <span class="text-dark"> Data Caleg</span>
            </router-link><br>
          </div>
          <div style="margin-bottom: 20px">
            <router-link  to="/data-wilayah" @click.native="modalMenu.show = false">
              <i class="fa fa-street-view text-dark"></i> <span class="text-dark"> Data TPS</span>
            </router-link><br>
          </div>
          <div style="margin-bottom: 20px" v-if="dataRole == 'Admin'">
            <router-link  to="/all-account" @click.native="modalMenu.show = false">
              <i class="nc-icon nc-single-02 text-dark"></i> <span class="text-dark"> Akun</span>
            </router-link><br>
          </div>
          <div style="margin-bottom: 20px">
            <router-link  to="#" @click.native="modalMenu.show = false, logout()">
              <i class="fa fa-sign-out text-dark"></i> <span class="text-dark"> Logout</span>
            </router-link><br>
          </div>
       </div>
     </modal>
    </div>

    <div class="container-fluid">
      <a class="navbar-brand" href="#"></a>
      <button type="button"
              class="navbar-toggler navbar-toggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <!-- <div class="collapse navbar-collapse justify-content-end">
        <ul class="nav navbar-nav mr-auto"> -->
          <!-- <li class="nav-item">
            <a class="nav-link" href="#" data-toggle="dropdown">
              <i class="nc-icon nc-palette"></i>
            </a>
          </li> -->
          <!-- <base-dropdown tag="li">
            <template slot="title">
              <i class="fa fa-server text-dark mr-2" style="cursor: pointer;"></i>
              <span style="cursor: pointer;">Level</span>
            </template>
            <a class="dropdown-item" href="#">Pusat</a>
            <a class="dropdown-item" href="#">Provinsi</a>
            <a class="dropdown-item" href="#">Kota / Kabupaten</a>
          </base-dropdown>
        </ul> -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" @click="logout()" class="nav-link">
              Log out
            </a>
          </li>
        </ul>
        
      </div>
    </div>
  </nav>
</template>
<script>
  import Modal from '@/components/Modal.vue'
  import Api from '@/helpers/api';
  import akun from '@/services/akun.service';

  export default {
    components: {
      Modal
    },
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      }
    },
    data () {
      return {
        activeNotifications: false,
        modalMenu: {
            show: false,
        },
        dataRole: '',
      }
    },
    mounted(){
      this.getProfile();
    },
    methods: {
      getProfile(){
        let context = this;     
        context.onLoading = true;          
        Api(context, akun.indexProfile()).onSuccess(function(response) {
            context.dataRole = response.data.data[0].role;
        }).onError(function(error) {  
        })
        .call() 
      },
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.modalMenu.show = true;
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      },
      logout(){
        localStorage.removeItem('token');
        localStorage.setItem('authenticated', false)  
        this.$router.push('/login')
      }
    }
  }

</script>
<style lang='scss' scoped>
  @import "@/assets/scss/light-bootstrap-dashboard.scss";
</style>
