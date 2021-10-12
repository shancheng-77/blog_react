import Article from "../views/article";
import Essay from "../views/essay";
import Materials from "../views/materials";
import Other from "../views/other";
import Content from "../views/content";
import Tags from "../views/tags"
// 导出路由
export const mainRouter = [{
    name:'主页',
    icon:'iconiconset0120',
    path:'/main',
    key:'main',
    component:Article,
    exact:true,
    isShow:true,
    side:'main'
},
//     {
//     name:'随笔',
//     icon:'iconwendang',
//     key:'essay',
//     path: '/main/essay',
//     component: Essay,
//     exact:true,
//     isShow: true,
//     side:'main'
// },
    {
    name:'资料',
    key:'materials',
    icon:'icon-_ziliao',
    path: "/main/materials",
    component: Materials,
    isShow: true,
    side:'main'
},{
    name:'项目',
    key:'project',
    icon:'iconqita',
    path: '/main/project',
    component: Other,
    isShow: true,
    side:'main'
},{
    path: '/main/classification',
    component: Tags,
    side:'articles'
},{
    path:'/main/articles/:id',
    component:Content,
    side:'articles'
}]
