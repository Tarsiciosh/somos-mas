import { BackofficeScreen } from '../backoffice/BackofficeScreen'
import { FormMembers } from '../FormMembers'
import UserList from '../backoffice/UserList'
import { ListMembers } from '../organization/ListMembers'
import NewsList from '../NewsList'
import CategoryForm from '../CategoryForm'
import { CategoryList } from '../backoffice/CategoryList'
import NoveltiesForm from '../NoveltiesForm'
import { PhotoForm } from '../PhotoForm'
import { ActivitiesForm } from '../activities/ActivitiesForm'
import { FormEditHome } from '../FormEditHome'
import SlidesList from '../backoffice/SlidesList'
import SlidesManagerForm from '../SlidesManagerForm'
import ActivitiesList from '../backoffice/ActivitiesList'
import TestimonialsList from '../backoffice/TestimonialsList'
import UserForm from '../UserForm'

export default [
    
    { path: '', component: BackofficeScreen },
    { path: '/members', component: ListMembers, principal: true, title: 'Miembros', color: 1 },
    { path: '/members/create', component: FormMembers },
    { path: '/members/create/:id', component: FormMembers },
    { path: '/users', component: UserList, principal: true, title: 'Usuarios', color: 2 },
    { path: '/users/create', component: UserForm },
    { path: '/users/create/:id', component: UserForm },
    { path: '/news', component: NewsList, principal: true, title: 'Novedades', color: 3 },
    { path: '/news/create', component: NoveltiesForm },
    { path: '/news/create/:id', component: NoveltiesForm },
    { path: '/categories', component: CategoryList, principal: true, title: 'Categorías', color: 1 },
    { path: '/categories/create', component: CategoryForm },
    { path: '/testimonials', component: TestimonialsList, principal: true, title: 'Testimonios', color: 2 },
    { path: '/testimonials/create', component: PhotoForm },
    { path: '/testimonials/edit/:id', component: PhotoForm },
    { path: '/activities', component: ActivitiesList, principal: true, title: 'Actividades', color: 3 },
    { path: '/activities/create', component: ActivitiesForm },
    { path: '/activities/edit/:id', component: ActivitiesForm },
    { path: '/home', component: FormEditHome, principal: true, title: 'Home', color: 1 },
    { path: '/slides', component: SlidesList, principal: true, title: 'Slides', color: 2 },
    { path: '/slides/create', component: SlidesManagerForm },
    { path: '/slides/create/:id', component: SlidesManagerForm }
    
]

