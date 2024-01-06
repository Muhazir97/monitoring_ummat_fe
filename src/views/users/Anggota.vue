<template>
    <div>
      <div class="gapPPAnggota"></div>

        <!-- ============ SYARAT & KETENTUAN ============== -->
        <section class="section section-lg pt-lg-0 mt-5 container">
            <div class="container" >
                <div class="row justify-content-center">
                    <div class="col-lg-12 mt-5 shadow">
                        <!-- <div class="card"> -->
                          <!-- <div class="card-body"> -->
                            <p class="display-4 text-center">Anggota</p>
                            <div class="table-responsive">
                                <table class="table-sm table table-hover">
                                    <thead>
                                        <tr bgcolor="#F0F8FF" style="text-align: center;">
                                            <th style="font-size: 13px;">FOTO</th>
                                            <th style="font-size: 13px;">NAMA</th>
                                            <th style="font-size: 13px;">JABATAN</th>
                                            <!-- <th style="font-size: 13px; width: 150px;">PROVINSI</th> -->
                                            <th style="font-size: 13px; width: 190px;">KOTA</th>
                                            <th style="font-size: 13px; width: 190px;">KECAMATAN</th>
                                            <th style="font-size: 13px; width: 190px;">KELURAHAN</th>
                                            <th style="font-size: 13px; width: 190px;">TPS</th>
                                            <th style="font-size: 13px; width: 190px;">TOTAL KEGIATAN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(row, i) in table.data" :key="i" style="font-size: 13px; text-align: center;">
                                            <td style="width: 10%;"><img :src="storageUrl+'image_user/'+row.image" width="100px" ></td>
                                            <td>{{ row.nama_lengkap }}</td>
                                            <td>{{ row.jabatan }}</td>
                                            <!-- <td>{{ row.provinsi }}</td> -->
                                            <td>{{ row.kota }}</td>
                                            <td>{{ row.kecamatan }}</td>
                                            <td>{{ row.kelurahan }}</td>
                                            <td>{{ row.nama_tps }}</td>
                                            <td>{{ row.total_kegiatan_count }}</td>
                                        </tr>
                                    </tbody>
                                    <table>
                                        <tbody>
                                            
                                        </tbody>
                                    </table>
                                </table>
                            </div>
                          <!-- </div> -->
                        <!-- </div> -->
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
  import Api from '@/helpers/api';
  import axios from 'axios';
  import config from '@/configs/config';
  import Modal from "@/components/Modal.vue";
  import bus from '@/eventBus';

export default {
  name: "home",
  components: {
    Modal
  },
  data() {
      return {
        table: {
          data: []
        },
        search: '',
        storageUrl : config.storageUrl,
      };
  },
  mounted(){
    this.get();
  },
  created () {
      var context = this;
      bus.$on('RELOAD_GET_ANGGOTA', function () {
        context.get();
      });
  },
  methods: {
      get(){
          let params = {level: localStorage.getItem('level'), area: localStorage.getItem('area'), search: this.search}
          
          axios.get(config.apiUrl +"anggota/anggota-by-area", {params}).then(response => {
              this.table.data = response.data.data.data.data
              console.log(response.data.data.data.data)
          })
          .catch(err => {
              if (err.response.status == 404) {
                  this.table.data = [];
              }
          })
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
    }
};
</script>
<style type="text/css" scoped>

/*untuk layar device berukuran kecil*/
@media screen and (min-width: 360px) {
    .gapPPAnggota {
        margin-top: -80px
    }
}

/*untuk layar device berukuran sedang*/
@media screen and (min-width: 550px) {
    .gapPPAnggota {
        margin-top: 50px
    }
}

/*untuk layar device berukuran besar*/
@media screen and (min-width: 800px) {
    .gapPPAnggota {
        margin-top: 100px
    }
}
</style>
