import navTools from '@/assets/js/navTools';

/** @type { import('vue-router').RouteConfig[] } */
const routes = [];

// 提取工具列表信息，添加到路由
for (let categoryName in navTools) {

    const toolList = (navTools[categoryName].list || []);

    toolList.forEach((toolItem) => {
        const {
            name: toolName = null,
            component = null,
            title = '未知',
            update = '',
            version = '',
        } = toolItem;

        if (toolName === null || component === null) {
            console.warn('部分小工具未设置工具名称或组件名称。');
            return;
        }

        routes.push({
            path: `/tool/${toolName}`,
            name: `Tool${component}`,
            meta: {
                loadingBar: true,
                title,
                update,
                version,
            },
            component: () => import(`@/views/Tools/${component}.vue`)
        });
    });

}

export default routes;
