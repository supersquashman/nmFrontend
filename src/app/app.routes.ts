import { Routes } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { StaffComponent } from './staff/staff.component';
import { LinksComponent } from './links/links.component';
import { HomeComponent } from './home/home.component';
import { LscCalculatorComponent } from './lsc-calculator/lsc-calculator.component';
import { TrelloBoardComponent } from './trello-board/trello-board.component';
import { NmMapComponent } from './nm-map/nm-map.component';

export const routes: Routes = [
    // { path: '', component: AppComponent, pathMatch: 'prefix'} ,
    // { path: '', component: HomeComponent, pathMatch: 'full'} ,
    {path: '', redirectTo:'/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    // { path: '', component: HomeComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'links', component: LinksComponent },
    { path: 'staff', component: StaffComponent },
    { path: 'lsc-calculator', component:LscCalculatorComponent},
    { path: 'trello-board', component:TrelloBoardComponent},
    { path: 'nm-map', component:NmMapComponent}
];
