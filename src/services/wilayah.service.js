import Service from '@/helpers/service'

export default {

    // wilayahByArea(params) {
    //     return Service().get('wilayah/wilayah-by-area', {params});
    // },
    // barangByAreaCategory(params) {
    //     return Service().get('wilayah/wilayah-by-area-category', {params});
    // },
    index(params) {
        return Service().get('wilayah/index-admin', {params});
    },
    show(id) {
        return Service().get('wilayah/show/'+id);
    },
    create(params) {
        return Service().post('wilayah/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('wilayah/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('wilayah/delete/'+id);
    },
}