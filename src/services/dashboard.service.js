import Service from '@/helpers/service'

export default {

	getAllCard() {
        return Service().get('dashboard/get-all-card');
    },
    getChartPresiden() {
        return Service().get('dashboard/get-chart-presiden');
    },
    getChartDprProv() {
        return Service().get('dashboard/get-chart-dpr-prov');
    },
    getChartDprKota() {
        return Service().get('dashboard/get-chart-dpr-kota');
    },
}