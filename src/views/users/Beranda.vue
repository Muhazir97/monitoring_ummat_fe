<template>
    <div>

        <div class="position-relative">
            <!-- shape Hero -->
            <section class="section-shaped my-0">
                <div class="shape-container container mt-12 d-flex">
                    <div class="col px-0">                                       
                        <b-carousel id="carousel2" controls indicators class="carousel2">
                            <!-- Text slides with image -->
                            <b-carousel-slide v-for="(row, i) in tableBanner.data" :key="i" :img-src="loadAvatarBanner(row.banner)"></b-carousel-slide>
                        </b-carousel>
                    </div>
                </div>
            </section>
            <!-- 1st Hero Variation -->
        </div>

        <!-- ============ CARD PRODUCT ============== -->
        <section class="section section-lg pt-lg-0 mt-5">
            <div class="container">
                <div class="mb-1">
                    <div class="row">
                        <div class="pl-4 col-7">
                            <h4 class="display-6 font-weight-bold">List Kegiatan</h4>
                        </div>
                        <div class="float-right col-4">
                            <base-input alternative
                                        shadow
                                        style="border: 20px"
                                        class="mb-3"
                                        v-model="search"
                                        v-on:keyup="filter"
                                        placeholder="Search"
                                        addon-left-icon="fa fa-search">
                            </base-input>
                        </div>
                    </div>
                </div><hr>
                <div class="container" v-if="table.data.length == 0">
                    <div class="row justify-content-center">
                        <p class="display-4">Maaf Kegiatan Belum Tersedia</p>
                    </div>
                    <div class="row justify-content-center">
                        <img src="img/theme/empty_etalase.png" width="50%">
                    </div>
                </div>
                <div class="row justify-content-center" v-else>
                    <div class="col-lg-12">
                        <!-- <div class="row row-grid">
                            <div class="col-sm-3 col-6 mt-4 mt-sm-0 mb-lg-4" v-for="(row, i) in table.data" :key="i">
                                <div class="card shadow-lg--hover card-lift--hover shadow" >
                                  <router-link :to="'/detail-barang/'+row.id"><img :src="loadAvatar(row.image)" class="card-img-top"></router-link>
                                  <div class="card-body">
                                    <router-link :to="'/register'"><label class="badge badge-success" style="margin-bottom: 5px; cursor: pointer;"><small><i class="ni ni-shop text-dark mr-1"></i>{{row.toko}}</small></label><br></router-link>
                                    <router-link :to="'/detail-barang/'+row.id"><h6 class="card-title bold">{{ row.nama_barang }}</h6></router-link>
                                    <div class="mb-3">
                                        <div v-if="!row.diskon == 0">
                                            <label class="badge badge-danger" style="margin-bottom: -1px;">- {{row.diskon}} %</label><br>
                                            <small class="text-sm-center text-gray"><s>{{convertRp(row.harga)}}</s></small><br>
                                        </div>
                                        <div v-else>
                                            <p style="margin-top: 70px;"></p>
                                        </div>
                                        <b class="text-danger display-5 font-weight-bold" v-if="!row.diskon == 0">{{convertRp(row.harga_diskon)}}</b>
                                        <b class="text-danger display-5 font-weight-bold" v-else>{{convertRp(row.harga)}}</b>
                                        <small class="text-gray"> / {{row.satuan}}</small><br>
                                        <small style="margin-top: 200px;">min. {{row.min_pembelian}} {{row.satuan}}</small>
                                    </div>
                                    <base-button type="primary" class="btn btn-sm float-right" @click="beli(row.id)" v-if="row.stock != 0" :disabled="btnSync[row.id]">
                                        <span v-if="btnSync[row.id]"><i class="fa fa-spinner fa-spin"></i> Please Wait...</span>
                                        <span v-else>
                                            <span class="px-4">+ Beli</span>
                                        </span>
                                    </base-button>
                                    <button class="btn btn-secondary btn-sm float-right" v-else>Stock Habis</button>
                                  </div>
                                </div>
                            </div>
                        </div> -->

                          <!-- CONTENT -->
                        <div >
                          <div v-for="(row, index) in table.data" :key="index">
                            <div class="card shadow-lg--hover card-lift--hover shadow mb-3">
                                <div class="card-body">
                                  <div class="row">
                                    <div class="col-lg-7 col-sm-6">
                                      <router-link :to="'/detail-blog/'+row.id">
                                        <h5><b>{{ row.judul_kegiatan }}</b></h5>
                                      </router-link>
                                      <h6 style="color: gray" v-html="row.deskripsi_kegiatan.substring(0,100)+'...'"></h6>
                                      <p style="margin-top: 50px;">By {{ row.created_by +', '+ moment(row.created_at).locale('id').format('LL') }}</p>
                                    </div>
                                    <div class="col-lg-5 col-sm-6">
                                      <div class="">
                                        <router-link :to="'/detail-blog/'+row.id"><img :src="storageUrl+'foto_kegiatan/'+row.foto" class="rounded img-fluid" /></router-link>
                                      </div>
                                    </div>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>

        <!-- ======================== ABOUT ======================= -->
      <!--   <section class="section section-shaped my-0 overflow-hidden" >
            <div class="shape shape-style-3 bg-gradient-default shape-skew">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="container pb-150">
                <div class="row text-center justify-content-center">
                    <div class="col-lg-10">
                        <h2 class="display-3 text-white">Sayuribuani.com</h2>
                        <p class="lead text-white">Sayuribuani.com adalah sebuah website dari toko sayur yang sekarang terletak di kota Serang Banten yang menjual berbagai macam Sayur Mayur, Ikan, Sembako dll. <br> Di website ini anda bisa bertransaksi secara online dengan toko kami</p>
                    </div>
                </div>
            </div>
        </section> -->

    </div>
