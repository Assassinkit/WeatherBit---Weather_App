import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KylientWeatherWidgetComponent } from './kylient-weather-widget/kylient-weather-widget.component';
import { DatePipe } from '@angular/common';
import { ConvertToDayPipe } from './convert-to-day.pipe';


@NgModule({
  declarations: [
    AppComponent,
    KylientWeatherWidgetComponent,
    ConvertToDayPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
