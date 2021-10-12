//layout
import LayoutAdmin from "../Layouts/LayoutAdmin";
import LayoutBasic from "../Layouts/LayoutBasic";
import Admin from "../pages/Admin";

//Admin Pages
import AdminHome from "../pages/Admin";
import AdminSingnIn from "../pages/Admin/SignIn/SingnIn";


//pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";

//others
import Error404 from "../pages/Error404";

const routes = [
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes:[
            {
                path:"/admin",
                component: AdminHome,
                exact: true
            },
            {
                path:"/admin/login",
                component: AdminSingnIn,
                exact: true
            },
            {
                component: Error404,
            },
        ],
    },
    {
        path:"/",
        component:LayoutBasic,
        exact:false,
        routes: [
            {
                path:"/",
                component: Home,
                exact:true
            },
            {
                path:"/contact",
                component: Contact,
                exact:true
            },
            {
                component: Error404,
            },
        ],
    },
];

export default routes;