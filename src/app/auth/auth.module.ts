import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ThemeModule } from "../@theme/theme.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbRadioModule,
  NbListModule,
  NbProgressBarModule,
  NbUserModule,
  NbIconModule,
  NbAccordionModule,
  NbButtonModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbInputModule,
  NbSelectModule,
  NbFormFieldModule,
  NbToastrModule,
} from "@nebular/theme";


@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        AuthRoutingModule,
        CommonModule,
        ThemeModule,
        FormsModule,
        ReactiveFormsModule,
        NbMenuModule,
        NbCardModule,
        NbRadioModule,
        NbListModule,
        NbProgressBarModule,
        NbUserModule,
        NbIconModule,
        NbAccordionModule,
        NbButtonModule,
        NbCheckboxModule,
        NbDatepickerModule,
        NbInputModule,
        NbSelectModule,
        NbFormFieldModule,
        NbToastrModule
    ]
})
export class AuthModule { }
