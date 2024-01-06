import Service from '@/helpers/service'

export default {

    barangByArea(params) {
        return Service().get('barang/barang-by-area', {params});
    },
    barangByAreaCategory(params) {
        return Service().get('barang/barang-by-area-category', {params});
    },
    index(params) {
        return Service().get('kegiatan/index-admin', {params});
    },
    show(id) {
        return Service().get('kegiatan/show/'+id);
    },
    create(params) {
        return Service().post('kegiatan/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('kegiatan/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('kegiatan/delete/'+id);
    },
}