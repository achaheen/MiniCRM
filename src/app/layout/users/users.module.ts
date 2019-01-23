import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TableModule,
    ButtonModule
  ]
})
export class UsersModule { }
