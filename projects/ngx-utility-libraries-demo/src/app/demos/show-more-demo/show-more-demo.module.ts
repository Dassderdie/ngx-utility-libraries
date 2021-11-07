import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowMoreDemoComponent } from './show-more-demo.component';
import { NgxShowMoreModule } from 'ngx-show-more';
import { NgxTrackByPropertyModule } from 'ngx-track-by-property';

@NgModule({
    declarations: [ShowMoreDemoComponent],
    imports: [CommonModule, NgxShowMoreModule, NgxTrackByPropertyModule],
    exports: [ShowMoreDemoComponent],
})
export class ShowMoreDemoModule {}
