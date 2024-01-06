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
                  <h4 class="card-title">Blog</h4>
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
                  <button type="submit" class="btn btn-sm btn-info btn-fill float-right" @click="create()">
                    Add New
                  </button>
                </div>
              </div>
            </template>
            <table class="table">
              <thead>
                <slot name="columns">
                  <tr>
                    <th>Judul</th>
                    <th>Deskripsi Singkat</th>
                    <th>Image</th>
                    <th>Detail Content</th>
                    <th></th>
                  </tr>
                </slot>
              </thead>
              <tbody>
                <tr v-for="(row, i) in table.data" :key="i">
                  <td style="font-size: 13px;">{{row.judul}}</td>
                  <td style="font-size: 13px;">{{row.deskripsi}}</td>
                  <td style="font-size: 13px;"><a :href="storageUrl+'/image_blog/'+row.gambar" target="_BLANK">Klik Here</a></td>
                  <td style="font-size: 13px;"><router-link :to="'/detail-blog/'+row.id">Detail Content</router-link></td>
                  <td>
                    <i class="fa fa-trash-o mr-2" aria-hidden="true" title="Hapus" style="cursor: pointer;" @click="remove(row.id)"></i>
                    <i class="fa fa-edit" aria-hidden="true" style="cursor: pointer;" @click="edit(row.id)" title="Edit"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </card>
        </div>

        <!-- MODAL CREATE -->
        <div>
           <modal :show.sync="form.show" size="medium">
             <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel">{{form.title}}</h5>
             </template>
             <div>
              <base-input type="text"
                    label="Judul"
                    placeholder="Judul"
                    v-model="blog.judul">
              </base-input>
              <base-input type="text"
                    label="Deskripsi Singkat"
                    placeholder="Deskripsi Singkat"
                    v-model="blog.deskripsi">
              </base-input>
              <base-input type="file"
                    label="Image Header"
                    placeholder="Image Header"
                    @change="filesChangeImage">
              </base-input>
              <base-input type="text"
                    label="Detail Content"
                    placeholder="Detail Content">
                    <ckeditor :editor="editor" v-model="blog.detail" :config="editorConfig"></ckeditor>
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
  import blog from '@/services/blog.service';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import MyUploadAdapter from "./MyUploadAdapter.js";
  
  export default {
    components: {
      Card,
      Modal
    },
    data () {
      return {
        editor: ClassicEditor,
        editorConfig: {
            table: {
                toolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
            },
            extraPlugins: [this.onReady]
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
        blog: {}, 
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
        Api(context, blog.index({search: this.search})).onSuccess(function(response) {    
            context.table.data = response.data.data.data.data;
        }).onError(function(error) {                    
            if (error.response.status == 404) {
                context.table.data = [];
            }
        })
        .call()
      },
      onReady(editor) {
         // Customize upload picture plugin
        editor.plugins.get("FileRepository").createUploadAdapter = loader => {
          return new MyUploadAdapter(loader);
        };
      },
      filesChangeImage(e) {
          this.blog.gambar = e.target.files[0];
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
          this.form.title  = "Tambah Data";
          this.blog = {}
      },
      edit(id) {
        let context = this;               
        Api(context, blog.show(id)).onSuccess(function(response) {
            context.blog       = {}
            context.blog       = response.data.data;
            context.form.show  = true;
            context.form.title = 'Update Data';                        
        })
        .call()        
      },
      save(){
        let api = null;
        let context = this;
        let formData = new FormData(); 

        if (this.blog.judul != undefined && this.blog.deskripsi != undefined && this.blog.gambar != undefined) {
          formData.append('judul', this.blog.judul);
          formData.append('deskripsi', this.blog.deskripsi);
          formData.append('gambar', this.blog.gambar);
          formData.append('detail', this.blog.detail);
        }else{
          alert('Field Berbintang Merah Wajib Di Isi')
        }

        if (context.form.title == 'Tambah Data') {
            api = Api(context, blog.create(formData));
        } else {
            api = Api(context, blog.update(context.blog.id, formData));
        }
        api.onSuccess(function(response) {
            context.get();
            context.form.show = false;
            context.notifyVue((context.form.title === 'Tambah Data') ? 'Data Berhasil di Simpan' : 'Data Berhasil di Update', 'top', 'right', 'info')
        }).onError(function(error) {                    
            context.notifyVue((context.form.title === 'Update Data') ? 'Data Gagal di Simpan' : 'Data Gagal di Update' , 'top', 'right', 'danger')
        }).onFinish(function() {  
        })
        .call();
      },
      remove(id) {
          var r = confirm("Anda yakin ingin menghapus data ini ?");
          if (r == true) {
            let context = this;

            Api(context, blog.delete(id)).onSuccess(function(response) {
                context.get();
                context.notifyVue(response.data.message, 'top', 'right', 'info')
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
