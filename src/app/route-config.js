import List from './view/list.vue';

function config(router) {
    router.map({
        '*': {
            name: 'home',
            component: List
        },
        '/list': {
            name: 'list',
            component: List
        }
    });
}

export default config;