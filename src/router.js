import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
// =================== USER =====================
import Beranda from "./views/users/Beranda.vue";
import DetailBlog from "./views/users/DetailBlog.vue";
import Anggota from "./views/users/Anggota.vue";
import Bantuan from "./views/users/Bantuan.vue";
import SyaratPengguna from "./views/users/SyaratPengguna.vue";
import PanduanTransaksi from "./views/users/PanduanTransaksi.vue";
import BlogUser from "./views/users/BlogUser.vue";

// import Catalog from "./views/users/Catalog.vue";

// =================== ADMIN =====================
import DashboardLayout from "./views/admin/DashboardLayout";
import DataCaleg from './views/admin/page/DataCaleg.vue'
import DetailAddSuara from './views/admin/page/DetailAddSuara.vue'
import DataWilayah from './views/admin/page/DataWilayah.vue'
import DataSuara from './views/admin/page/DataSuara.vue'
import AllAccount from './views/admin/page/AllAccount.vue'



import Overview from './views/admin/Overview.vue'
import Setting from './views/admin/page/Setting.vue'
import AnggotaAdmin from './views/admin/page/AnggotaAdmin.vue'
import MasaAdmin from './views/admin/page/MasaAdmin.vue'

import Blog from './views/admin/page/Blog.vue'
import Management from './views/admin/page/Management.vue'
import TableList from './views/admin/TableList.vue'

Vue.use(Router);

const vurRouter = new Router({
  linkExactActiveClass: "active",
  mode: 'history',
  routes: [
  // =================== USER =====================
    {
      path: "/beranda",
      name: "beranda",
      components: {
        header: AppHeader,
        default: Beranda,
        footer: AppFooter
      }
    },
    {
      path: "/anggota",
      name: "anggota",
      components: {
        header: AppHeader,
        default: Anggota,
        footer: AppFooter
      }
    },
    {
      path: "/detail-blog/:id",
      name: "detail-blog",
      components: {
        header: AppHeader,
        default: DetailBlog,
        footer: AppFooter
      }
    },
    {
      path: "/",
      name: "login",
      components: {
        // header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      }
    },
    {
      path: "/bantuan",
      name: "bantuan",
      components: {
        header: AppHeader,
        default: Bantuan,
        footer: AppFooter
      }
    },
    {
      path: "/syarat-pengguna",
      name: "SyaratPengguna",
      components: {
        header: AppHeader,
        default: SyaratPengguna,
        footer: AppFooter
      }
    },
     {
      path: "/panduan-transaksi",
      name: "PanduanTransaksi",
      components: {
        header: AppHeader,
        default: PanduanTransaksi,
        footer: AppFooter
      }
    },

// =================== ADMIN =====================
   {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    name: 'Dashboard Layout',
    children: [
      {
        path: 'dashboard',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'data-caleg',
        name: 'DataCaleg',
        component: DataCaleg
      },
      {
        path: 'detail-add-suara',
        name: 'DetailAddSuara',
        component: DetailAddSuara
      },
      {
        path: 'data-wilayah',
        name: 'DataWilayah',
        component: DataWilayah
      },
      {
        path: 'data-suara',
        name: 'DataSuara',
        component: DataSuara
      },




      {
        path: 'blog',
        name: 'Blog',
        component: Blog
      },
      {
        path: 'data-anggota',
        name: 'AnggotaAdmin',
        component: AnggotaAdmin
      },
      {
        path: 'data-masa',
        name: 'MasaAdmin',
        component: MasaAdmin
      },
      {
        path: 'all-account',
        name: 'AllAccount',
        component: AllAccount
      },
      {
        path: 'setting',
        name: 'Setting',
        component: Setting
      },
    ]
  },
  // { path: '*', component: NotFound },

  // =================== GENERAL =====================
    {
      path: "/components",
      name: "components",
      components: {
        header: AppHeader,
        default: Components,
        footer: AppFooter
      }
    },
    {
      path: "/landing",
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter
      }
    },
],

  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

vurRouter.beforeEach((to, from, next) => {
  const publicPages = ['login', 'landing', 'beranda', 'anggota', 'bantuan','SyaratPengguna','PanduanTransaksi','detail-blog'];
  const authRequired = !publicPages.includes(to.name);
  const authenticated = JSON.parse(localStorage.getItem('authenticated'));  

  if (authRequired && !authenticated) {
      alert('Session Kamu Habis Ayo Login Lagi !!!')
      return next({
          name: 'login',
          query: {redirect: to.fullPath}
      });
  }

  if (authenticated) {
      const auth = JSON.parse(authenticated);
      if (to.name == 'login') {
          return next({
              name: 'Overview'
          });
      }
      if (to.name != 'Relogin') {
          if (auth.expired) {
              alert('Session Kamu Habis Ayo Login Lagi !!!')
              localStorage.removeItem('token');
              localStorage.setItem('authenticated', false)  
              return next({
                  name: 'login'
              });
          }
      }
  }
  next();
})


export default vurRouter;
