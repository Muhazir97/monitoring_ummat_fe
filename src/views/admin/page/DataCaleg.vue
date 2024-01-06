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
                  <h4 class="card-title">Data Caleg</h4>
                  <!-- <p class="card-category">Here is a subtitle for this table</p> -->
                </div>
                <div class="col-4">
                  <base-input type="text"
                            placeholder="Search"
                            v-model="search"
                            v-on:keyup="filter"
                            size="small">
                  </base-input>
                </div>
                <div class="col-4">
                  <button type="submit" class="btn btn-sm btn-info btn-fill float-right" @click="create()" v-if="dataRole == 'Admin'">
                    Add New
                  </button>
                </div>
              </div>
            </template>
            <div class="scroll">
              <table class="table table-striped">
                <thead>
                  <slot name="columns">
                    <tr style="background-color: #DAA520;">
                      <th style="color: white;">Code</th>
                      <th style="color: white;">No Urut</th>
                      <th style="color: white;">Nama Lengkap</th>
                      <th style="color: white;">Kursi</th>
                      <th style="color: white;">Dapil</th>
                      <th style="color: white;">Kecamatan</th>
                      <th v-if="dataRole == 'Admin'"></th>
                      <th style="display: none" ></th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in table.data" :key="i">
                    <td style="font-size: 12px;">{{row.code_caleg}}</td>
                    <td style="font-size: 12px;">{{row.no_urut}}</td>
                    <td style="font-size: 12px;">{{row.nama_lengkap}}</td>
                    <td style="font-size: 12px;">{{row.kursi}}</td>
                    <td style="font-size: 12px;">{{row.dapil}}</td>
                    <td style="font-size: 12px;">{{row.kecamatan}}</td>
                    <!-- <td style="font-size: 12px;"><a :href="storageUrl+'/image_user/'+row.image" target="_BLANK">Klik Here</a></td> -->
                    <td class="text-center" v-if="dataRole == 'Admin'">
                      <i class="fa fa-edit" aria-hidden="true" style="cursor: pointer; margin-right: 20px;" @click="edit(row.id)" title="Edit"></i>
                      <i class="fa fa-trash-o" aria-hidden="true" title="Hapus" style="cursor: pointer;" @click="remove(row.id)"></i>
                    </td>
                    <td style="display: none" ></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </card>
        </div>

        <!-- MODAL CREATE -->
        <div>
           <modal :show.sync="form.show">
             <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">{{form.title}}</h5>
             </template>
             <div>
              <base-input type="number"
                    label="No Urut"
                    placeholder="No Urut"
                    v-model="dataCaleg.no_urut">
              </base-input>
              <base-input type="text"
                    label="Nama Lengkap"
                    placeholder="Nama Lengkap"
                    v-model="dataCaleg.nama_lengkap">
              </base-input>
              <base-input type="text"
                    label="Kursi"
                    placeholder="Kursi"
                    v-model="dataCaleg.kursi">
              </base-input>
              <base-input type="text"
                    label="Dapil"
                    placeholder="Dapil"
                    v-model="dataCaleg.dapil">
              </base-input>
              <base-input type="text"
                    label="Kecamatan"
                    placeholder="Kecamatan"
                    v-model="dataCaleg.kecamatan">
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

      </div>
    </div>
  </div>
</template>
<script>
  import Card from '@/components/Cards/Card.vue'
  import Modal from '@/components/Modal.vue'
  import config from '@/configs/config';
  import Api from '@/helpers/api';
  import axios from 'axios';
  import akun from '@/services/akun.service';
  import caleg from '@/services/caleg.service';
  
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
        form: {
            add: true,
            title: "Add Data",
            show: false
        },
        dataCaleg: {}, 
        storageUrl : config.storageUrl,
        loadTimeout: null,
        search: '',
        dataRole: '',
      }
    },
    mounted(){
      this.get();
      this.getProfile();
    },
    methods: {
      get(param){
        let context = this;               
        Api(context, caleg.index({search: this.search})).onSuccess(function(response) {    
            context.table.data = response.data.data.data.data;
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
      filter() {
        clearTimeout(this.loadTimeout);
        this.loadTimeout = setTimeout(() => {
            this.get()
        }, 100);
      },
      create() {
          this.form.add   = true;
          this.form.show  = true;
          this.form.title  = "Add Data";
          this.dataCaleg = {}
      },
      edit(id) {
        let context = this;               
        Api(context, caleg.show(id)).onSuccess(function(response) {
            context.dataCaleg  = response.data.data[0];
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

        if (this.dataCaleg.no_urut != undefined && this.dataCaleg.nama_lengkap != undefined && this.dataCaleg.kursi != undefined && this.dataCaleg.dapil != undefined && this.dataCaleg.kecamatan != undefined) {
          formData.append('no_urut', context.dataCaleg.no_urut);
          formData.append('nama_lengkap', context.dataCaleg.nama_lengkap);
          formData.append('kursi', context.dataCaleg.kursi);
          formData.append('dapil', context.dataCaleg.dapil);
          formData.append('kecamatan', context.dataCaleg.kecamatan);
        }else{
          alert('Field Berbintang Merah Wajib Di Isi')
        }

        if (context.form.title == 'Add Data') {
            api = Api(context, caleg.create(formData));
        } else {
            api = Api(context, caleg.update(this.dataCaleg.id, formData));
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

            Api(context, caleg.delete(id)).onSuccess(function(response) {
                context.notifyVue(response.data.message, 'top', 'right', 'info')
                context.get();
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
