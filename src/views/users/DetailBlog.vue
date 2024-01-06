<template>
    <div>
      <div class="gap"></div>

        <section class="section section-lg pt-lg-0 mt-5">
            <div class="container" style="margin-top: 90px;">
                <div class="row justify-content-center">
                    <div class="col-lg-12 mt-5 shadow">
                        <!-- <div class="card"> -->
                          <!-- CONTENT -->
                          <div class="mt-5">
                            <h4><b> {{ detailBlog.judul_kegiatan }} </b></h4>
                            <p>{{ detailBlog.created_by +', '+ moment(detailBlog.created_at).locale('id').format('LL') }}</p>
                            <div>
                              <img :src="storageUrl+'foto_kegiatan/'+detailBlog.foto" class="img-fluid" />
                            </div>
                            <div style="margin-top: 20px; margin-bottom: 50px;" v-html="detailBlog.deskripsi_kegiatan" ></div>
                            <div style="margin-top: 20px; margin-bottom: 50px;" v-if="detailBlog.vidio">
                              <p style="font-weight: bold;">Galeri Vidio Kegiatan</p>
                            
                              <video class="img-fluid" controls>
                                <source :src="storageUrl+'vidio_kegiatan/'+detailBlog.vidio" type="video/mp4">
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          </div>

                        <!-- </div> -->
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
  import Api from '@/helpers/api';
  import config from '@/configs/config';
  import barang from '@/services/barang.service';
  import Modal from "@/components/Modal.vue";
  import bus from '@/eventBus';
  import axios from 'axios';
  var moment = require('moment');

export default {
  name: "home",
  components: {
    Modal
  },
  data() {
      return {
        moment:moment,
        detailBlog: {},
        storageUrl : config.storageUrl,
      };
  },
  mounted(){
    this.get();
  },
  methods: {
      get(){
        var id = this.$route.params.id

        axios.get(config.apiUrl +"blog/show/"+id )
        .then(response => {
          this.detailBlog = response.data.data[0]
        })
        .catch(err => {
           alert("Terjadi error server")
        })
      },
    }
};
</script>