</template>

<script>
    import { BCarousel } from "bootstrap-vue/esm/components/carousel/carousel";
    import { BCarouselSlide } from "bootstrap-vue/esm/components/carousel/carousel-slide";
    import Api from '@/helpers/api';
    import config from '@/configs/config';
    import barang from '@/services/barang.service';
    import bus from '@/eventBus';
    import axios from 'axios';
    import setting from '@/services/setting.service';
    var moment = require('moment');

export default {
  name: "home",
  components: {
    BCarousel,
    BCarouselSlide
  },
  data() {
        return {
            btnSync: [],
            table: {
              data: []
            },
            tableBanner: {
              data: []
            },
            search: '',
            moment:moment,
            storageUrl : config.storageUrl,
        };
    },
    mounted(){
      this.get();
      this.getBanner();
    },
    created () {
        var context = this;
        bus.$on('RELOAD_GET_BARANG', function () {
          context.get();
        });
    },
    methods: {
        get(){
            let params = {level: localStorage.getItem('level'), area: localStorage.getItem('area'), search: this.search}
            
            axios.get(config.apiUrl +"barang/barang-by-area", {params}).then(response => {
                this.table.data    = response.data.data.data.data
            })
            .catch(err => {
                if (err.response.status == 404) {
                    this.table.data = [];
                }
            })
        },
        getBanner(param){
            let context = this;               
            Api(context, setting.indexBanner({search: this.search})).onSuccess(function(response) {    
                context.tableBanner.data = response.data.data.data;
            }).onError(function(error) {                    
                if (error.response.status == 404) {
                    context.tableBanner.data = [];
                }
            })
            .call()
        },
        loadAvatar(image) {
           return config.storageUrl+'/image_barang/'+image;
        },
        loadAvatarBanner(image) {
           return config.storageUrl+'/banner/'+image;
        },
        beli(id) {
          // var r = confirm("Anda yakin ingin menghapus data ini ?");
          // if (r == true) {
            let context = this;
            context.$set(context.btnSync, id, true);
            Api(context, transaksi.beli(id)).onSuccess(function(response) {
                bus.$emit('RELOAD_USER')
                context.$set(context.btnSync, id, false);
                context.notifyVue(response.data.message, 'top', 'right', 'info')
                // context.$router.push('/keranjang')
            })
            .onError(function(error) {                    
                if (error.response.status == 404) {
                    context.notifyVue(error.response.data.message, 'top', 'right', 'danger')
                }
                context.$set(context.btnSync, id, false);
            })
            .call();
          // }
        },
        convertRp(bilangan) {
            var number_string = bilangan.toString(),
                sisa    = number_string.length % 3,
                rupiah  = number_string.substr(0, sisa),
                ribuan  = number_string.substr(sisa).match(/\d{3}/g);
                    
            if (ribuan) {
                var separator = sisa ? '.' : '';
                rupiah += separator + ribuan.join('.');
                return 'Rp. ' + rupiah
            }
        },
        filter() {
            clearTimeout(this.loadTimeout);
            this.loadTimeout = setTimeout(() => {
                this.get()
            }, 100);
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
        },
        loadImage(image) {
            return config.storageUrl+'image_barang/'+image;
        },
    }
};
</script>

<style type="text/css" scoped>

/*untuk layar device berukuran kecil*/
@media screen and (min-width: 360px) {
   .carousel2 {
        border-radius: 40px 40px 40px 40px;
        overflow: hidden;
        margin-top: 100px;
        margin-bottom: -100px;
    }
}

/*untuk layar device berukuran sedang*/
@media screen and (min-width: 550px) {
   .carousel2 {
        border-radius: 55px 55px 55px 55px;
        overflow: hidden;
        /*height: 350px;*/
        margin-top: 120px
  }
}

/*untuk layar device berukuran besar*/
@media screen and (min-width: 800px) {
   .carousel2 {
        border-radius: 55px 55px 55px 55px;
        overflow: hidden;
        /*height: 350px;*/
        margin-top: 130px;
        margin-bottom: 0px;
    }
}
</style>
