import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowMoreDemoModule } from './demos/show-more-demo/show-more-demo.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, ShowMoreDemoModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
