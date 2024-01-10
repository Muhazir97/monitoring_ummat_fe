<template>
    <section class="section section-lg my-0" style="background-image: url('img/brand/bg.jpg'); background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),">
        <div class="shape shape-style-1 bg-gradient-green ">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="gapPPAnggota"></div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card style="background: linear-gradient(to right, #DAA520, #696969)" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-lg-0">
                        <template>
                            <div class="text-muted text-center mb-5">
                                <img src="img/brand/logo_umat.png" height="100" width="100" class="mr-2" style="margin-top: -100px;" shadow>
                            </div>
                        </template>
                        <template>
                            <form role="form">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Username"
                                            v-model="username"
                                            v-on:keyup.enter="login()"
                                            addon-left-icon="ni ni-single-02">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            placeholder="Password"
                                            v-model="password"
                                            v-on:keyup.enter="login()"
                                            id="password"
                                            addon-left-icon="ni ni-lock-circle-open"
                                            addon-right-icon="fa fa-eye-slash">
                                </base-input>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="login()" :disabled="onLoading">
                                        <span v-if="onLoading"><i class="fa fa-spinner fa-spin"></i> Please Wait...</span>
                                        <span v-else>
                                            <span>Login</span>
                                        </span>
                                    </base-button>
                                </div>
                            </form>
                            <div class="text-center text-muted mb-4">
                                <!-- <small><router-link :to="'/register'" class="nav-link nav-link-icon text-white" rel="noopener" data-toggle="tooltip" title="Daftar">Belum punya akun ? Daftar di sini</router-link></small> -->
                            </div>
                        </template>
                    </card>
                </div>
            </div>
        </div>

        <!-- MODAL FILTER -->
        <div>
           <modal :show.sync="modalWidget.show">
             <div>
              <section class="section section-lg pt-lg-0">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-12">
                                <div class="row row-grid">
                                    <div class="col-lg-12 mb-4 mt-4 text-center">
                                        <card class="border-0" hover shadow body-classes="py-5">
                                            <img src="img/brand/kota serang.jpg" height="100" width="100" class="mr-2 mb-3"  shadow>
                                            <h6 class="text-primary text-uppercase">Kota Serang</h6>
                                            <base-button tag="a" @click="modalWidget.show = false" type="primary" class="mt-4 text-center text-white" size="sm">
                                                PILIH <i class="fa fa-arrow-right mr-5" aria-hidden="true"></i>
                                            </base-button>
                                        </card>
                                    </div>
                                    <div class="col-lg-12 mb-4 text-center">
                                        <card class="border-0" hover shadow body-classes="py-5">
                                            <img src="img/brand/kab serang.png" height="100" width="100" class="mr-2 mb-3"  shadow>
                                            <h6 class="text-success text-uppercase">Kabupaten Serang</h6>
                                            <base-button tag="a" href="https://kabserangfe.monitoringummat.id/" type="success" class="mt-4 text-center" size="sm">
                                                PILIH <i class="fa fa-arrow-right mr-5" aria-hidden="true"></i>
                                            </base-button>
                                        </card>
                                    </div>
                                    <div class="col-lg-12 mb-4 text-center">
                                        <card class="border-0" hover shadow body-classes="py-5">
                                            <img src="img/brand/kota cilegon.png" height="100" width="100" class="mr-2 mb-3"  shadow>
                                            <h6 class="text-warning text-uppercase">Kota Cilegon</h6>
                                            <base-button tag="a" href="https://kotacilegonfe.monitoringummat.id/" type="warning" class="mt-4 text-center" size="sm">
                                                PILIH <i class="fa fa-arrow-right mr-5" aria-hidden="true"></i>
                                            </base-button>
                                        </card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

             </div>
           </modal>
        </div>

    </section>
</template>
<script>
// import Card from '@/components/Cards/Card.vue'
import config from '@/configs/config';
import Modal from '@/components/Modal.vue'
import axios from 'axios';
import bus from '@/eventBus';
import Api from '@/helpers/api';
import akun from '@/services/akun.service';

export default {
    components: {
      // Card,
      Modal
    },
    data() {
    return {
      username: '',
      password: '',
      onLoading: false,
      modalWidget: {
        add: true,
        title: "Filter",
        show: false
      },
    };
  },
  mounted(){
    // jika kota serang
    // this.modalWidget.show = true;
    // selain kota serang
    this.modalWidget.show = false;
  },
  methods: {
    login() {             
      if (this.username && this.password) {
        var formData = new FormData()
        formData.append('username',  this.username)
        formData.append('password', this.password)

        axios.post(config.apiUrl +"auth/login", formData)
        .then(response => {
          localStorage.setItem('token', response.data.access_token)                                        
          localStorage.setItem('authenticated', true) 

            // ======== untuk menentukan admin ============
            let context = this;     
            context.onLoading = true;          
            Api(context, akun.indexProfile()).onSuccess(function(response) {
                var dataRole = response.data.data[0];
                context.notifyVue('Selamat anda berhasil login '+dataRole.nama_lengkap, 'top', 'right', 'info')
                // if (dataRole.role == 'Admin') {
                    context.$router.push('/dashboard')
                // }else{
                //     context.$router.push('/profile')
                // }
            }).onError(function(error) {  
            })
            .call() 
            // ==============================================                                      
            context.onLoading = true;
          this.reloadUser();
        })
        .catch(err => {
         this.notifyVue('Username atau Password Salah', 'top', 'right', 'danger')
        })
      } else {
        this.notifyVue('Error Username Password Required', 'top', 'right', 'danger')
      }
    },
    reloadUser(){
        bus.$emit('RELOAD_USER')
    },
    notifyVue(message, verticalAlign, horizontalAlign, type) {
        const color = Math.floor((Math.random() * 4) + 1)
        this.$notifications.notify(
        {
            message: message,
            icon: 'nc-icon nc-notification-70',
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: type
        })
    }
  }
};
</script>
<style type="text/css" scoped>

/*untuk layar device berukuran kecil*/
@media screen and (min-width: 360px) {
    .gapPPAnggota {
        margin-top: 10px
    }
}

/*untuk layar device berukuran sedang*/
@media screen and (min-width: 550px) {
    .gapPPAnggota {
        margin-top: 10px
    }
}

/*untuk layar device berukuran besar*/
@media screen and (min-width: 800px) {
    .gapPPAnggota {
        margin-top: 10px
    }
}
</style>
