
import About from "../About/About";
import { Activities } from "../activities/Activities";
import ActivitiesDetail from "../activities/Detail/ActivitiesDetail";
import Donacion from "../donations/Donacion";
import Gracias from "../donations/Gracias";
import Index from "../home/Index";
import NewsDetail from "../News/Detail/NewsDetail";
import Novedades from "../Novedades";
import SignupForm from "../SignUpForm";
import UserForm from "../UserForm";
import Contacto from "../contact/Contacto";

export default [
    {path: '/', component: Index},
    
    {path: '/register', component: SignupForm},
    {path: '/novedades', component: Novedades},
    {path: '/nosotros', component: About},
    {path: '/user/create', component: UserForm},
    {path: '/donar', component: Donacion},
    {path: '/donar/gracias', component: Gracias},
    {path: '/activities', component: Activities},
    {path: '/activities/detail/:id', component: ActivitiesDetail},
    {path: '/novedades/detail/:id', component: NewsDetail},
    {path: '/contacto', component: Contacto}
]
