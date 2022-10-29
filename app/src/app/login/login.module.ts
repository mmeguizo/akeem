import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.modules';
import { LoginComponent } from './login.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbSpinnerModule } from '@nebular/theme';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { NbLayoutModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ThemeModule,
        LoginRoutingModule,
        NbSpinnerModule,
        NbCardModule,
        NbLayoutModule,
        FormsModule,
        NbButtonModule,
        // SharedModule,
    ],
    declarations: [LoginComponent],
    entryComponents: []
})
export class LoginModule {}
