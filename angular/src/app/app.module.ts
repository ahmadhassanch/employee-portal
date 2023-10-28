import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './pages/login/login.component';
import {
  DataService,
  APP_INITIALIZER_PROVIDER_FACTORY,
} from 'src/service/data-service.service';
import { HttpClientModule } from '@angular/common/http';
import { PipeModule } from './pipes/pipe.module';
import { ImageViewerModule } from 'src/shared/image-viewer/image-viewer.module';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    PipeModule,
    ImageViewerModule,
    // SocketIoModule.forRoot(config),
  ],
  providers: [
    DataService,
    {
      provide: APP_INITIALIZER,
      useFactory: APP_INITIALIZER_PROVIDER_FACTORY,
      deps: [DataService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
