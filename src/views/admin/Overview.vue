<template>
  <div class="content">
    <div class="container-fluid">
        <!-- <a :href="apiUrl+'report-all'" target="_BLANK" class="btn btn-sm btn-primary mb-4"><i class="fa fa-download fa-sm"></i> Generate Report</a> -->
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card class="shadow">
            <div slot="header" class="icon-warning">
              <i class="fa fa-user-secret text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Jumlah Suara</p>
              <h4 class="card-title">{{ jumlah_suara }}</h4>
            </div>
            <div slot="footer">
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card class="shadow">
            <div slot="header" class="icon-success">
              <i class="fa fa-users text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Jumlah Caleg</p>
              <h4 class="card-title">{{jumlah_caleg}}</h4>
            </div>
            <div slot="footer">
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card class="shadow">
            <div slot="header" class="icon-danger">
              <i class="fa fa-cubes text-info"></i>
            </div>
            <div slot="content">
              <p class="card-category">Jumlah TPS</p>
              <h4 class="card-title">{{jumlah_tps}}</h4>
            </div>
            <div slot="footer">
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card class="shadow">
            <div slot="header" class="icon-info">
              <i class="fa fa-user text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Jumlah Saksi</p>
              <h4 class="card-title">{{jumlah_saksi}}</h4>
            </div>
            <div slot="footer">
            </div>
          </stats-card>
        </div>

      </div>

      <!-- TOTAL AKUMULASI PARTAI -->
      <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive" >
        <template slot="header">
          <div class="row">
            <div class="col-2">
            </div>
            <div class="col-8 text-center">
              <h5 class="card-title font-weight-bold" style="margin-bottom: -30px;">AKUMULASI SUARA PARTAI</h5><br>
            </div>
            <div class="col-2">
            </div>
          </div>
        </template>
        <div>
          <table  class="table table-striped" border="1">
            <thead>
              <slot name="columns">
                <tr style="background-color: #DAA520;">
                  <th style="font-size: 12px; text-align: center; color: white;">NO Urut</th>
                  <th style="font-size: 12px; text-align: center; color: white;">Nama</th>
                  <th style="font-size: 12px; text-align: center; color: white;">Total Suara</th>
                  <th style="display: none"></th>
                </tr>
              </slot>
            </thead>
            <tbody>
              <tr v-for="(row, i) in tableChartPartai.data" :key="i">
                <td style="font-size: 13px; text-align: center;">{{ row.no_urut }}</td>
                <td style="font-size: 13px;">{{ row.nama_lengkap }}</td>
                <td style="font-size: 13px;">{{ row.totalSuara }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </card>
      

      <tabs fill class="flex-column flex-md-row">
        <!-- <card shadow> -->
            
            <!-- PRESIDEN -->
            <tab-pane key="presiden">
                <template slot="title">
                    <i class="fa fa-users mr-2"></i>PRESIDEN
                </template>
                <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive">
                  <template slot="header">
                    <div class="row">
                      <div class="col-2">
                      </div>
                      <div class="col-8 text-center">
                        <h5 class="card-title font-weight-bold"><u>GRAFIK SUARA PRESIDEN</u> </h5><br>
                      </div>
                      <div class="col-2">
                        <!-- <a :href="apiUrl+'print-daily-production-report?month='+Number(month + 1)+''" target="_BLANK">
                          <button type="submit" class="btn btn-sm btn-success btn-fill float-right ml-2">
                            <i class="fa fa-file-text"></i> Print
                          </button>
                        </a> -->
                      </div>
                    </div>
                  </template>
                  <div class="container" >
                    <line-chart :chart-data="datacollectionPresiden" :width="300" :height="120"></line-chart>
                  </div>
                </card>

                <!-- TOTAL AKUMULASI PER CALEG -->
                <card class="strpied-tabled-with-hover shadow" body-classes="table-full-width table-responsive" >
                  <template slot="header">
                    <div class="row">
                      <div class="col-2">
                      </div>
                      <div class="col-8 text-center">
                        <h5 class="card-title font-weight-bold" style="margin-bottom: -30px;">AKUMULASI SUARA PRESIDEN</h5><br>
                      </div>
                      <div class="col-2">
                      </div>
                    </div>
                  </template>
                  <div>
                    <table  class="table table-striped" border="1">
                      <thead>
                        <slot name="columns">
                          <tr style="background-color: #A9A9A9;">
                            <th style="font-size: 12px; text-align: center; color: white;">NO Urut</th>
                            <th style="font-size: 12px; text-align: center; color: white;">Nama</th>
                            <th style="font-size: 12px; text-align: center; color: white;">Total Suara</th>
                            <th style="display: none"></th>
                          </tr>
                        </slot>
                      </thead>
                      <tbody>
                        <tr v-for="(row, i) in tableChartPresiden.data" :key="i">
                          <td style="font-size: 13px; text-align: center;">{{ row.no_urut }}</td>
                          <td style="font-size: 13px;">{{ row.nama_lengkap }}</td>
                          <td style="font-size: 13px;">{{ row.totalSuara }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </card>
            </tab-pane>

            <!-- DPR RI -->
            <tab-pane key="dpr_ri" @click="getChartDprProv()">
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
                        <!-- <a :href="apiUrl+'print-daily-production-report?month='+Number(month + 1)+''" target="_BLANK">
                          <button type="submit" class="btn btn-sm btn-success btn-fill float-right ml-2">
                            <i class="fa fa-file-text"></i> Print
                          </button>
                        </a> -->
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
                  <div>
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
                        <!-- <a :href="apiUrl+'print-daily-production-report?month='+Number(month + 1)+''" target="_BLANK">
                          <button type="submit" class="btn btn-sm btn-success btn-fill float-right ml-2">
                            <i class="fa fa-file-text"></i> Print
                          </button>
                        </a> -->
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
                  <div>
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
                        <!-- <a :href="apiUrl+'print-daily-production-report?month='+Number(month + 1)+''" target="_BLANK">
                          <button type="submit" class="btn btn-sm btn-success btn-fill float-right ml-2">
                            <i class="fa fa-file-text"></i> Print
                          </button>
                        </a> -->
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
                  <div>
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
      </div>
    </div>
  </div>
</template>
<script>
  import ChartCard from '@/components/Cards/ChartCard.vue'
  import StatsCard from '@/components/Cards/StatsCard.vue'
  import LTable from '@/components/Table.vue'
  import Tabs from "@/components/Tabs/Tabs.vue";
  import TabPane from "@/components/Tabs/TabPane.vue";
  import LineChart from './LineChart.js'
  import Api from '@/helpers/api';
  import dashboard from '@/services/dashboard.service';
  import config from '@/configs/config';

  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard,
      LineChart,
      Tabs,
      TabPane,
    },
    data () {
      return {
        jumlah_suara : '',
        jumlah_caleg : '',
        jumlah_tps : '',
        jumlah_saksi : '',
        jumlah_transaksi : '',
        tableChartPartai: {
          data: []
        },
        tableChartDprRi: {
          data: []
        },
        tableChartPresiden: {
          data: []
        },
        tableChartDprProv: {
          data: []
        },
        tableChartDprKota: {
          data: []
        },
        datacollection: null,
        datacollectionPresiden: null,
        datacollectionDprProv: null,
        datacollectionDprKota: null,
        apiUrl :config.apiUrl,
     }
    },
    mounted(){
      this.getAllCard();
      this.getChartPresiden();
      this.getChartDprProv();
      this.getChartDprKota();
    },
    methods: {
      getAllCard(){
        let context = this;               
        Api(context, dashboard.getAllCard()).onSuccess(function(response) {    
            context.jumlah_suara = response.data.data.jumlahSuara;
            context.jumlah_caleg = response.data.data.jumlahCaleg;
            context.jumlah_tps   = response.data.data.jumlahTps;
            context.jumlah_saksi = response.data.data.jumlahSaksi;

            context.tableChartPartai.data = response.data.data.chartSuaraPartai;
            context.tableChartDprRi.data  = response.data.data.chartSuaraDprRi;

            context.fillData()
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.jumlah_suara  = [];
                context.jumlah_caleg     = [];
                context.jumlah_tps = [];
            }
        })
        .call()
      },
      getChartPresiden(){
        let context = this;               
        Api(context, dashboard.getChartPresiden()).onSuccess(function(response) {    
            context.tableChartPresiden.data = response.data.data;

            context.fillDataPresiden()
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.tableChartPresiden = [];
            }
        })
        .call()
      },
      getChartDprProv(){
        let context = this;               
        Api(context, dashboard.getChartDprProv()).onSuccess(function(response) {    
            context.tableChartDprProv.data = response.data.data;

            context.fillDataDprProv()
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.tableChartDprProv = [];
            }
        })
        .call()
      },
      getChartDprKota(){
        let context = this;               
        Api(context, dashboard.getChartDprKota()).onSuccess(function(response) {    
            context.tableChartDprKota.data = response.data.data;

            context.fillDataDprKota()
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.tableChartDprKota = [];
            }
        })
        .call()
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
      fillDataPresiden () {
        this.datacollectionPresiden = {
          labels: this.tableChartPresiden.data.map(item => item.nama_lengkap),
          datasets: [
            {
              label: '',
              backgroundColor: this.tableChartPresiden.data.map(item => '#' + Math.random().toString(16).substr(-6)),
              data: this.tableChartPresiden.data.map(item => item.totalSuara)
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