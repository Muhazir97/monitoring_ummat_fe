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
                  <h4 class="card-title">Data Masa</h4>
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
                  <tr>
                      <th>Foto</th>
                      <th>Nama</th>
                      <th>NIK</th>
                      <th>Alamat</th>
                      <th>Tanggal Lahir</th>
                      <th>Created At</th>
                      <th></th>
                      <th></th>
                      <th style="display: none"></th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(row, i) in table.data" :key="i" style="font-size: 12px;">
                      <td style="width: 10%;"><img :src="storageUrl+'foto_masa/'+row.foto" width="100px" ></td>
                      <td>{{row.nama_lengkap}}</td>
                      <td>{{row.nik}}</td>
                      <td>{{row.alamat}}</td>
                      <td>{{ moment(row.tanggal_lahir).locale('id').format('LL') }}</td>
                      <td style="width: 15%;">{{ moment(row.created_at).locale('id').format('LL') }}</td>
                      <td><i class="fa fa-trash-o" aria-hidden="true" style="cursor: pointer;" @click="removeMasa(row.id)" title="Hapus"></i></td>
                      <td><i class="fa fa-edit" aria-hidden="true" style="cursor: pointer;" @click="editMasa(row.id)" title="Edit"></i></td>
                      <td style="display: none"></td>
                  </tr>
              </tbody>
              <table>
                  <tbody>
                      
                  </tbody>
              </table>
          </table>
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
                    v-model="akun.nama_lengkap">
              </base-input>
              <base-input type="text"
                    label="Alamat Lengkap"
                    placeholder="Alamat Lengkap"
                    v-model="akun.alamat_lengkap">
              </base-input>
              <base-input type="text"
                    label="Provinsi"
                    placeholder="Provinsi"
                    v-model="akun.provinsi">
              </base-input>
              <base-input type="text"
                    label="Kota"
                    placeholder="Kota"
                    v-model="akun.kota">
              </base-input>
              <base-input type="text"
                    label="NIK"
                    placeholder="NIK"
                    v-model="akun.nik">
              </base-input>
              <base-input type="text"
                    label="Jabatan"
                    placeholder="Jabatan"
                    v-model="akun.jabatan">
              </base-input>
              <base-input type="text"
                    label="Username"
                    placeholder="Username"
                    v-model="akun.username">
              </base-input>
              <base-input type="text"
                    label="Password"
                    placeholder="Password"
                    v-model="akun.password">
              </base-input>
             </div>
             <template slot="footer">
                 <base-button type="secondary mr-2" @click="form.show = false">Close</base-button>
                 <base-button type="primary" @click="save()">Save</base-button>
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
  import masa from '@/services/masa.service';
  var moment = require('moment');
  
  export default {
    components: {
      Card,
      Modal
    },
    data () {
      return {
        moment:moment,
        onLoading: false,
        table: {
          data: []
        },
        form: {
            add: true,
            title: "Add Data",
            show: false
        },
        akun: {}, 
        storageUrl : config.storageUrl,
        loadTimeout: null,
        search: '',
      }
    },
    mounted(){
      this.get();
    },
    methods: {
      get(param){
        let context = this;               
        Api(context, masa.indexAdmin({search: this.search})).onSuccess(function(response) {    
            context.table.data = response.data.data.data.data;
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.table.data = [];
            }
        })
        .call()
      },
      filter() {
        clearTimeout(this.loadTimeout);
        this.loadTimeout = setTimeout(() => {
            this.get()
        }, 100);
      },
      create() {
          this.form.add   = true;
          this.form.show  = true;
          this.form.title  = "Tambah Akun Admin";
          this.akun = {}
      },
      save(){
        let api = null;
        let context = this;
        let formData = new FormData(); 

        // if (this.dataAdmin.username != undefined && this.dataAdmin.email != undefined && this.dataAdmin.password != undefined) {
          formData.append('nama_lengkap', this.akun.nama_lengkap);
          formData.append('alamat_lengkap', this.akun.alamat_lengkap);
          formData.append('kota', this.akun.kota);
          formData.append('provinsi', this.akun.provinsi);
          formData.append('nik', this.akun.nik);
          formData.append('jabatan', this.akun.jabatan);
          formData.append('username', this.akun.username);
          formData.append('password', this.akun.password);
          formData.append('role', 'Admin');
        // }else{
        //   alert('Field Berbintang Merah Wajib Di Isi')
        // }

        if (context.form.title == 'Tambah Akun Admin') {
            api = Api(context, akun.create(formData));
        } else {
            api = Api(context, akun.update(this.akun.id, formData));
        }
        api.onSuccess(function(response) {
            context.get();
            context.form.show = false;
            alert(response.data.message)
            // context.notifyVue((context.formTitle === 'Add Data') ? 'Data Berhasil di Simpan' : 'Data Berhasil di Update', 'top', 'right', 'info')
        }).onError(function(error) {                    
            // context.notifyVue((context.formTitle === 'Add Data') ? 'Data Gagal di Simpan' : 'Data Gagal di Update' , 'top', 'right', 'danger')
        }).onFinish(function() {  
        })
        .call();
      },
      remove(id) {
          var r = confirm("Anda yakin ingin menghapus data ini ?");
          if (r == true) {
            let context = this;

            Api(context, akun.delete(id)).onSuccess(function(response) {
                context.get();
                alert(response.data.message)
            }).call();
          }
      },
    }
  }
</script>
<style lang='scss' scoped>
  @import "@/assets/scss/light-bootstrap-dashboard.scss";
</style>
