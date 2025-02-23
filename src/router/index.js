import {createRouter, createWebHistory} from 'vue-router'
import administrator_login from "../pages/administrator_login.vue";
import index from "../pages/index.vue";
import Users from "../pages/indexs/users/users.vue";
import identifications from "../pages/indexs/identifications/identifications.vue";
import records from "../pages/indexs/records.vue";
import Current from "../pages/indexs/current.vue";
import IdentificationInfo from "../pages/indexs/identifications/identification-info.vue";
import UserInfo from "../pages/indexs/users/user-info.vue";
import restrictions from "../pages/indexs/restrictions/restrictions.vue";
import RestrictionInfo from "../pages/indexs/restrictions/restriction-info.vue";

const routes = [
    {
        name: "Login",
        path: '/admin/login',
        component: administrator_login
    },
    {
        name: "Index",
        path: '/admin/index',
        component: index,
        children: [
            {
                name: 'Current Administrator',
                path: 'current',
                component: Current
            },
            {
                name: "Users",
                path: "users",
                component: Users,
                children: [
                    {
                        name: 'User Info',
                        path: 'info',
                        component: UserInfo
                    }
                ]
            },
            {
                name: "Identifications",
                path: "identifications",
                component: identifications,
                children: [
                    {
                        name: 'Identification Info',
                        path: 'info',
                        component: IdentificationInfo
                    }
                ]
            },
            {
              name: "Restrictions",
              path: "restrictions",
              component: restrictions,
                children: [
                    {
                        name: "Restriction Info",
                        path: "info",
                        component: RestrictionInfo
                    }
                ]
            },
            {
                name: "Records",
                path: "records",
                component: records
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export function is_current_path_equals(target) {
    const current = router.currentRoute.value.path
    return is_path_equals(current, target)
}

export function is_path_equals(a, b) {
    if (b.endsWith("/")) {
        if (a === b.slice(0, -1)) {
            return true
        }
    } else {
        if (a === b) {
            return true
        }
    }
}

export default router