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
                  <h4 class="card-title">Setting</h4>
                  <!-- <p class="card-category">Here is a subtitle for this table</p> -->
                </div>
                <div class="col-4">
                  <!-- <base-input type="text"
                            placeholder="Search"
                            v-model="search"
                            v-on:keyup="filter"
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
                    <!-- <th>Surat Permohonan Mitra </th>
                    <th>Ongkir</th>
                    <th>Potongan Aplikasi</th>
                    <th>Batas Transaksi Selesai</th> -->
                    <th>Email</th>
                    <th>Password</th>
                    <th>Mail From</th>
                    <th>Link Domain Email</th>
                    <th>Banner</th>
                    <th></th>
                  </tr>
                </slot>
              </thead>
              <tbody>
                <tr v-for="(row, i) in table.data" :key="i">
                  <!-- <td style="font-size: 13px;">
                    <a :href="storageUrl+'/image_user/'+row.surat_permohonan_mitra" target="_BLANK">Klik Here</a></td>
                  <td style="font-size: 13px;">
                    <span v-if="!row.ongkir == 0">{{convertRp(row.ongkir)}} / Toko</span>
                    <span v-else>Gratis</span>
                  </td>
                  <td style="font-size: 13px;">
                    <span v-if="!row.potongan_aplikasi == 0">{{convertRp(row.potongan_aplikasi)}} / Item</span>
                    <span v-else>Gratis</span>
                  </td>
                  <td style="font-size: 13px;">
                    {{row.batas_transaksi_selesai}} Hari
                  </td> -->
                  <td style="font-size: 13px;">
                    {{row.email}}
                  </td>
                  <td style="font-size: 13px;">
                    {{row.password}}
                  </td>
                  <td style="font-size: 13px;">
                    {{row.mail_from}}
                  </td>
                  <td style="font-size: 13px;">
                    <a :href="row.link_domain_email" target="_BLANK">{{row.link_domain_email}}</a>
                  </td>
                  <td>
                    <button class="btn btn-success btn-sm" @click="modalBanner()"><small>Banner</small></button>
                  </td>
                  <td>
                    <i class="fa fa-edit" aria-hidden="true" title="Update" style="cursor: pointer;" @click="create(row.id)"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </card>
        </div>

        <!-- MODAL UPDATE SETTING -->
        <div>
           <modal :show.sync="form.show">
             <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">{{form.title}}</h5>
             </template>
             <div>
              <base-input 
                          label="Surat Permohonan Mitra"
                          type="file"
                          placeholder="File"
                          @change="filesChangeSuratPermohonan">
              </base-input>
              <base-input type="number"
                    label="Ongkir"
                    placeholder="Ongkir"
                    v-model="setting.ongkir">
              </base-input>
              <base-input type="number"
                    label="Potongan Aplikasi"
                    placeholder="Potongan Aplikasi"
                    v-model="setting.potongan_aplikasi">
              </base-input>
              <base-input type="number"
                    label="Batas Transaksi Selesai"
                    placeholder="Batas Transaksi Selesai"
                    v-model="setting.batas_transaksi_selesai">
              </base-input>
              <base-input type="email"
                    label="Email"
                    placeholder="Email"
                    v-model="setting.email">
              </base-input>
              <base-input type="text"
                    label="Password"
                    placeholder="Password"
                    v-model="setting.password">
              </base-input>
              <base-input type="text"
                    label="Mail From"
                    placeholder="Mail From"
                    v-model="setting.mail_from">
              </base-input>
              <base-input type="text"
                    label="Link Domain Email"
                    placeholder="Link Domain Email"
                    v-model="setting.link_domain_email">
              </base-input>
             </div>
             <template slot="footer">
                 <base-button type="secondary mr-2" @click="form.show = false">Close</base-button>
                 <base-button type="primary" @click="save()">Save</base-button>
             </template>
           </modal>
        </div>

        <!-- MODAL BANNER -->
        <div>
           <modal :show.sync="mBanner.show" size="large">
             <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">{{mBanner.title}}</h5>
             </template>
             <base-button class="float-right btn-sm mb-3" type="success" @click="addBanners()">Add Banner</base-button>
             <div>
              <table class="table">
                <thead>
                  <slot name="columns">
                    <tr>
                      <th>Banner</th>
                      <th>Sequence</th>
                      <th>#</th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in tableBanner.data" :key="i">
                    <td style="font-size: 13px;">
                      <a :href="storageUrl+'/banner/'+row.banner" target="_BLANK">{{row.banner}}</a>
                    </td>
                    <td>
                      <input class="form-control"
                         type="number" 
                         placeholder="Masukkan Urutan" 
                         :value="row.sequence"
                         @change="updateBanner(row.id)">
                    </td>
                    <td>
                      <i class="fa fa-trash-o" aria-hidden="true" title="Hapus" style="cursor: pointer;" @click="deleteBanner(row.id)"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
             </div>
           </modal>
        </div>

        <!-- MODAL ADD BANNER -->
        <div>
           <modal :show.sync="addBanner.show">
             <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">{{addBanner.title}}</h5>
             </template>
             <div>
              <small>Upload Banner Dimensions 1280 x 640 dan Ukuran File di bawah MB</small>
              <base-input 
                  label="Banner"
                  type="file"
                  placeholder="File"
                  @change="filesChangeBanner">
              </base-input>
              <base-input type="number"
                    label="Sequence"
                    placeholder="Sequence"
                    v-model="settingBanner.sequence">
              </base-input>
             </div>
             <template slot="footer">
                 <base-button type="secondary mr-2" @click="addBanner.show = false">Close</base-button>
                 <base-button type="primary" @click="saveBanner()">Save</base-button>
             </template>
           </modal>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import Card from '@/components/Cards/Card.vue'
  import Modal from '@/components/Modal.vue'
  import config from '@/configs/config';
  import Api from '@/helpers/api';
  import setting from '@/services/setting.service';
  
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
        tableBanner: {
          data: []
        },
        form: {
            add: true,
            title: "Add Data",
            show: false
        },
        mBanner: {
            add: true,
            title: "Add Data",
            show: false
        },
        addBanner: {
            add: true,
            title: "Add Data",
            show: false
        },
        setting: {},
        settingBanner: {},
        storageUrl : config.storageUrl,
        loadTimeout: null,
        search: '',
        notifications: {
          topCenter: false
        },
      }
    },
    mounted(){
      this.get();
      this.getBanner();
    },
    methods: {
      get(param){
        let context = this;               
        Api(context, setting.index({search: this.search})).onSuccess(function(response) {    
            context.table.data = response.data.data.data;
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.table.data = [];
            }
        })
        .call()
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
      create(id) {
          this.form.add   = true;
          this.form.show  = true;
          this.form.title = "Update Setting";
          this.setting    = {}
          this.setting = this.table.data[0]
      },
      modalBanner() {
          this.mBanner.add   = true;
          this.mBanner.show  = true;
          this.mBanner.title = "Banner Setting";
      },
      addBanners() {
          this.addBanner.add   = true;
          this.addBanner.show  = true;
          this.addBanner.title = "Add Banner";
          this.settingBanner    = {}
      },
      filesChangeSuratPermohonan(e) {
          this.setting.surat_permohonan_mitra = e.target.files[0];
      },
      filesChangeBanner(e) {
          this.settingBanner.banner = e.target.files[0];
      },
      save(){
        let api = null;
        let context = this;
        let formData = new FormData(); 

        // if (this.dataAdmin.username != undefined && this.dataAdmin.email != undefined && this.dataAdmin.password != undefined) {
          formData.append('surat_permohonan_mitra', this.setting.surat_permohonan_mitra);
          formData.append('ongkir', this.setting.ongkir);
          formData.append('potongan_aplikasi', this.setting.potongan_aplikasi);
          formData.append('batas_transaksi_selesai', this.setting.batas_transaksi_selesai);
          formData.append('email', this.setting.email);
          formData.append('password', this.setting.password);
          formData.append('mail_from', this.setting.mail_from);
          formData.append('link_domain_email', this.setting.link_domain_email);
        // }else{
        //   alert('Field Berbintang Merah Wajib Di Isi')
        // }

        api = Api(context, setting.update(this.setting.id, formData));
        api.onSuccess(function(response) {
            context.get();
            context.form.show = false;
            context.notifyVue(response.data.message, 'top', 'right', 'info')
        }).onError(function(error) {                    
            context.notifyVue('Gagal Update', 'top', 'right', 'danger')
        }).onFinish(function() {  
        })
        .call();
      },
      saveBanner(){
        let api = null;
        let context = this;
        let formData = new FormData(); 

        // if (this.dataAdmin.username != undefined && this.dataAdmin.email != undefined && this.dataAdmin.password != undefined) {
          formData.append('banner', this.settingBanner.banner);
          formData.append('sequence', this.settingBanner.sequence);
        // }else{
        //   alert('Field Berbintang Merah Wajib Di Isi')
        // }

        api = Api(context, setting.createBanner(formData));
        api.onSuccess(function(response) {
            context.getBanner();
            context.addBanner.show = false;
            context.notifyVue(response.data.message, 'top', 'right', 'info')
        }).onError(function(error) {                    
            context.notifyVue('Gagal Update', 'top', 'right', 'danger')
        }).onFinish(function() {  
        })
        .call();
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
      updateBanner(id){
        let api = null;
        let context = this;
        let sequence = event.target.value

        api = Api(context, setting.updateBanner(id, {sequence : sequence}));
        api.onSuccess(function(response) {
            context.getBanner()
            context.notifyVue(response.data.message, 'top', 'right', 'info')
        }).onError(function(error) { 
            context.notifyVue('Gagal Update Keranjang', 'top', 'right', 'danger')
        }).onFinish(function() {  
        })
        .call();
      },
      deleteBanner(id) {
        var r = confirm("Anda yakin ingin menghapus data ini ?");
        if (r == true) {
          let context = this;

          Api(context, setting.deleteBanner(id)).onSuccess(function(response) {
              context.getBanner();
              context.notifyVue(response.data.message, 'top', 'right', 'info')
          }).call();
        }
      },
      notifyVue(message, verticalAlign, horizontalAlign, type) {
        const color = Math.floor((Math.random() * 4) + 1)
        this.$notifications.notify(
          {
            message: message,
            icon: 'nc-icon nc-app',
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: type
          })
      }
    }
  }
</script>

