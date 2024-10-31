import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './shared/components/home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './shared/interceptors/http.interceptor';
import { MatButtonModule } from '@angular/material/button';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    JwtModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([httpInterceptor])),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
