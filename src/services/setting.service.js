import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('setting/index', {params});
    },
    update(id, params) {
        return Service().post('setting/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    indexBanner(params) {
        return Service().get('setting/index-banner', {params});
    },
    createBanner(params) {
        return Service().post('setting/create-banner', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    updateBanner(id, params) {
        return Service().post('setting/update-banner/'+id, params);
    },
    deleteBanner(id) {
        return Service().post('setting/delete-banner/'+id);
    },
}