<template>
    <div class="profile-page">
        <section class="section-profile-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary bg-gradient-dark shape-skew alpha-4">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </section>
        <div class="gapPP"></div>
        <section class="section section-skew">
            <div class="container">
                <card shadow class="card-profile mt--300" no-body>
                    <div class="px-4">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img :src="storageUrl+'image_user/'+getAkun.profile.image" class="rounded-circle">
                                    </a>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                                <div class="card-profile-actions py-4 mt-lg-0">
                                    <base-button type="info" size="sm" class="float-right" @click="editProfile()">Edit Profile</base-button>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-1">
                                <div class="card-profile-stats d-flex justify-content-center">
                                    <!-- <div>
                                        <span class="heading">22</span>
                                        <span class="description">Produk</span>
                                    </div>
                                    <div>
                                        <span class="heading">10</span>
                                        <span class="description">Terjual</span>
                                    </div>
                                    <div>
                                        <span class="heading">Rp. 3.500.000</span>
                                        <span class="description">Pendapatan</span>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                        <div class="text-center" style="margin-top: 100px;">
                            <h3>{{getAkun.profile.nama_lengkap}}</h3>
                            <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>{{getAkun.profile.kelurahan}}, {{getAkun.profile.nama_tps}}</div>
                            <!-- <div class="h6 mt-4"><i class="ni business_briefcase-24 mr-2"></i>{{getAkun.profile.jabatan}} - {{getAkun.profile.nik}}</div> -->
                            <!-- <div><i class="ni education_hat mr-2"></i>University of Computer Science</div> -->
                        </div>
                        <div class="mt-5  border-top text-center">

                            <tabs fill class="flex-column flex-md-row">
                                <card shadow>
                                    
                                    <!-- MASA -->
                                    <tab-pane key="masa">
                                        <template slot="title">
                                            <i class="fa fa-users mr-2"></i>Input Suara
                                        </template>
                                        <button class="btn btn-primary btn-sm float-right mr-5 mb-4" @click="createMasa()"><i class="fa fa-plus mr-2" aria-hidden="true"></i> Tambah Suara</button>
                                        <div class="table-responsive">
                                            <table class="table-sm table table-hover">
                                                <thead>
                                                    <tr bgcolor="#F0F8FF" style="font-size: 12px;">
                                                        <th>Nama Caleg</th>
                                                        <th>Kursi</th>
                                                        <th>Kelurahan</th>
                                                        <th>TPS</th>
                                                        <th>Total Suara</th>
                                                        <th>Foto</th>
                                                        <th>Tanggal Input</th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(row, i) in tableMasa.data" :key="i" style="font-size: 12px;">
                                                        <td>{{row.nama_lengkap}}</td>
                                                        <td>{{row.kursi}}</td>
                                                        <td>{{row.kelurahan}}</td>
                                                        <td>{{row.tps}}</td>
                                                        <td>{{row.total_suara}}</td>
                                                        <td style="width: 10%;"><a :href="storageUrl+'foto_masa/'+row.foto" target="_BLANK">Bukti Foto</a></td>
                                                        <td style="width: 15%;">{{ moment(row.created_at).locale('id').format('l') }}</td>
                                                        <td><i class="fa fa-trash-o" aria-hidden="true" style="cursor: pointer;" @click="removeMasa(row.id)" title="Hapus"></i></td>
                                                        <td><i class="fa fa-edit" aria-hidden="true" style="cursor: pointer;" @click="editMasa(row.id)" title="Edit"></i></td>
                                                    </tr>
                                                </tbody>
                                                <table>
                                                    <tbody>
                                                        
                                                    </tbody>
                                                </table>
                                            </table>
                                        </div>
                                    </tab-pane>
                                </card>
                            </tabs>
                            
                        </div>
                    </div>
                </card>
            </div>
        </section>

        <!-- MODAL TAMBAH SUARA -->
        <modal :show.sync="modalMasa.show">
            <h6 slot="header" class="modal-title" id="modal-title-default">{{modalMasa.title}}</h6>
            <label>Nama Caleg <span style="color: red;">*</span></label><br>
            <autocomplete
              ref="autocompleteCaleg"
              :url="apiUrl+'caleg/find-caleg'"
              :customHeaders="{ Authorization: tokenApi }"
              anchor="nama_lengkap"
              label="kursi"
              :on-select="getData"
              placeholder="Cari Nama Caleg ..."
              :min="3"
              :process="processJSON"
              :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
              >
            </autocomplete>
            <label class="mt-3">TPS <span style="color: red;">*</span></label><br>
            <autocomplete
              ref="autocompleteTps"
              :url="apiUrl+'wilayah/find-wilayah'"
              :customHeaders="{ Authorization: tokenApi }"
              anchor="tps"
              label="kelurahan"
              :on-select="getDataTps"
              placeholder="Cari Nama Kelurahan ..."
              :min="3"
              :process="processJSON"
              :classes="{ input: 'form-control', list: 'list', item: 'data-list-item' }"
              >
            </autocomplete>
            <label for="example-text-input" class="form-control-label mt-3">Total Suara <span style="color: red;">*</span></label>
            <base-input alternative
                        type="number"
                        class="mb-3"
                        placeholder="Total Suara"
                        v-model="masa.total_suara"
                        >
            </base-input>
            <label for="example-text-input" class="form-control-label mt-3">Foto<span style="color: red;">*</span></label>
            <base-input alternative
                        type="file"
                        class="mb-3"
                        placeholder="Foto"
                        @change="filesChangeMasa"
                        >
            </base-input>
        
            <template slot="footer">
                <base-button type="secondary" class="ml-auto btn-sm" @click="modalMasa.modal1 = false">Close</base-button>
                <base-button type="primary" class="btn-sm" @click="saveMasa()">Save</base-button>
            </template>
        </modal>

        <!-- MODAL EDIT PROFILE -->
        <modal :show.sync="modalProfile.show">
            <h6 slot="header" class="modal-title" id="modal-title-default">{{modalProfile.title}}</h6>
            <label for="example-text-input" class="form-control-label">Foto <span style="color: red;">*</span></label>
            <base-input alternative
                        type="file"
                        class="mb-3"
                        placeholder="Image"
                        @change="filesChangeProfile"
                        addon-left-icon="ni ni-image">
            </base-input>
            <label for="example-text-input" class="form-control-label">Nama Lengkap <span style="color: red;">*</span></label>
            <base-input alternative
                            class="mb-3"
                            placeholder="Nama Lengkap"
                            v-model="akun.nama_lengkap"
                            addon-left-icon="ni ni-hat-3">
                </base-input>
                <label for="example-text-input" class="form-control-label">NIK <span style="color: red;">*</span></label>
                <base-input alternative
                            class="mb-3"
                            type="number"
                            placeholder="NIK"
                            v-model="akun.nik"
                            addon-left-icon="ni ni-mobile-button">
                </base-input>
                <label for="example-text-input" class="form-control-label">Alamat Lengkap <span style="color: red;">*</span></label>
                <base-input alternative
                            class="mb-3"
                            placeholder="Alamat Lengkap"
                            v-model="akun.alamat_lengkap"
                            addon-left-icon="ni ni-map-big">
                </base-input>
                <!-- <label for="example-text-input" class="form-control-label">Provinsi <span style="color: red;">*</span></label>
                <base-input alternative addon-left-icon="ni ni-istanbul">
                    <select class="form-control form-control-alternative" v-model="idProivinsi" @change="getKota(idProivinsi)">
                      <option selected>Provinsi</option>
                      <option :value="row.id" v-for="(row, i) in tableProvinsi.data">{{row.nama}}</option>
                    </select>
                </base-input> -->
                <!-- <label for="example-text-input" class="form-control-label">Kota / Kabupaten</label>
                <base-input>
                  <select class="form-control form-control-alternative" v-model="idKota" @change="getKecamatan(idKota)">
                    <option selected>Kota / Kabupaten</option>
                    <option v-for="(row, i) in tableKota.data" :value="row.id">{{row.nama}}</option>
                  </select>
                </base-input> -->
                <!-- <label for="example-text-input" class="form-control-label">Kecamatan</label>
                <base-input>
                  <select class="form-control form-control-alternative" v-model="idKecamatan" @change="getKelurahan(idKecamatan)">
                    <option selected>Kecamatan</option>
                    <option :value="row.id" v-for="(row, i) in tableKecamatan.data">{{row.nama}}</option>
                  </select>
                </base-input>
                <label for="example-text-input" class="form-control-label">Kelurahan</label>
                <base-input>
                  <select class="form-control form-control-alternative" v-model="akun.kelurahan">
                    <option selected>Kelurahan</option>
                    <option :value="row.nama" v-for="(row, i) in tableKelurahan.data">{{row.nama}}</option>
                  </select>
                </base-input> -->
                <label for="example-text-input" class="form-control-label">Nama TPS <span style="color: red;">*</span></label>
                <base-input alternative
                            class="mb-3"
                            placeholder="Nama TPS"
                            v-model="akun.nama_tps"
                            addon-left-icon="ni ni-email-83">
                </base-input>
                <label for="example-text-input" class="form-control-label">Jabatan <span style="color: red;">*</span></label>
                <base-input alternative
                            class="mb-3"
                            placeholder="Jabatan"
                            v-model="akun.jabatan"
                            addon-left-icon="ni ni-email-83">
                </base-input>
                <label for="example-text-input" class="form-control-label">Username <span style="color: red;">*</span></label>
                <base-input alternative
                            class="mb-3"
                            placeholder="Username"
                            v-model="akun.username"
                            addon-left-icon="ni ni-single-02">
                </base-input>
                <label for="example-text-input" class="form-control-label">Password <span style="color: red;">*</span></label>
                <base-input alternative
                            type="password"
                            placeholder="Password"
                            v-model="akun.password"
                            addon-left-icon="ni ni-lock-circle-open">
                </base-input>
            <template slot="footer">
                <base-button type="secondary" class="ml-auto btn-sm" @click="modalProfile.show = false">Close</base-button>
                <base-button type="primary" class="btn-sm" @click="updateProfile()">Save</base-button>
            </template>
        </modal>

    </div>
