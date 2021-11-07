import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTrackByPropertyPipe } from './ngx-track-by-property.pipe';

@NgModule({
    declarations: [NgxTrackByPropertyPipe],
    imports: [CommonModule],
    exports: [NgxTrackByPropertyPipe],
})
export class NgxTrackByPropertyModule {}
