import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { interval, merge, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-show-more-demo',
    templateUrl: './show-more-demo.component.html',
    styleUrls: ['./show-more-demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowMoreDemoComponent implements OnInit {
    public demoData = [
        {
            title: 'Higher than defaultHeight',
            body$: of(this.domSanitizer.bypassSecurityTrustHtml(longBody)),
        },
        {
            title: 'Smaller than defaultHeight',
            body$: of(this.domSanitizer.bypassSecurityTrustHtml(shortBody)),
        },
        {
            title: 'Content changes dynamically',
            body$: merge(of(0), interval(3000)).pipe(
                map((sequenceNumber) =>
                    this.domSanitizer.bypassSecurityTrustHtml(
                        sequenceNumber % 2 === 0 ? placeholderBody : longBody
                    )
                )
            ),
        },
    ];

    constructor(private readonly domSanitizer: DomSanitizer) {}

    ngOnInit(): void {}
}

const placeholderBody = `<div class="placeholder-glow">
                                    <span class="placeholder w-75"></span>
                                </div>`;
const shortBody =
    '<p class="font-monospace lh-lg">Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>';
const longBody =
    '<p class="font-monospace lh-lg">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>';