</template>
<script>
    import Modal from "@/components/Modal.vue";
    import axios from 'axios';
    import Api from '@/helpers/api';
    import config from '@/configs/config';
    import akun from '@/services/akun.service';
    import Tabs from "@/components/Tabs/Tabs.vue";
    import barang from '@/services/barang.service';
    import masa from '@/services/masa.service';
    import TabPane from "@/components/Tabs/TabPane.vue";
    import profile from '@/services/profile.service';
    import bus from '@/eventBus';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import MyUploadAdapter from "./admin/page/MyUploadAdapter.js";
    var moment = require('moment');
    import Autocomplete from 'vue2-autocomplete-js'
    require('vue2-autocomplete-js/dist/style/vue2-autocomplete.css')

export default {
    components: {
        Modal,
        Tabs,
        TabPane,
        Autocomplete,
    },
    data() {
        return {
            moment:moment,
            modalMasa: {
                show: false,
                title: 'Tambah Masa',
            },
            modalProfile: {
                show: false,
                title: 'Edit Profile',
            },
            masa: {},
            table: {
              data: []
            },
            tableMasa: {
              data: []
            },
            akun: {},
            getAkun: {
              profile: []
            },
            apiUrl :config.apiUrl,
            storageUrl : config.storageUrl,
            tokenApi : '',
        };
    },
    mounted(){
      this.getProfile();
      this.getMasa();
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
    },
    methods: {
        getProfile(param){
            let context = this;               
            Api(context, akun.indexProfile()).onSuccess(function(response) {    
                context.getAkun.profile = response.data.data[0];
                bus.$emit('PARSING_USER', context.getAkun.profile.nama_lengkap)
                context.$forceUpdate();
            }).onError(function(error) {                    
                if (error.response.status == 404) {
                    context.getAkun.profile = [];
                }
            })
            .call()
        },
        getMasa(param){
            let context = this;               
            Api(context, masa.index({search: this.search})).onSuccess(function(response) {    
                context.tableMasa.data = response.data.data.data.data;
            }).onError(function(error) {               
                if (error.response.status == 404) {
                    context.tableMasa.data = [];
                }
            })
            .call()
        },
        createMasa() {
            this.modalMasa.show  = true;
            this.modalMasa.title = "Tambah Masa";
            this.masa = {}
            this.$refs.autocompleteCaleg.clearInput()
            this.$refs.autocompleteTps.clearInput()
        },
        editMasa(id) {
          let context = this;               
          Api(context, masa.show(id)).onSuccess(function(response) {
              context.masa     = response.data.data[0];
              context.modalMasa.show  = true;
              context.modalMasa.title = 'Edit Masa';                        
          })
          .call()        
        },
        filesChangeMasa(e) {
            this.masa.foto = e.target.files[0];
        },
        saveMasa(){
            let api = null;
            let context = this;
            let formData = new FormData(); 

            formData.append('code_caleg', this.masa.code_caleg);
            formData.append('code_wilayah', this.masa.code_wilayah);
            formData.append('total_suara', this.masa.total_suara);
            formData.append('foto', this.masa.foto);

            if (context.modalMasa.title == 'Tambah Masa') {
                api = Api(context, masa.create(formData));
            } else {
                api = Api(context, masa.update(this.masa.id, formData));
            }
            api.onSuccess(function(response) {
                context.modalMasa.show  = false;
                context.masa = {}
                context.getMasa();
                context.notifyVue(response.data.message, 'top', 'right', 'info')
            }).onError(function(error) { 
                context.notifyVue('Data Gagal di Simpan', 'top', 'right', 'info')
            }).onFinish(function() {  
            })
            .call();
        },
        removeMasa(id) {
          var r = confirm("Anda yakin ingin menghapus data ini ?");
          if (r == true) {
            let context = this;

            Api(context, masa.delete(id)).onSuccess(function(response) {
                context.getMasa();
                context.notifyVue(response.data.message, 'top', 'right', 'info')
            }).call();
          }
        },
        editProfile() {
          let context = this;             
          Api(context, akun.show(context.getAkun.profile.id)).onSuccess(function(response) {
              context.akun         = response.data.data;
              context.modalProfile.show  = true;
              context.modalProfile.title = 'Edit Profile';                        
          })
          .call()        
        },
        filesChangeProfile(e) {
            this.akun.image = e.target.files[0];
        },
        updateProfile() {
            let api = null;
            let context = this;
            let formData = new FormData(); 

            formData.append('image', this.akun.image);
            formData.append('nik', this.akun.nik);
            formData.append('nama_lengkap', this.akun.nama_lengkap);
            formData.append('alamat_lengkap', this.akun.alamat_lengkap);
            formData.append('provinsi', this.akun.provinsi);
            formData.append('kota', this.akun.kota);
            formData.append('kecamatan', this.akun.kecamatan);
            formData.append('kelurahan', this.akun.kelurahan);
            formData.append('nama_tps', this.akun.nama_tps);
            formData.append('jabatan', this.akun.jabatan);
            formData.append('username', this.akun.username);
            if (this.akun.password != null || this.akun.password != undefined) {
                formData.append('password', this.akun.password);
            }

            api = Api(context, akun.update(this.akun.id, formData));
            api.onSuccess(function(response) {
                context.modalProfile.show  = false;
                context.getProfile();
                context.notifyVue('Data Berhasil di Update', 'top', 'right', 'info')
            }).onError(function(error) {                    
                context.notifyVue('Data Gagal di Update' , 'top', 'right', 'danger')
            }).onFinish(function() {  
            })
            .call();     
        },

        // ================= Autocomplete ============
          // AMBIL DATA YANG DI PILIH AC
          getData(obj){
            this.masa.code_caleg = obj.code_caleg;
          },
          // AMBIL DATA YANG DI PILIH AC
          getDataTps(obj){
            this.masa.code_wilayah = obj.code_wilayah;
          },
          // AMBIL DATA DARI API AC
          processJSON(json) {
            return json.data
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
<style type="text/css">

/*untuk layar device berukuran kecil*/
@media screen and (min-width: 360px) {
    .gapPP {
        margin-top: -150px
    }
}

/*untuk layar device berukuran sedang*/
@media screen and (min-width: 550px) {
    .gapPP {
        margin-top: 50px
    }
}

/*untuk layar device berukuran besar*/
@media screen and (min-width: 800px) {
    .gapPP {
        margin-top: -150px
    }
}
</style>