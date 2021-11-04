import {
    AnimationPlayer,
    AnimationBuilder,
    style,
    animate,
    AnimationMetadata,
} from '@angular/animations';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnChanges,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'lib-ngx-show-more',
    templateUrl: './ngx-show-more.component.html',
    styleUrls: ['./ngx-show-more.component.scss'],
})
/**
 * Automatically determents wether the content passed via ng-content is larger than the provided defaultHeight
 * and only shows a part that is at max {{defaultHeight}} high with the option to show all
 */
export class NgxShowMoreComponent implements OnChanges, AfterViewInit {
    @Input() defaultHeight!: string;

    @ViewChild('wrapper') wrapper?: ElementRef<HTMLElement>;
    private player?: AnimationPlayer;

    constructor(
        private readonly animationBuilder: AnimationBuilder,
        private readonly changeDetectorRef: ChangeDetectorRef
    ) {}

    public fits = true;
    public showingMore = false;

    ngOnChanges() {
        this.updateState();
    }

    ngAfterViewInit() {
        // the ng-content makes up for the height of the wrapper -> wait until it is loaded
        setTimeout(() => this.updateState(), 0);
        // TODO: Investigate using ResizeObserver
        // check every second (just for error correction)
        setInterval(() => this.updateState(), 1000);
    }

    public toggleShowMore() {
        if (!this.wrapper) {
            return;
        }
        this.showingMore = !this.showingMore;
        const currentHeight = this.wrapper.nativeElement.clientHeight;
        this.wrapper.nativeElement.style.maxHeight = '';
        if (this.showingMore) {
            // expand
            this.playAnimation([
                style({ height: currentHeight }),
                animate('0.5s ease', style({ height: '*' })),
            ]);
        } else {
            this.playAnimation([
                style({ height: '*' }),
                animate(
                    '0.5s ease',
                    style({
                        height: this.defaultHeight,
                    })
                ),
            ]);
        }
    }

    private playAnimation(animation: AnimationMetadata[]) {
        if (!this.wrapper) {
            return;
        }
        this.player?.destroy();
        // play the animation
        this.player = this.animationBuilder
            .build(animation)
            .create(this.wrapper.nativeElement);
        this.player.play();
    }

    private updateState() {
        if (!this.wrapper) {
            return;
        }
        this.fits =
            !this.showingMore &&
            this.wrapper.nativeElement.scrollHeight <=
                this.wrapper.nativeElement.clientHeight;
        this.changeDetectorRef.markForCheck();
    }
}
