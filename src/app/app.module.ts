import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth.module';
import { AuthRoutingModule } from './modules/auth-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AuthModule, AuthRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
