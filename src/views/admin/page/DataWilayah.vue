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
                  <h4 class="card-title">Data TPS</h4>
                  <!-- <p class="card-category">Here is a subtitle for this table</p> -->
                </div>
                <div class="col-4">
                </div>
                <div class="col-4">
                  <button type="submit" class="btn btn-sm btn-info btn-fill float-right mr-2" @click="create()" v-if="dataRole == 'Admin'">
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
                  <tr style="background-color: #DAA520;">
                    <th style="color: white;">Code</th>
                    <th style="color: white;">Kota</th>
                    <th style="color: white;">Kecamatan</th>
                    <th style="color: white;">Kelurahan</th>
                    <th style="color: white;">TPS</th>
                    <th style="color: white;">Dapil</th>
                    <th style="color: white;">Saksi</th>
                    <th v-if="dataRole == 'Admin'"></th>
                    <th style="display: none" ></th>
                  </tr>
                </slot>
              </thead>
              <tbody>
                <tr v-for="(row, i) in table.data" :key="i">
                  <td style="font-size: 12px;">{{row.code_wilayah}}</td>
                  <td style="font-size: 12px;">{{row.kota}}</td>
                  <td style="font-size: 12px;">{{row.kecamatan}}</td>
                  <td style="font-size: 12px;">{{row.kelurahan}}</td>
                  <td style="font-size: 12px;">{{row.tps}}</td>
                  <td style="font-size: 12px;">{{row.dapil}}</td>
                  <td style="font-size: 12px;">{{row.saksi}}</td>
                  <td class="text-center" v-if="dataRole == 'Admin'">
                    <i class="fa fa-edit" aria-hidden="true" style="cursor: pointer; margin-right: 20px;" @click="edit(row.id)" title="Edit"></i>
                    <i class="fa fa-trash-o" aria-hidden="true" title="Hapus" style="cursor: pointer;" @click="remove(row.id)"></i>
                  </td>
                  <td style="display: none" ></td>
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
                    label="Kota"
                    placeholder="Kota"
                    v-model="dataWilayah.kota">
              </base-input>
              <base-input type="text"
                    label="Kecamatan"
                    placeholder="Kecamatan"
                    v-model="dataWilayah.kecamatan">
              </base-input>
              <base-input type="text"
                    label="Kelurahan"
                    placeholder="Kelurahan"
                    v-model="dataWilayah.kelurahan">
              </base-input>
              <base-input type="text"
                    label="TPS"
                    placeholder="TPS"
                    v-model="dataWilayah.tps">
              </base-input>
              <base-input type="text"
                    label="Dapil"
                    placeholder="Dapil"
                    v-model="dataWilayah.dapil">
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
              <base-input type="text"
                    label="Dapil"
                    placeholder="Dapil"
                    v-model="search.dapil">
              </base-input>
              <base-input type="text"
                    label="Saksi"
                    placeholder="Saksi"
                    v-model="search.saksi">
              </base-input>
              <div class="form-group">
                <label>Status Saksi</label><br>
                <select class="form-select form-control" aria-label="Default select example" v-model="search.status_saksi">
                  <option value="Ada">Ada</option>
                  <option value="Tidak Ada">Tidak Ada</option>
                </select>
              </div>

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
  import axios from 'axios';
  import akun from '@/services/akun.service';
  import wilayah from '@/services/wilayah.service';
  
  export default {
    components: {
      Card,
      Modal
    },
    data () {
      return {
        pagination: {
          page_count: '',
          default: 1,
          page: '',
        },
        onLoading: false,
        table: {
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
        dataWilayah: {}, 
        storageUrl : config.storageUrl,
        loadTimeout: null,
        search: {
          kecamatan: '',
          kelurahan: '',
          tps: '',
          dapil: '',
          saksi: '',
          status_saksi: '',
        },
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
        Api(context, wilayah.index({kecamatan: context.search.kecamatan, kelurahan: context.search.kelurahan, tps: context.search.tps, dapil: context.search.dapil, saksi: context.search.saksi, status_saksi: context.search.status_saksi, page: context.pagination.page})).onSuccess(function(response) {    
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
      filter() {
        this.formFilter.add   = true;
        this.formFilter.show  = true;
        this.formFilter.title = "Filter";
        this.pagination.page  = 1 ;
      },
      create() {
          this.form.add   = true;
          this.form.show  = true;
          this.form.title  = "Add Data";
          this.dataWilayah = {}
      },
      edit(id) {
        let context = this;               
        Api(context, wilayah.show(id)).onSuccess(function(response) {
            context.dataWilayah = response.data.data[0];
            context.form.show   = true;
            context.form.title  = 'Edit Data';                        
        })
        .call()        
      },
      save(){
        let api = null;
        let context = this;
        let formData = new FormData(); 
        context.onLoading = true;

        if (this.dataWilayah.kota != undefined && this.dataWilayah.kecamatan != undefined && this.dataWilayah.kelurahan != undefined && this.dataWilayah.tps != undefined) {
          formData.append('kota', context.dataWilayah.kota);
          formData.append('kecamatan', context.dataWilayah.kecamatan);
          formData.append('kelurahan', context.dataWilayah.kelurahan);
          formData.append('tps', context.dataWilayah.tps);
          formData.append('dapil', context.dataWilayah.dapil);
        }else{
          alert('Field Berbintang Merah Wajib Di Isi')
        }

        if (context.form.title == 'Add Data') {
            api = Api(context, wilayah.create(formData));
        } else {
            api = Api(context, wilayah.update(this.dataWilayah.id, formData));
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

            Api(context, wilayah.delete(id)).onSuccess(function(response) {
                context.notifyVue(response.data.message, 'top', 'right', 'info')
                context.get();
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
