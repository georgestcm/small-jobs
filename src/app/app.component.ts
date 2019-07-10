import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public alertController: AlertController,
    private network: Network
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.checkNetwork();
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async alert(msg) {
      const alert = await this.alertController.create({
        header: '',
        subHeader: '',
        message: msg,
        buttons: [{
        text: 'Ok',
        role: 'ok',
        handler: () => {

          }
      }] })

      await alert.present();
    }
    checkNetwork(){
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
  this.alert("Connect to the internet")
});
    }
}
