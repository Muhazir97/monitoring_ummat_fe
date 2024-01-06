<template>
  <div class="container-fluid mt-5">
    <card>

      <!-- ========================= JOB INFORMATION ===============================  -->
      <div class="text-center display-6">
        <span style="margin-bottom: -20px; font-weight: bold;">DETAIL INPUT SUARA</span>
        <!-- <a v-if="role != 'Visitor'" :href="apiUrl+'print-job-order/'+jobRequestData.job_no" target="_BLANK">
          <button type="submit" class="btn btn-sm btn-success btn-fill float-right">
            <i class="fa fa-file-text"></i> Print
          </button>
        </a> -->
        <hr style="margin-top: 10px;">
      </div>
      <div class="row">
        <div class="col-6">
          <h5 slot="header" class="card-title">Informasi Saksi</h5>
        </div>
        <div class="col-6 mb-3">
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-sm table-bordered">
            <tbody>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="150">Nama Saksi</td>
                    <td colspan="3">{{ dataSaksi.nama_lengkap }}</td>
                    <td style="display: none"></td>
                </tr>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="130">NO KTP</td>
                    <td>{{ dataSaksi.no_ktp }}</td>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="130">TPS</td>
                    <td>{{ dataSaksi.tps }}</td>
                </tr>
                <tr>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="130">Kecamatan</td>
                    <td>{{ dataSaksi.kecamatan }}</td>
                    <td style="background-color: #F0F8FF; font-weight: bold;" width="130">Kelurahan</td>
                    <td>{{ dataSaksi.kelurahan }}</td>
                </tr>
            </tbody>
        </table>
      </div>
      <div>
        <p class="display-6 text-center" style="margin-bottom: 5px; font-weight: bold; margin-top: 30px;"><u> PRESIDEN </u></p>
        <div class="scroll">
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
              <tr v-for="(row, i) in tableAddPresiden.data" :key="i">
                <td style="font-size: 12px;"> {{ row.no_urut }} </td>
                <td style="font-size: 12px;"> {{ row.nama_lengkap }} </td>
                <td style="font-size: 12px;"> 
                  <input class="form-control small"
                   type="number" 
                   placeholder="Masukkan Total Suara" 
                   :value="row.total_suara"
                   @change="updateSuara(row.id)">
                 </td>
                <td style="display: none"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="display-6 text-center" style="margin-bottom: 5px; font-weight: bold; margin-top: -190px;"><u> PARTAI UMMAT </u></p>
        <div class="scroll">
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
              <tr v-for="(row, i) in tableAddPartai.data" :key="i">
                <td style="font-size: 12px;"> {{ row.no_urut }} </td>
                <td style="font-size: 12px;"> {{ row.nama_lengkap }} </td>
                <td style="font-size: 12px;"> 
                  <input class="form-control small"
                   type="number" 
                   placeholder="Masukkan Total Suara" 
                   :value="row.total_suara"
                   @change="updateSuara(row.id)">
                 </td>
                <td style="display: none"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="display-6 text-center" style="margin-bottom: 5px; font-weight: bold; margin-top: -350px;"><u> DPR RI </u></p>
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
              <tr v-for="(row, i) in tableAddDprRi.data" :key="i">
                <td style="font-size: 12px;"> {{ row.no_urut }} </td>
                <td style="font-size: 12px;"> {{ row.nama_lengkap }} </td>
                <td style="font-size: 12px;"> 
                  <input class="form-control small"
                   type="number" 
                   placeholder="Masukkan Total Suara" 
                   :value="row.total_suara"
                   @change="updateSuara(row.id)">
                 </td>
                <td style="display: none"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="display-6 text-center" style="margin-bottom: 5px; font-weight: bold; margin-top: -50px;"><u> DPRD PROVINSI </u></p>
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
              <tr v-for="(row, i) in tableAddDprdProv.data" :key="i">
                <td style="font-size: 12px;"> {{ row.no_urut }} </td>
                <td style="font-size: 12px;"> {{ row.nama_lengkap }} </td>
                <td style="font-size: 12px;"> 
                  <input class="form-control small"
                   type="number" 
                   placeholder="Masukkan Total Suara" 
                   :value="row.total_suara"
                   @change="updateSuara(row.id)">
                  </td>
                </td>
                <td style="display: none"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="display-6 text-center" style="margin-bottom: 5px; font-weight: bold; margin-top: -160px;"><u> DPRD DPRD KABUPATEN/KOTA </u></p>
        <div class="scroll" style="margin-bottom: 0px;">
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
              <tr v-for="(row, i) in tableAddDprdKab.data" :key="i">
                <td style="font-size: 12px;"> {{ row.no_urut }} </td>
                <td style="font-size: 12px;"> {{ row.nama_lengkap }} </td>
                <td style="font-size: 12px;"> 
                  <input class="form-control small"
                   type="number" 
                   placeholder="Masukkan Total Suara" 
                   :value="row.total_suara"
                   @change="updateSuara(row.id)">
                  </td>
                </td>
                <td style="display: none"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="display-3 text-center" style="margin-bottom: 5px; font-weight: bold; margin-top: -160px; color: red; font-weight: bold;"><u> UPLOAD C1 </u></p>
        <div class="scroll">
          <table  class="table table-striped" border="1">
            <thead>
              <slot name="columns">
                <tr style="background-color: red;">
                  <th style="font-size: 12px; text-align: center; color: white;">Upload C1</th>
                  <th style="display: none"></th>
                </tr>
              </slot>
            </thead>
            <tbody>
              <tr>
                <td style="font-size: 12px;"> 
                  <base-input alternative
                      type="file"
                      accept="image/*"
                      class="mb-3"
                      placeholder="Upload C1"
                      @change="filesChange"
                      addon-left-icon="ni ni-image">
                  </base-input>
                 </td>
                <td style="display: none"></td>
              </tr>
              <tr>
               <td style="font-size: 13px; text-align: center; font-weight: bold;"><a :href="storageUrl+'/bukti_c1/'+dataC1.bukti_c1" target="_BLANK">{{ dataC1.bukti_c1 }}</a></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </card>
  </div>
