import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxShowMoreComponent } from './ngx-show-more.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [NgxShowMoreComponent],
    imports: [CommonModule, BrowserAnimationsModule],
    exports: [NgxShowMoreComponent],
})
export class NgxShowMoreModule {}
