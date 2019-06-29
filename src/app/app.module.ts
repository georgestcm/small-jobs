import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule , HTTP_INTERCEPTORS} from "@angular/common/http"
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {components} from './app-routing.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardPageModule } from './dashboard/dashboard.module';
import { AuthService } from './auth.service'
import { AuthGuard} from './auth.guard'
import { UpdateService} from './update.service'
import { SubscriptionService} from './subscription.service';
import { TokenInterceptorService} from './token-interceptor.service'
import { IonicStorageModule } from '@ionic/storage';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';
@NgModule({
  declarations: [
    AppComponent,
    components
  ],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    DashboardPageModule,
    FormsModule,
    HttpClientModule,
   IonicStorageModule.forRoot({
     name:"db",
     driverOrder: ['localstorage', 'sqlite',]
   })],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    AuthService,
    UpdateService,
    SubscriptionService,
    AuthGuard,
    PhotoViewer,
    Camera,
    Stripe,
    IonicStorageModule,
    { provide: HTTP_INTERCEPTORS, useClass:TokenInterceptorService ,multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
