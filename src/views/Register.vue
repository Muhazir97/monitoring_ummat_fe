<template>
    <section class="section section-lg my-0" style="background-image: url('img/brand/bg_login.png'); background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),">
        <div class="shape shape-style-1 bg-gradient-green">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card style="background: linear-gradient(to right, #0000FF, #FF8C00)" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-center text-muted mb-4">
                                <h5 style="color: white; font-weight: bold;" shadow>Form Register</h5>
                            </div>
                            <form role="form">
                                <label for="example-text-input" class="form-control-label text-white">Nama Lengkap <span style="color: red;">*</span></label>
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Nama Lengkap"
                                            v-model="akun.nama_lengkap"
                                            addon-left-icon="ni ni-hat-3">
                                </base-input>
                                <label for="example-text-input" class="form-control-label text-white">NIK <span style="color: red;">*</span></label>
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="NIK"
                                            v-model="akun.nik"
                                            addon-left-icon="ni ni-badge">
                                </base-input>
                                <label for="example-text-input" class="form-control-label text-white">Alamat Lengkap <span style="color: red;">*</span></label>
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Alamat Lengkap"
                                            v-model="akun.alamat_lengkap"
                                            addon-left-icon="ni ni-map-big">
                                </base-input>
                                <label for="example-text-input" class="form-control-label text-white">Provinsi <span style="color: red;">*</span></label>
                                <base-input addon-left-icon="ni ni-istanbul">
                                    <select class="form-control form-control-alternative" v-model="idProivinsi" @change="getKota(idProivinsi)">
                                      <option selected>Provinsi</option>
                                      <option :value="row.id" v-for="(row, i) in table.data">{{row.nama}}</option>
                                    </select>
                                </base-input>
                                <label for="example-text-input" class="form-control-label text-white">Kota / Kabupaten <span style="color: red;">*</span></label>
                                <base-input addon-left-icon="ni ni-building">
                                    <select class="form-control form-control-alternative" v-model="akun.kota">
                                      <option selected>Kota / Kabupaten</option>
                                      <option :value="row.nama" v-for="(row, i) in tableKota.data">{{row.nama}}</option>
                                    </select>
                                </base-input>
                                <label for="example-text-input" class="form-control-label text-white">Jabatan <span style="color: red;">*</span></label>
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Jabatan"
                                            v-model="akun.jabatan"
                                            addon-left-icon="ni ni-briefcase-24">
                                </base-input>
                                <label for="example-text-input" class="form-control-label text-white">Username <span style="color: red;">*</span></label>
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Username"
                                            v-model="akun.username"
                                            addon-left-icon="ni ni-single-02">
                                </base-input>
                                <label for="example-text-input" class="form-control-label text-white">Password <span style="color: red;">*</span></label>
                                <base-input alternative
                                            type="password"
                                            placeholder="Password"
                                            v-model="akun.password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="save()">Daftar</base-button>
                                </div>
                                <div class="text-center text-muted mb-4">
                                    <small><router-link :to="'/login'" class="nav-link nav-link-icon text-white" rel="noopener" data-toggle="tooltip" title="Login">Sudah punya akun ? Login di sini</router-link></small>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import Api from '@/helpers/api';
    import akun from '@/services/akun.service';
    import axios from 'axios';

    export default {
        data () {
          return {
            table: {
              data: []
            },
            tableKota: {
              data: []
            },
            form: {
                add: true,
                title: "Add Data",
                show: false
            },
            akun: {}, 
            idProivinsi: ''
          }
        },
        mounted(){
            this.getKota()
        },
        methods: {
            // getProvinsi(){
            //     axios.get("https://dev.farizdotid.com/api/daerahindonesia/provinsi").then(response => {
            //         this.table.data = response.data.provinsi
            //     })
            //     .catch(err => {
            //         if (err.response.status == 404) {
            //              this.table.data = [];
            //         }
            //     })
            // },
            getKota(id_provinsi){
                // ambil nama provinsi
                // axios.get("https://dev.farizdotid.com/api/daerahindonesia/provinsi/"+id_provinsi).then(response => {
                //     this.akun.provinsi = response.data.nama
                //     console.log(response.data.nama)
                // })
                // .catch(err => {
                // })

                axios.get("https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi="+id_provinsi).then(response => {
                    this.tableKota.data = response.data.kota_kabupaten
                })
                .catch(err => {
                    if (err.response.status == 404) {
                        this.tableKota.data = [];
                    }
                })
            },
            save(){
                let api = null;
                let context = this;
                let formData = new FormData(); 

                formData.append('nama_lengkap', this.akun.nama_lengkap);
                formData.append('nik', this.akun.nik);
                formData.append('alamat_lengkap', this.akun.alamat_lengkap);
                formData.append('provinsi', this.akun.provinsi);
                formData.append('kota', this.akun.kota);
                formData.append('jabatan', this.akun.jabatan);
                formData.append('username', this.akun.username);
                formData.append('password', this.akun.password);

                api = Api(context, akun.create(formData));
                api.onSuccess(function(response) {
                    context.akun = {}
                    context.notifyVue('Registrasi Sukses', 'top', 'right', 'info')
                }).onError(function(error) {                    
                    context.notifyVue('Registrasi Gagal', 'top', 'right', 'danger')
                }).onFinish(function() {  
                })
                .call();
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
    };
</script>
<style>
</style>
