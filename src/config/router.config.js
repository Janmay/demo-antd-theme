import Loadable from 'react-loadable';
import PageLoading from '@/components/PageLoading';
const routes = [
    {
        path: '/',
        component: () => import('@/layouts/BasicLayout'),
        routes: [
            {
                name: '仪表盘',
                icon: 'dashboard',
                path: '/dashboard',
                component: null,
                routes: [
                    {
                        name: '分析页',
                        path: '/dashboard/analysis',
                        component: () => import('@/pages/Dashboard/Analysis'),
                    }
                ]
            }
        ]
    }
];

const formatter = (routes) => {
    return routes.map(r => {
        if (r.component) {
            r.component = Loadable({
                loader: r.component,
                loading: PageLoading,
                delay: 300
            });
        }
        r.routes && formatter(r.routes);
        return r;
    });
}

export default formatter(routes);