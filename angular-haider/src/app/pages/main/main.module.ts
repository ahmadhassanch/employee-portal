import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material_module/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CCGeneralTableComponent } from 'src/app/shared/cc-general-table/cc-general-table.component';
import { GeneralTableComponent } from '../general-table/general-table.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'dash-board', component: DashBoardComponent },
      { path: 'categories', component: CategoriesComponent },
    ],
  },
];
@NgModule({
  declarations: [
    MainComponent,
    TopBarComponent,
    HomeComponent,
    ProductsComponent,
    CategoriesComponent,
    DashBoardComponent,
    SideBarComponent,
    CCGeneralTableComponent,
    GeneralTableComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class MainModule {}
