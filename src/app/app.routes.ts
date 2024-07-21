import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminsComponent } from './pages/admins/admins.component';
import { UsersComponent } from './pages/users/users.component';
import { OperatorsComponent } from './pages/operators/operators.component';
import { BillingComponent } from './pages/billing/billing.component';
import { DispatchedComponent } from './pages/dispatched/dispatched.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { ReportComponent } from './pages/report/report.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent,
        pathMatch: "full"
    },
    {
        path:'home',
        component: HomeComponent,
        pathMatch: "full"
    },
    {
        path:'admins',
        component: AdminsComponent,
        pathMatch:"full"
    },
    {
        path:'users',
        component: UsersComponent,
        pathMatch:"full"
    },
    {
        path:'operators',
        component: OperatorsComponent,
        pathMatch:"full"
    },
    {
        path:'billing',
        component: BillingComponent,
        pathMatch:"full"
    },
    {
        path:'dispatched',
        component: DispatchedComponent,
        pathMatch:"full"
    },
    {
        path:'orders',
        component: OrdersComponent,
        pathMatch:"full"
    },
    {
        path:'products',
        component: ProductsComponent,
        pathMatch:"full"
    },
    {
        path:'report',
        component: ReportComponent,
        pathMatch:"full"
    }
];
