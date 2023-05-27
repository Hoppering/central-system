import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {SplitButtonModule} from "primeng/splitbutton";
import { AccordionModule } from 'primeng/accordion';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DividerModule} from "primeng/divider";
import {KnobModule} from "primeng/knob";
import {FormsModule} from "@angular/forms";
import { CardModule } from 'primeng/card';
import {MenubarModule} from "primeng/menubar";
import {ChipsModule} from "primeng/chips";
import {DialogModule} from "primeng/dialog";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    AccordionModule,
    BrowserAnimationsModule,
    DividerModule,
    KnobModule,
    FormsModule,
    CardModule,
    MenubarModule,
    ChipsModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
