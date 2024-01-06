import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('blog/index-admin', {params});
    },
    create(params) {
        return Service().post('blog/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('blog/delete/'+id);
    },
    show(id) {
        return Service().get('blog/show/'+id);
    },
    update(id, params) {
        return Service().post('blog/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    
    indexProfile() {
        return Service().get('akun/index-profile');
    },
    getProvinsi() {
        return Service().get('akun/get-provinsi');
    },
    getKota(params) {
        return Service().get('akun/get-kota', {params});
    },
    deleteMitra(id) {
        return Service().post('akun/delete-mitra/'+id);
    },
}