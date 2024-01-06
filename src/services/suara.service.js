import Service from '@/helpers/service'

export default {

    // suaraByArea(params) {
    //     return Service().get('suara/suara-by-area', {params});
    // },
    // barangByAreaCategory(params) {
    //     return Service().get('suara/suara-by-area-category', {params});
    // },
    index(params) {
        return Service().get('suara/index-admin', {params});
    },
    show(id) {
        return Service().get('suara/show/'+id);
    },
    create(params) {
        return Service().post('suara/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('suara/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('suara/delete/'+id);
    },
    detailAddSuara(params) {
        return Service().get('suara/get-detail-add-suara', {params});
    },
    updateSuara(id, params) {
        return Service().post('suara/update-suara/'+id, params);
    },
    uploadc1(id, params) {
        return Service().post('suara/upload-c1/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
}