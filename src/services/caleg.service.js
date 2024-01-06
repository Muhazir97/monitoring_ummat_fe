import Service from '@/helpers/service'

export default {

    // calegByArea(params) {
    //     return Service().get('caleg/caleg-by-area', {params});
    // },
    // barangByAreaCategory(params) {
    //     return Service().get('caleg/caleg-by-area-category', {params});
    // },
    index(params) {
        return Service().get('caleg/index-admin', {params});
    },
    show(id) {
        return Service().get('caleg/show/'+id);
    },
    create(params) {
        return Service().post('caleg/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('caleg/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('caleg/delete/'+id);
    },
}