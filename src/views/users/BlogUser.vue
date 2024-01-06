<template>
    <div>
      <div class="gap"></div>

        <section class="section section-lg pt-lg-0 mt-5">
            <div class="container" style="margin-top: 90px;">
                <div class="row justify-content-center">
                    <div class="col-lg-12 mt-5 shadow">
                        <div class="card">
                          <!-- CONTENT -->
                          <div style="margin-top: 50px;">
                            <div v-for="(row, index) in table.data" :key="index">
                              <div class="row">
                                <div class="col-lg-7 col-sm-6">
                                  <router-link :to="'/detail-blog/'+row.id">
                                    <h4><b>{{ row.judul }}</b></h4>
                                  </router-link>
                                  <h6 style="color: gray" v-html="row.deskripsi.substring(0,100)+'...'"></h6>
                                  <p style="margin-top: 50px;">By {{ row.created_by +', '+ moment(row.created_at).locale('id').format('LL') }}</p>
                                </div>
                                <div class="col-lg-5 col-sm-6">
                                  <div class="">
                                    <router-link :to="'/detail-blog/'+row.id"><img :src="loadImage(row.gambar)" class="rounded" width="330" height="200" /></router-link>
                                  </div>
                                </div>
                              </div>
                              <hr style="margin-top: 20px; margin-bottom: 20px;">
                            </div>
                          </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
  import Api from '@/helpers/api';
  import config from '@/configs/config';
  import blog from '@/services/blog.service';
  import Modal from "@/components/Modal.vue";
  import bus from '@/eventBus';
  var moment = require('moment');

export default {
  name: "home",
  components: {
    Modal
  },
  data() {
      return {
        moment:moment,
        table: {
          data: []
        },
      };
  },
  mounted(){
    this.get();
  },
  methods: {
      get(param){
          let context = this;               
          Api(context, blog.index({search_invoice: context.search_invoice})).onSuccess(function(response) {    
            console.log(response.data.data.data.data)
              context.table.data = response.data.data.data.data;
          }).onError(function(error) {                    
              if (error.response.status == 404) {
                  context.table.data = [];
              }
          })
          .call()
      },
      loadImage(image) {
         return config.storageUrl+'/image_blog/'+image;
      },
    }
};
</script>
