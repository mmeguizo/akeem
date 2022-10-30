import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbCardModule,
  NbBadgeModule,
  NbTabsetModule,
  NbTooltipModule,
  NbDatepickerModule,
  NbWindowModule,
  NbCheckboxModule,
  NbDialogModule,
  NbInputModule,
  NbPopoverModule,
  NbCalendarModule
} from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

// import { ThemeModule } from '../@theme/theme.module';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { ImageCropperModule } from 'ngx-image-cropper';
// import { NgApexchartsModule } from "ng-apexcharts";


// import { CreateWarehouseComponent } from './warehouse/modals/create-warehouse/create-warehouse.component';
// import { ViewStorageComponent } from './warehouse/modals/view-storage/view-storage.component';
// import { CreateStorageComponent } from './warehouse/modals/create-storage/create-storage.component';
// import { AllWarehousesComponent } from './warehouse/all-warehouses/all-warehouses.component';
// import { ViewStoragesComponent } from './warehouse/view-storages/view-storages.component';
// import { ViewInventoryComponent } from './dashboard/view-inventory/view-inventory.component';
// import { AllProductsComponent } from './warehouse/all-products/all-products.component';
// import { ReportsComponent } from './reports/reports.component';
// import { UpdateWarehouseComponent } from './warehouse/modals/update-warehouse/update-warehouse.component';
// import { DialogComponent } from './components/dialog/dialog.component';
// import { UpdateStorageComponent } from './warehouse/modals/update-storage/update-storage.component';
// import { ProductComponent } from './product/product.component';
// import { AddProductComponent } from './product/modals/add-product/add-product.component';
// import { AllUsersComponent } from './user/all-users/all-users.component';
// import { AddUserComponent } from './user/modals/add-user/add-user.component';
// import { EditUserComponent } from './user/modals/edit-user/edit-user.component';
// import { AddUserModalComponent } from './modals/add-user/add-user.component';
// import {  UpdateUserModalComponent } from './modals/update-user/update-user.component';
// import { UserComponent } from './user/user.component';


const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbCardModule,
  NbBadgeModule,
  NbTabsetModule,
  NbTooltipModule,
  NbWindowModule,
  NbCheckboxModule,
  NbDialogModule,
  NbInputModule,
  NbPopoverModule,
  NbCalendarModule
];

@NgModule({
  imports: [
    AdminRoutingModule,
    ThemeModule,
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    // BsDropdownModule.forRoot(),
    NbActionsModule,
    SharedModule,
    // ImageCropperModule,
    ...NB_MODULES,
    // NgApexchartsModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    // CreateWarehouseComponent,
    // ViewStorageComponent,
    // CreateStorageComponent,
    // AllWarehousesComponent,
    // ViewStoragesComponent,
    // ViewInventoryComponent,
    // AllProductsComponent,
    // ReportsComponent,
    // UpdateWarehouseComponent,
    // DialogComponent,
    // UpdateStorageComponent,
    // ProductComponent,
    // AddProductComponent,
    // AllUsersComponent,
    // UserComponent,
    // AddUserComponent,
    // EditUserComponent,
    // UpdateUserModalComponent,
    // AddUserModalComponent
  ],
  entryComponents: [
    // CreateWarehouseComponent,
    // CreateStorageComponent,
    // UpdateWarehouseComponent,
    // DialogComponent,
    // UpdateStorageComponent,
    // AddProductComponent,
    // AddUserComponent,
    // EditUserComponent,
    // UpdateUserModalComponent,
    // AddUserModalComponent
  ],
  exports: [

  ]
})
export class AdminModule {
}
