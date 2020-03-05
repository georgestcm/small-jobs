import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule , HTTP_INTERCEPTORS} from "@angular/common/http"
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {components} from './app-routing.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardPageModule } from './dashboard/dashboard.module';
import { AuthService } from './auth.service'
import { AuthGuard} from './auth.guard'
import { UpdateService} from './update.service'
import {ReviewService} from './review.service'
import { SendmessageService} from './sendmessage.service'
import { SubscriptionService} from './subscription.service';
import { TokenInterceptorService} from './token-interceptor.service'
import { IonicStorageModule } from '@ionic/storage';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import { Network } from '@ionic-native/network/ngx';
import { IonicRatingModule } from 'ionic4-rating';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
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
    IonicRatingModule,
   IonicStorageModule.forRoot({
     name:"db",
     driverOrder: ['websql','sqlite',]
   })],
  providers: [
    StatusBar,
    Geolocation,
    AuthService,
    SendmessageService,
    UpdateService,
    ReviewService,
    SubscriptionService,
    AuthGuard,
    PhotoViewer,
    DocumentViewer,
    Camera,
    Network,
    IonicStorageModule,
    { provide: HTTP_INTERCEPTORS, useClass:TokenInterceptorService ,multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
