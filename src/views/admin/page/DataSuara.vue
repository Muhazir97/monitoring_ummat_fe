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
                  <h4 class="card-title">Data Suara</h4>
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
                  <router-link  to="/detail-add-suara" v-if="dataRole == 'Saksi'">
                    <button type="submit" class="btn btn-sm btn-info btn-fill float-right" >
                      Add New
                    </button>
                  </router-link>
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
                      <th style="color: white;">No Urut</th>
                      <th style="color: white;">Nama Caleg</th>
                      <th style="color: white;">Kursi</th>
                      <th style="color: white;">Kecamatan</th>
                      <th style="color: white;">Kelurahan</th>
                      <th style="color: white;">TPS</th>
                      <th style="color: white;">Dapil</th>
                      <th style="color: white;">Total Suara</th>
                      <th style="color: white;">Bukti C1</th>
                      <th style="color: white;">Saksi</th>
                      <th style="color: white;">Tanggal Input</th>
                      <th style="display: none" ></th>
                    </tr>
                  </slot>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in table.data" :key="i">
                    <td style="font-size: 12px;">{{row.no_urut}}</td>
                    <td style="font-size: 12px;">{{row.nama_lengkap}}</td>
                    <td style="font-size: 12px;">{{row.kursi}}</td>
                    <td style="font-size: 12px;">{{row.kecamatan}}</td>
                    <td style="font-size: 12px;">{{row.kelurahan}}</td>
                    <td style="font-size: 12px;">{{row.tps}}</td>
                    <td style="font-size: 12px;">{{row.dapil}}</td>
                    <td style="font-size: 12px;" class="text-center">{{row.total_suara}}</td>
                    <td style="font-size: 13px; text-align: center; font-weight: bold;" v-if="row.bukti_c1">
                      <a :href="storageUrl+'/bukti_c1/'+row.bukti_c1" target="_BLANK">Klik Di Sini {{row.tps}}</a>
                    </td>
                    <td v-else></td>
                    <td style="font-size: 12px;" class="text-center">{{row.saksi}}</td>
                    <td style="font-size: 12px; width: 15%;">{{ moment(row.updated_at).locale('id').format('l') }}</td>
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

        <tabs fill class="flex-column flex-md-row">
        <!-- <card shadow> -->
            
          <!-- DPR RI -->
          <tab-pane key="dpr_ri">
              <template slot="title">
                  <i class="fa fa-users mr-2"></i>DPR RI
              </template>
              <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
                <template slot="header">
                  <div class="row">
                    <div class="col-2">
                    </div>
                    <div class="col-8 text-center">
                      <h5 class="card-title font-weight-bold"><u>GRAFIK SUARA DPR RI</u> </h5><br>
                    </div>
                    <div class="col-2">
                      <a :href="apiUrl+'print-daily-production-report?month='+Number(1)+''" target="_BLANK">
                        <button type="submit" class="btn btn-sm btn-success btn-fill float-right ml-2">
                          <i class="fa fa-file-text"></i> Print
                        </button>
                      </a>
                    </div>
                  </div>
                </template>
                <div class="container" >
                  <line-chart :chart-data="datacollection" :width="300" :height="120"></line-chart>
                </div>
              </card>

              <!-- TOTAL AKUMULASI PER CALEG -->
              <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive" >
                <template slot="header">
                  <div class="row">
                    <div class="col-2">
                    </div>
                    <div class="col-8 text-center">
                      <h5 class="card-title font-weight-bold" style="margin-bottom: -30px;">AKUMULASI SUARA DPR RI</h5><br>
                    </div>
                    <div class="col-2">
                    </div>
                  </div>
                </template>
                <div class="scroll">
                  <table  class="table table-striped" border="1">
                    <thead>
                      <slot name="columns">
                        <tr style="background-color: yellow;">
                          <th style="font-size: 12px; text-align: center; color: black;">NO Urut</th>
                          <th style="font-size: 12px; text-align: center; color: black;">Nama</th>
                          <th style="font-size: 12px; text-align: center; color: black;">Total Suara</th>
                          <th style="display: none"></th>
                        </tr>
                      </slot>
                    </thead>
                    <tbody>
                      <tr v-for="(row, i) in tableChartDprRi.data" :key="i">
                        <td style="font-size: 13px; text-align: center;">{{ row.no_urut }}</td>
                        <td style="font-size: 13px;">{{ row.nama_lengkap }}</td>
                        <td style="font-size: 13px;">{{ row.totalSuara }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </card>
          </tab-pane>

          <!-- DPRD PROVINSI -->
          <tab-pane key="dprd_provinsi" @click.native="getChartDprProv">
              <template slot="title">
                  <i class="fa fa-users mr-2"></i>DPRD PROVINSI
              </template>
              <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
                <template slot="header">
                  <div class="row">
                    <div class="col-2">
                    </div>
                    <div class="col-8 text-center">
                      <h5 class="card-title font-weight-bold"><u>GRAFIK SUARA DPRD PROVINSI</u> </h5><br>
                    </div>
                    <div class="col-2">
                      <a :href="apiUrl+'print-daily-production-report?month='+Number(1)+''" target="_BLANK">
                        <button type="submit" class="btn btn-sm btn-success btn-fill float-right ml-2">
                          <i class="fa fa-file-text"></i> Print
                        </button>
                      </a>
                    </div>
                  </div>
                </template>
                <div class="container" >
                  <line-chart :chart-data="datacollectionDprProv" :width="300" :height="120"></line-chart>
                </div>
              </card>

              <!-- TOTAL AKUMULASI PER CALEG -->
              <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive" >
                <template slot="header">
                  <div class="row">
                    <div class="col-2">
                    </div>
                    <div class="col-8 text-center">
                      <h5 class="card-title font-weight-bold" style="margin-bottom: -30px;">AKUMULASI SUARA DPRD PROVINSI</h5><br>
                    </div>
                    <div class="col-2">
                    </div>
                  </div>
                </template>
                <div class="scroll">
                  <table  class="table table-striped" border="1">
                    <thead>
                      <slot name="columns">
                        <tr style="background-color: blue;">
                          <th style="font-size: 12px; text-align: center; color: white;">NO Urut</th>
                          <th style="font-size: 12px; text-align: center; color: white;">Nama</th>
                          <th style="font-size: 12px; text-align: center; color: white;">Total Suara</th>
                          <th style="display: none"></th>
                        </tr>
                      </slot>
                    </thead>
                    <tbody>
                      <tr v-for="(row, i) in tableChartDprProv.data" :key="i">
                        <td style="font-size: 13px; text-align: center;">{{ row.no_urut }}</td>
                        <td style="font-size: 13px;">{{ row.nama_lengkap }}</td>
                        <td style="font-size: 13px;">{{ row.totalSuara }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </card>
          </tab-pane>

          <!-- DPRD KABUPATEN/KOTA -->
          <tab-pane key="drpd_kota">
              <template slot="title">
                  <i class="fa fa-users mr-2"></i>DPRD KABUPATEN/KOTA
              </template>
              <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
                <template slot="header">
                  <div class="row">
                    <div class="col-2">
                    </div>
                    <div class="col-8 text-center">
                      <h5 class="card-title font-weight-bold"><u>GRAFIK SUARA DPRD KABUPATEN/KOTA</u> </h5><br>
                    </div>
                    <div class="col-2">
                      <a :href="apiUrl+'print-daily-production-report?month='+Number(1)+''" target="_BLANK">
                        <button type="submit" class="btn btn-sm btn-success btn-fill float-right ml-2">
                          <i class="fa fa-file-text"></i> Print
                        </button>
                      </a>
                    </div>
                  </div>
                </template>
                <div class="container" >
                  <line-chart :chart-data="datacollectionDprKota" :width="300" :height="120"></line-chart>
                </div>
              </card>

              <!-- TOTAL AKUMULASI PER CALEG -->
              <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive" >
                <template slot="header">
                  <div class="row">
                    <div class="col-2">
                    </div>
                    <div class="col-8 text-center">
                      <h5 class="card-title font-weight-bold" style="margin-bottom: -30px;">AKUMULASI SUARA DPRD KABUPATEN/KOTA</h5><br>
                    </div>
                    <div class="col-2">
                    </div>
                  </div>
                </template>
                <div class="scroll">
                  <table  class="table table-striped" border="1">
                    <thead>
                      <slot name="columns">
                        <tr style="background-color: green;">
                          <th style="font-size: 12px; text-align: center; color: white;">NO Urut</th>
                          <th style="font-size: 12px; text-align: center; color: white;">Nama</th>
                          <th style="font-size: 12px; text-align: center; color: white;">Total Suara</th>
                          <th style="display: none"></th>
                        </tr>
                      </slot>
                    </thead>
                    <tbody>
                      <tr v-for="(row, i) in tableChartDprKota.data" :key="i">
                        <td style="font-size: 13px; text-align: center;">{{ row.no_urut }}</td>
                        <td style="font-size: 13px;">{{ row.nama_lengkap }}</td>
                        <td style="font-size: 13px;">{{ row.totalSuara }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </card>
          </tab-pane>
      <!-- </card> -->
    </tabs>
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
                    label="RW"
                    placeholder="RW"
                    v-model="dataWilayah.rw">
              </base-input>
              <base-input type="text"
                    label="RT"
                    placeholder="RT"
                    v-model="dataWilayah.rt">
              </base-input>
              <base-input type="text"
                    label="TPS"
                    placeholder="TPS"
                    v-model="dataWilayah.tps">
              </base-input>
             </div>
             <template slot="footer">
                 <base-button type="secondary mr-2" @click="form.show = false">Close</base-button>
                 <base-button type="primary" @click="save()">Save</base-button>
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
                    label="Nama Caleg"
                    placeholder="Nama Caleg"
                    v-on:keyup.enter="get()"
                    v-model="search.nama_caleg">
              </base-input>
              <div class="form-group">
                <label>Kursi</label><br>
                <select class="form-select form-control" aria-label="Default select example" v-model="search.kursi" v-on:keyup.enter="get()">
                  <option value="DPR RI">DPR RI</option>
                  <option value="DPRD PROVINSI">DPRD PROVINSI</option>
                  <option value="DPRD KABUPATEN/KOTA">DPRD KABUPATEN/KOTA</option>
                </select>
              </div>
              <base-input type="text"
                    label="Kecamatan"
                    placeholder="Kecamatan"
                    v-on:keyup.enter="get()"
                    v-model="search.kecamatan">
              </base-input>
              <base-input type="text"
                    label="Kelurahan"
                    placeholder="Kelurahan"
                    v-on:keyup.enter="get()"
                    v-model="search.kelurahan">
              </base-input>
              <base-input type="text"
                    label="TPS"
                    placeholder="TPS"
                    v-on:keyup.enter="get()"
                    v-model="search.tps">
              </base-input>
              <base-input type="text"
                    label="Saksi"
                    placeholder="Saksi"
                    v-on:keyup.enter="get()"
                    v-model="search.saksi">
              </base-input>
              <div class="form-group">
                <label>Status Suara</label><br>
                <select class="form-select form-control" aria-label="Default select example" v-model="search.status_suara" v-on:keyup.enter="get()">
                  <option value="Sudah Di Isi">Sudah Di Isi</option>
                  <option value="Belum Di Isi">Belum Di Isi</option>
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
  import Tabs from "@/components/Tabs/Tabs.vue";
  import TabPane from "@/components/Tabs/TabPane.vue";
  import LineChart from '../LineChart.js'
  import config from '@/configs/config';
  import Api from '@/helpers/api';
  import axios from 'axios';
  var moment = require('moment');
  import akun from '@/services/akun.service';
  import suara from '@/services/suara.service';
  
  export default {
    components: {
      Card,
      Modal,
      LineChart,
      Tabs,
      TabPane,
    },
    data () {
      return {
        pagination: {
          page_count: '',
          default: 1,
          page: '',
        },
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
        formFilter: {
            add: true,
            title: "Filter",
            show: false
        },
        dataWilayah: {}, 
        storageUrl : config.storageUrl,
        apiUrl :config.apiUrl,
        loadTimeout: null,
        search: {
          nama_caleg: '',
          kursi: '',
          kecamatan: '',
          kelurahan: '',
          tps: '',
          saksi: '',
          status_suara: '',
        },
        dataRole: '',

        tableChartDprRi: {
          data: []
        },
        tableChartDprProv: {
          data: []
        },
        tableChartDprKota: {
          data: []
        },
        datacollection: null,
        datacollectionDprProv: null,
        datacollectionDprKota: null,
      }
    },
    mounted(){
      this.get();
      this.getProfile();
    },
    methods: {
      get(param){
        let context = this;               
        Api(context, suara.index({nama_caleg: context.search.nama_caleg, kursi: context.search.kursi, kecamatan: context.search.kecamatan, kelurahan: context.search.kelurahan, tps: context.search.tps, saksi: context.search.saksi, status_suara: context.search.status_suara, page: context.pagination.page})).onSuccess(function(response) {    
            context.table.data            = response.data.data.data.data;
            context.pagination.page_count = response.data.data.data.last_page

            context.tableChartDprRi.data   = response.data.data.chartSuaraDprRi;
            context.tableChartDprProv.data = response.data.data.chartSuaraDprdProv;
            context.tableChartDprKota.data = response.data.data.chartSuaraDprdKab;

            context.fillData()
            context.fillDataDprProv()
            context.fillDataDprKota()
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.table.data = [];
            }
        })
        .call()
      },
      getProfile(){
        let context = this;     
        context.onLoading = true;          
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
        Api(context, suara.show(id)).onSuccess(function(response) {
            context.dataWilayah  = response.data.data[0];
            context.form.show  = true;
            context.form.title = 'Edit Data';                        
        })
        .call()        
      },
      save(){
        let api = null;
        let context = this;
        let formData = new FormData(); 

        if (this.dataWilayah.kota != undefined && this.dataWilayah.kecamatan != undefined && this.dataWilayah.kelurahan != undefined && this.dataWilayah.rw != undefined && this.dataWilayah.rt != undefined && this.dataWilayah.tps != undefined) {
          formData.append('kota', context.dataWilayah.kota);
          formData.append('kecamatan', context.dataWilayah.kecamatan);
          formData.append('kelurahan', context.dataWilayah.kelurahan);
          formData.append('rw', context.dataWilayah.rw);
          formData.append('rt', context.dataWilayah.rt);
          formData.append('tps', context.dataWilayah.tps);
        }else{
          alert('Field Berbintang Merah Wajib Di Isi')
        }

        if (context.form.title == 'Add Data') {
            api = Api(context, suara.create(formData));
        } else {
            api = Api(context, suara.update(this.dataWilayah.id, formData));
        }
        api.onSuccess(function(response) {
            context.get();
            context.form.show = false;
            context.notifyVue((context.formTitle === 'Add Data') ? 'Data Berhasil di Simpan' : 'Data Berhasil di Update', 'top', 'right', 'info')
        }).onError(function(error) {                    
            context.notifyVue((context.formTitle === 'Add Data') ? 'Data Gagal di Simpan' : 'Data Gagal di Update' , 'top', 'right', 'danger')
        }).onFinish(function() {  
        })
        .call();
      },
      remove(id) {
          var r = confirm("Anda yakin ingin menghapus data ini ?");
          if (r == true) {
            let context = this;

            Api(context, suara.delete(id)).onSuccess(function(response) {
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
      fillData () {
        this.datacollection = {
          labels: this.tableChartDprRi.data.map(item => item.nama_lengkap),
          datasets: [
            {
              label: '',
              backgroundColor: this.tableChartDprRi.data.map(item => '#' + Math.random().toString(16).substr(-6)),
              data: this.tableChartDprRi.data.map(item => item.totalSuara)
            }, 
          ]
        }
      },
      fillDataDprProv () {
        this.datacollectionDprProv = {
          labels: this.tableChartDprProv.data.map(item => item.nama_lengkap),
          datasets: [
            {
              label: '',
              backgroundColor: this.tableChartDprProv.data.map(item => '#' + Math.random().toString(16).substr(-6)),
              data: this.tableChartDprProv.data.map(item => item.totalSuara)
            }, 
          ]
        }
      },
      fillDataDprKota () {
        this.datacollectionDprKota = {
          labels: this.tableChartDprKota.data.map(item => item.nama_lengkap),
          datasets: [
            {
              label: '',
              backgroundColor: this.tableChartDprKota.data.map(item => '#' + Math.random().toString(16).substr(-6)),
              data: this.tableChartDprKota.data.map(item => item.totalSuara)
            }, 
          ]
        }
      },
    }
  }
</script>
<style lang='scss' scoped>
  @import "@/assets/scss/light-bootstrap-dashboard.scss";
</style>
