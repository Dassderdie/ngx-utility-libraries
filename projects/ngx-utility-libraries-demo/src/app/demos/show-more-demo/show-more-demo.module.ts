import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowMoreDemoComponent } from './show-more-demo.component';
import { NgxShowMoreModule } from 'ngx-show-more';

@NgModule({
    declarations: [ShowMoreDemoComponent],
    imports: [CommonModule, NgxShowMoreModule],
    exports: [ShowMoreDemoComponent],
})
export class ShowMoreDemoModule {}
