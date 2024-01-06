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
                  <h4 class="card-title">Akun</h4>
                  <!-- <p class="card-category">Here is a subtitle for this table</p> -->
                </div>
                <div class="col-4">
                </div>
                <div class="col-4">
                  <button type="submit" class="btn btn-sm btn-info btn-fill float-right" @click="create()" v-if="dataRole == 'Admin'">
                    Add New
                  </button>
                  <button type="submit" class="btn btn-sm btn-secondary btn-fill float-right mr-2" @click="filter()">
                    Filter
                  </button>
                </div>
              </div>
            </template>
            <div class="scroll">
              <table class="table table-striped">
                <thead>
                  <slot name="columns">
                    <tr style="background-color: #DAA520; color: white;">
                      <th style="color: white;">Nama</th>
                      <th style="color: white;">Tgl Lahir</th>
                      <th style="color: white;">Alamat Lengkap</th>
                      <th style="color: white;">NO KTP</th>
                      <th style="color: white;">No HP</th>
                      <th style="color: white;">Kecamatan</th>
                      <th style="color: white;">Kelurahan</th>
                      <th style="color: white;">TPS</th>
                      <th style="color: white;">Username</th>
                      <th style="color: white;">Role</th>
                      <!-- <th style="color: white;">Image</th> -->
                      <th style="color: white;" v-if="dataRole == 'Admin'"></th>
                      <th style="display: none"></th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in table.data" :key="i">
                    <td style="font-size: 12px;">{{row.nama_lengkap}}</td>
                    <td style="font-size: 12px; white-space: nowrap;">{{ moment(row.tgl_lahir).locale('id').format('l') }}</td>
                    <td style="font-size: 12px;">{{row.alamat_lengkap}}</td>
                    <td style="font-size: 12px;">{{row.no_ktp}}</td>
                    <td style="font-size: 12px;">{{row.no_hp}}</td>
                    <td style="font-size: 12px;">{{row.kecamatan}}</td>
                    <td style="font-size: 12px;">{{row.kelurahan}}</td>
                    <td style="font-size: 12px;">{{row.tps}}</td>
                    <td style="font-size: 12px;">{{row.username}}</td>
                    <td style="font-size: 12px;">
                      <label class="badge badge-danger" v-if="row.role == 'Admin'">{{row.role}}</label>
                      <label class="badge badge-success" v-if="row.role == 'Saksi'">{{row.role}}</label>
                      <label class="badge badge-primary" v-if="row.role == 'Visitor'">{{row.role}}</label>
                    </td>
                    <!-- <td style="font-size: 11px;"><a :href="storageUrl+'/image_user/'+row.image" target="_BLANK">Klik Here</a></td> -->
                    <td style="white-space: nowrap;" v-if="dataRole == 'Admin'">
                      <i class="fa fa-edit" aria-hidden="true" style="cursor: pointer; margin-right: 20px;" @click="edit(row.id)" title="Edit"></i>
                      <i class="fa fa-trash-o" aria-hidden="true" title="Hapus" style="cursor: pointer;" @click="remove(row.id)"></i>
                    </td>
                    <td style="display: none"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <template slot="footer">
              <div class="float-left">TOTAL : {{table.data.length}}</div>
              <div class="float-right">
                <base-pagination :page-count="pagination.page_count" v-model="pagination.default" @input="changePage"></base-pagination>
              </div>
            </template>
          </card>
        </div>

        <!-- MODAL CREATE -->
        <div>
           <modal :show.sync="form.show">
             <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">{{form.title}}</h5>
             </template>
             <div>
              <base-input type="text"
                    label="Nama Lengkap"
                    placeholder="Nama Lengkap"
                    v-model="akunData.nama_lengkap">
              </base-input>
              <base-input type="date"
                    label="Tanggal Lahir"
                    placeholder="Tanggal Lahir"
                    v-model="akunData.tgl_lahir">
              </base-input>
              <base-input type="text"
                    label="Alamat Lengkap"
                    placeholder="Alamat Lengkap"
                    v-model="akunData.alamat_lengkap">
              </base-input>
              <base-input type="number"
                    label="No KTP"
                    placeholder="No KTP"
                    v-model="akunData.no_ktp">
              </base-input>
              <base-input type="number"
                    label="No HP"
                    placeholder="No HP"
                    v-model="akunData.no_hp">
              </base-input>
              <label for="example-text-input" class="form-control-label">Kecamatan </label>
              <base-input>
                  <select class="form-control form-control-alternative" v-model="akunData.kecamatan" @change="getKelurahan()">
                    <option :value="row.kecamatan" v-for="(row, i) in tableKecamatan.data">{{row.kecamatan}}</option>
                  </select>
              </base-input>
              <label for="example-text-input" class="form-control-label">Kelurahan</label>
              <base-input>
                  <select class="form-control form-control-alternative" v-model="akunData.kelurahan" @change="getTps()">
                    <option :value="row.kelurahan" v-for="(row, i) in tableKelurahan.data">{{row.kelurahan}}</option>
                  </select>
              </base-input>
              <label for="example-text-input" class="form-control-label">TPS</label>
              <base-input>
                  <select class="form-control form-control-alternative" v-model="akunData.tps">
                    <option :value="row.tps" v-for="(row, i) in tableTPS.data">{{row.tps}}</option>
                  </select>
              </base-input>
              <base-input>
                <label class="form-control-label">Role</label>
                <select class="form-control form-control-alternative" v-model="akunData.role">
                  <option value="Admin">Admin</option>
                  <option value="Saksi">Saksi</option>
                  <option value="Visitor">Visitor</option>
                </select>
              </base-input>
              <base-input type="text"
                    label="Username"
                    placeholder="Username"
                    v-model="akunData.username">
              </base-input>
              <base-input type="text"
                    label="Password"
                    placeholder="Password"
                    v-if="akunData.role != 'Saksi'"
                    v-model="akunData.password">
              </base-input>
             </div>
             <template slot="footer">
                 <base-button type="secondary mr-2" class="btn btn-sm btn-secondary btn-fill" @click="form.show = false">Close</base-button>
                 <button type="primary" class="btn btn-sm btn-info btn-fill" @click="save()" :disabled="onLoading">
                    <span v-if="onLoading"><i class="fa fa-spinner fa-spin"></i> Please Wait...</span>
                    <span v-else>
                        <span>Save</span>
                    </span>
                </button>
             </template>
           </modal>
        </div>

        <!-- MODAL FILTER -->
        <div>
           <modal :show.sync="formFilter.show">
             <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">{{formFilter.title}}</h5>
             </template>
             <div>
              <base-input type="text"
                    label="Nama"
                    placeholder="Nama"
                    v-model="search.nama_lengkap">
              </base-input>
              <base-input type="text"
                    label="No KTP"
                    placeholder="No KTP"
                    v-model="search.no_ktp">
              </base-input>
              <base-input type="text"
                    label="Kecamatan"
                    placeholder="Kecamatan"
                    v-model="search.kecamatan">
              </base-input>
              <base-input type="text"
                    label="Kelurahan"
                    placeholder="Kelurahan"
                    v-model="search.kelurahan">
              </base-input>
              <base-input type="text"
                    label="TPS"
                    placeholder="TPS"
                    v-model="search.tps">
              </base-input>
              <div class="form-group">
                <label>Role</label><br>
                <select class="form-select form-control" aria-label="Default select example" v-model="search.role">
                  <option value="Admin">Admin</option>
                  <option value="Saksi">Saksi</option>
                  <option value="Visitor">Visitor</option>
                </select>
              </div>
              <base-input type="text"
                    label="Username"
                    placeholder="Username"
                    v-model="search.username">
              </base-input>

             </div>
             <template slot="footer">
                 <base-button type="secondary" class="btn btn-sm btn-secondary btn-fill mr-4" @click="search = {}">Clear</base-button>
                 <base-button type="primary" class="btn btn-sm btn-info btn-fill" @click="get(), formFilter.show = false">Filter</base-button>
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
  import akun from '@/services/akun.service';
  import axios from 'axios';
  var moment = require('moment');
  
  export default {
    components: {
      Card,
      Modal
    },
    data () {
      return {
        moment:moment,
        pagination: {
          page_count: '',
          default: 1,
          page: '',
        },
        onLoading: false,
        table: {
          data: []
        },
        tableKecamatan: {
          data: []
        },
        tableKelurahan: {
          data: []
        },
        tableTPS: {
          data: []
        },
        form: {
            add: true,
            title: "Add Data",
            show: false
        },
        formFilter: {
            add: true,
            title: "Filter",
            show: false
        },
        akunData: {}, 
        storageUrl : config.storageUrl,
        loadTimeout: null,
        search: {
          nama_lengkap: '',
          no_ktp: '',
          kecamatan: '',
          kelurahan: '',
          tps: '',
          username: '',
          role: '',
        },
        dataRole: '',
      }
    },
    mounted(){
      this.get();
      this.getKecamatan()
      this.getProfile();
    },
    methods: {
      get(param){
        let context = this;               
        Api(context, akun.index({nama_lengkap: context.search.nama_lengkap, no_ktp: context.search.no_ktp, username: context.search.username, kecamatan: context.search.kecamatan, kelurahan: context.search.kelurahan, tps: context.search.tps, role: context.search.role, page: context.pagination.page})).onSuccess(function(response) {    
            context.table.data            = response.data.data.data.data;
            context.pagination.page_count = response.data.data.data.last_page
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.table.data = [];
            }
        })
        .call()
      },
      getProfile(){
        let context = this;          
        Api(context, akun.indexProfile()).onSuccess(function(response) {
            context.dataRole = response.data.data[0].role;
        }).onError(function(error) {  
        })
        .call() 
      },
      getKecamatan(id_kota){
        let context = this;               
        Api(context, akun.getKecamatan({search: this.search})).onSuccess(function(response) {    
            context.tableKecamatan.data = response.data.data;
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.tableKecamatan.data = [];
            }
        })
        .call()
      },
      getKelurahan(){
        let context = this;             
        Api(context, akun.getKelurahan({kecamatan: context.akunData.kecamatan})).onSuccess(function(response) {    
            context.tableKelurahan.data = response.data.data;
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.tableKelurahan.data = [];
            }
        })
        .call()
      },
      getTps(){
        let context = this;             
        Api(context, akun.getTps({kelurahan: context.akunData.kelurahan})).onSuccess(function(response) {    
            context.tableTPS.data = response.data.data;
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.tableTPS.data = [];
            }
        })
        .call()
      },
      filter() {
        this.formFilter.add   = true;
        this.formFilter.show  = true;
        this.formFilter.title = "Filter";
        this.pagination.page  = 1 ;
      },
      create() {
          this.form.add   = true;
          this.form.show  = true;
          this.form.title = "Tambah Akun";
          this.akunData   = {}
      },
      edit(id) {
        let context = this;               
        Api(context, akun.show(id)).onSuccess(function(response) {
            context.akunData   = response.data.data[0];
            console.log(response.data.data)
            context.form.show  = true;
            context.form.title = 'Edit Data';                        
        })
        .call()        
      },
      save(){
        let api = null;
        let context = this;
        let formData = new FormData(); 
        context.onLoading = true;

        if (context.akunData.nama_lengkap != undefined && context.akunData.tgl_lahir != undefined && context.akunData.alamat_lengkap != undefined && context.akunData.no_ktp != undefined && context.akunData.no_hp != undefined && context.akunData.username != undefined && context.akunData.role != undefined) {
          formData.append('nama_lengkap', context.akunData.nama_lengkap);
          formData.append('tgl_lahir', context.akunData.tgl_lahir);
          formData.append('alamat_lengkap', context.akunData.alamat_lengkap);
          formData.append('no_ktp', context.akunData.no_ktp);
          formData.append('no_hp', context.akunData.no_hp);
          formData.append('username', context.akunData.username);
          formData.append('role', context.akunData.role);
          if (context.akunData.role != 'Saksi') {
            if (context.akunData.password != undefined) {
              formData.append('password', context.akunData.password);
            }else{
              context.onLoading = false;
              return alert('Password Wajib Di Isi')
            }
          }else{
            if (context.akunData.kecamatan != undefined && context.akunData.kelurahan != undefined && context.akunData.tps != undefined) {
              formData.append('kecamatan', context.akunData.kecamatan);
              formData.append('kelurahan', context.akunData.kelurahan);
              formData.append('tps', context.akunData.tps);
            }else{
              context.onLoading = false;
              return alert('Kecamatan, Kelurahan dan TPS Wajib Di Isi')
            }
          }
        }else{
          context.onLoading = false;
          return alert('Nama, Tgl Lahir, Alamat, No KTP, No HP, Username dan Role Wajib Di Isi')
        }

        if (context.form.title == 'Tambah Akun') {
            api = Api(context, akun.create(formData));
        } else {
            api = Api(context, akun.update(context.akunData.id, formData));
        }
        api.onSuccess(function(response) {
            context.get();
            context.form.show = false;
            context.notifyVue((context.formTitle === 'Add Data') ? 'Data Berhasil di Simpan' : 'Data Berhasil di Update', 'top', 'right', 'info')
        }).onError(function(error) {                    
            context.notifyVue((context.formTitle === 'Add Data') ? 'Data Gagal di Simpan' : 'Data Gagal di Update' , 'top', 'right', 'danger')
        }).onFinish(function() {  
          context.onLoading = false;
        })
        .call();
      },
      remove(id) {
          var r = confirm("Anda yakin ingin menghapus data ini ?");
          if (r == true) {
            let context = this;

            Api(context, akun.delete(id)).onSuccess(function(response) {
                context.get();
                context.notifyVue(response.data.message, 'top', 'right', 'info')
            }).call();
          }
      },
      changePage(page){
        this.pagination.page = page;
        this.get();
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
