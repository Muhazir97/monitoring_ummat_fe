import Service from '@/helpers/service'

export default {

    anggotaByArea(params) {
        return Service().get('anggota/anggota-by-area', {params});
    },
    barangByAreaCategory(params) {
        return Service().get('anggota/anggota-by-area-category', {params});
    },
    index(params) {
        return Service().get('anggota/index-admin', {params});
    },
    show(id) {
        return Service().get('anggota/show/'+id);
    },
    create(params) {
        return Service().post('anggota/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('anggota/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('anggota/delete/'+id);
    },
}