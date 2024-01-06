import Service from '@/helpers/service'

export default {

    index(params) {
        return Service().get('masa/index', {params});
    },
    indexAdmin(params) {
        return Service().get('masa/index-admin', {params});
    },
    show(id) {
        return Service().get('masa/show/'+id);
    },
    create(params) {
        return Service().post('masa/create', params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id, params) {
        return Service().post('masa/update/'+id, params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id) {
        return Service().post('masa/delete/'+id);
    },

    // ======================= REVIEW ============================
    reviewBymasa(id) {
        return Service().get('review/review-by-masa/'+id);
    },
    createReview(params) {
        return Service().post('review/create', params);
    },
}