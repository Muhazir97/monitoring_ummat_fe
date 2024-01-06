<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <div class="row">
                <div class="col-4">
                  <h4 class="card-title">Pembayaran Mitra</h4>
                  <!-- <p class="card-category">Here is a subtitle for this table</p> -->
                </div>
                <div class="col-4">
                  <!-- <base-input type="text"
                            placeholder="Search"
                            size="small">
                  </base-input> -->
                </div>
                <div class="col-4">
                  <!-- <button type="submit" class="btn btn-sm btn-info btn-fill float-right" @click="create()">
                    Add New
                  </button> -->
                </div>
              </div>
            </template>
            <table class="table">
              <thead>
                <slot name="columns">
                  <tr>
                    <th>Code Invoice</th>
                    <th>Mitra</th>
                    <th>Nama Barang</th>
                    <!-- <th>Jumlah</th> -->
                    <!-- <th>Harga</th> -->
                    <th>Sub Total</th>
                    <th>Potongan</th>
                    <th>Total Pembayaran Mitra</th>
                    <th>Status</th>
                    <th>Bukti Pengiriman</th>
                    <th>Catatan</th>
                    <th>Bukti Pembayaran Ke Mitra</th>
                    <th>No Rek</th>
                    <th>AN Rek</th>
                    <th></th>
                  </tr>
                </slot>
              </thead>
              <tbody>
                <tr v-for="(row, i) in table.data" :key="i">
                  <td>
                      <label class="badge badge-default"><small><router-link :to="'/detail-pesanan/'+row.code_invoice">{{row.code_invoice}}</router-link></small></label>
                  </td>
                  <td style="font-size: 13px;">
                    <label class="badge badge-success text-black"><small>{{row.nama_lengkap}}</small></label>
                  </td>
                  <td style="font-size: 13px;">{{row.nama_brg}}</td>
                  <!-- <td style="font-size: 13px;">{{row.jumlah}}</td> -->
                  <!-- <td style="font-size: 13px;">{{convertRp(row.harga)}}</td> -->
                  <td style="font-size: 13px;">{{convertRp(row.sub_total)}}</td>
                  <td style="font-size: 13px;">{{convertRp(potongan_aplikasi)}}</td>
                  <td style="font-size: 13px;">
                    <label class="badge badge-warning text-black"><small>{{convertRp(row.sub_total - potongan_aplikasi)}}</small></label>
                  </td>
                  <td style="font-size: 13px;">{{row.status}}</td>
                  <td style="font-size: 13px;">
                    <a :href="storageUrl+'/bukti_pengiriman/'+row.bukti_pengiriman" target="_BLANK">Klik Here</a>
                  </td>
                  <td style="font-size: 13px;">{{row.catatan}}</td>
                  <td style="font-size: 13px;">
                    <a :href="storageUrl+'/bukti_bayar_mitra/'+row.bukti_pembayaran_mitra" target="_BLANK" v-if="row.bukti_pembayaran_mitra">Klik Here</a>
                    <label class="badge badge-danger text-black" v-else><small>Belum Di Bayar</small></label>
                  </td>
                  <td style="font-size: 13px;">{{row.no_rek}}</td>
                  <td style="font-size: 13px;">{{row.an_rekening}}</td>
                  <td style="font-size: 13px;">
                    <button class="btn btn-success btn-sm" @click="modalKonfirm.show = true, setIdMitra = row.id" v-if="!row.bukti_pembayaran_mitra"><small>Konfirmasi</small></button>
                  </td>
                  <td v-if="row.status == 'Transaksi Selesai'">
                      <i class="fa fa-trash-o" aria-hidden="true" style="cursor: pointer;" @click="removePembayaran(row.id)" title="Hapus"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </card>
        </div>

        <!-- MODAL KONFIRMASI PESANAN -->
        <modal :show.sync="modalKonfirm.show">
            <h6 slot="header" class="modal-title" id="modal-title-default">{{modalKonfirm.title}}</h6>
            <base-input alternative
                        type="file"
                        class="mb-3"
                        placeholder="Image"
                        @change="filesChangeKonfirmPembayaranMitra"
                        addon-left-icon="ni ni-image">
            </base-input>
            <template slot="footer">
                <base-button type="secondary" class="ml-auto btn-sm mr-2" @click="modalKonfirm.show = false">Close</base-button>
                <base-button class="btn btn-primary btn-sm" @click="saveKonfirmPembayaranMitra()" :disabled="onLoading">
                    <span v-if="onLoading"><i class="fa fa-spinner fa-spin"></i> Please Wait...</span>
                    <span v-else>
                        <span>Save</span>
                    </span>
                 </base-button>
            </template>
        </modal>

      </div>
    </div>
  </div>
</template>
<script>
  import Card from '@/components/Cards/Card.vue'
  import Modal from '@/components/Modal.vue'
  import config from '@/configs/config';
  import Api from '@/helpers/api';
  import profile from '@/services/profile.service';
  
  export default {
    components: {
      Card,
      Modal
    },
    data () {
      return {
        onLoading: false,
        table: {
          data: []
        },
        modalKonfirm: {
            title: "Masukkan Bukti Pembayaran",
            show: false
        },
        setIdMitra: '',
        konfirmPembayaranMitra: {},
        storageUrl : config.storageUrl,
        potongan_aplikasi: '',
      }
    },
    mounted(){
      this.get();
    },
    methods: {
      get(param){
        let context = this;               
        Api(context, transaksi.getPembayaranMitra({search: this.search})).onSuccess(function(response) {    
            context.table.data        = response.data.data.data;
            context.potongan_aplikasi = response.data.data.potongan_aplikasi;
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.table.data = [];
            }
        })
        .call()
      },
      filesChangeKonfirmPembayaranMitra(e) {
          this.konfirmPembayaranMitra.bukti_pembayaran = e.target.files[0];
      },
      saveKonfirmPembayaranMitra(){
          let context = this;
          context.onLoading = true;

          let formData = new FormData();
          formData.append('id_pesanan', this.setIdMitra);
          formData.append('bukti_pembayaran', this.konfirmPembayaranMitra.bukti_pembayaran);

          Api(context, transaksi.konfirmPembayaranMitra(formData)).onSuccess(function(response) {
              context.notifyVue(response.data.message, 'top', 'right', 'info')
              context.get();
              context.modalKonfirm.show = false
              context.onLoading = false;
          }).call();
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
      removePembayaran(id) {
        var r = confirm("Anda yakin ingin menghapus data ini ?");
        if (r == true) {
          let context = this;

          Api(context, profile.deletePembelian(id)).onSuccess(function(response) {
              context.get();
              context.notifyVue(response.data.message, 'top', 'right', 'info')
          }).call();
        }
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
  }
</script>
<style lang='scss' scoped>
  @import "@/assets/scss/light-bootstrap-dashboard.scss";
</style>