</template>
<script>
  import Card from '@/components/Cards/Card.vue'
  import Modal from '@/components/Modal.vue'
  import config from '@/configs/config';
  import Api from '@/helpers/api';
  import Autocomplete from 'vue2-autocomplete-js'
  require('vue2-autocomplete-js/dist/style/vue2-autocomplete.css')
  import Tabs from "@/components/Tabs/Tabs.vue";
  import TabPane from "@/components/Tabs/TabPane.vue";
  var moment = require('moment');
  import suara from '@/services/suara.service';

  export default {
    components: {
      Card,
      Modal,
      Autocomplete,
      Tabs,
      TabPane,
    },
    data () {
      return {
        moment:moment,
        form: {
            add: true,
            title: "Add Material",
            show: false
        },
        formAttach: {
            add: true,
            title: "Add Material",
            show: false
        },
        dataSaksi: {},
        dataC1: {},
        tableAddPresiden: {
          data: []
        },
        tableAddPartai: {
          data: []
        },
        tableAddDprRi: {
          data: []
        },
        tableAddDprdProv: {
          data: []
        },
        tableAddDprdKab: {
          data: []
        },
        apiUrl :config.apiUrl,
        storageUrl : config.storageUrl,
        tokenApi : '',
        role: '',
        bukti_c1: '',

        material_code: '',
      }
    },
    mounted(){
      this.get();
      this.tokenApi = 'Bearer '+localStorage.getItem('token');
      this.role     = localStorage.getItem('role');
    },
    methods: {
      get(){
        let context = this; 
        Api(context, suara.detailAddSuara()).onSuccess(function(response) {
            context.dataSaksi              = response.data.data.dataSaksi; 
            context.dataSaksi.code_wilayah = response.data.data.getCodWil;
            if (response.data.data.dataC1 != null) {
              context.dataC1                 = response.data.data.dataC1;      
            } 
            context.tableAddPresiden.data = response.data.data.addPresiden;             
            context.tableAddPartai.data   = response.data.data.addPartai;             
            context.tableAddDprRi.data    = response.data.data.addDprRi;             
            context.tableAddDprdProv.data = response.data.data.addDprdProv;             
            context.tableAddDprdKab.data  = response.data.data.addDprdKab;          
        })
        .onError(function(error) {                    
            context.dataSaksi             = {};      
            context.dataC1                = '';      
            context.tableAddPresiden.data = [];             
            context.tableAddPartai.data   = [];             
            context.tableAddDprRi.data    = [];             
            context.tableAddDprdProv.data = [];             
            context.tableAddDprdKab.data  = [];
        })
        .call() 
      },
      updateSuara(id_suara){
        let api         = null;
        let context     = this;
        let total_suara = event.target.value

        api = Api(context, suara.updateSuara(id_suara, {total_suara : total_suara}));
        api.onSuccess(function(response) {
            context.notifyVue('Berhasil Upload C1', 'top', 'right', 'info')
        }).onError(function(error) { 
            context.notifyVue('Gagal Upload C1', 'top', 'right', 'danger')
        }).onFinish(function() {  
        })
        .call();
      },
      filesChange(e) {
          this.bukti_c1 = e.target.files[0];
          this.uploadc1();
      },
      uploadc1() {
          let api = null;
          let context = this;
          let formData = new FormData(); 

          formData.append('bukti_c1', this.bukti_c1);

          api = Api(context, suara.uploadc1(this.dataSaksi.code_wilayah, formData));
          api.onSuccess(function(response) {
              context.notifyVue('C1 Berhasil di Upload', 'top', 'right', 'info')
          }).onError(function(error) {    
              context.notifyVue('C1 Gagal di Update, C1 harus format jpg, jpeg atau png' , 'top', 'right', 'danger')
          }).onFinish(function() {  
            context.get();
          })
          .call();     
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
      // ================= Autocomplete ============
      // AMBIL DATA YANG DI PILIH AC
      getData(obj){
        this.material_code = obj.material_code;
      },
      // AMBIL DATA DARI API AC
      processJSON(json) {
        return json.data
      },
    }
  }

</script>
<style lang='scss' scoped>
  ::placeholder {
    color: #DCDCDC;
    padding-top: 10px;
    padding-left: 14px;
  }
</style>
