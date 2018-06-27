import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import * as SignaturePad from 'signature_pad/dist/signature_pad';

@Component({
    selector: 'ng-signature-pad',
    templateUrl: 'signature-pad.component.html',
    styleUrls: ['signature-pad.component.scss']
})
export class SignaturePadComponent implements OnInit, AfterViewInit {

    private signaturePad: SignaturePad;
    @ViewChild('canvas', {read: ElementRef}) canvasRef: ElementRef;

    @Input() points: any;
    @Output() pointsChange = new EventEmitter<any>();

    @Input() editable = true;
    @Input() emitOnDragEnd = false;

    @Input() penColor = 'rgba(0,0,0,1)'; // Solid Black
    @Input() backgroundColor = 'rgba(0,0,0,0)'; // Transparent Black

    @Input() showDoneButton = true;
    @Input() doneButtonText = 'Done';
    @Input() doneButtonClass = 'btn btn-primary';
    @Input() showClearButton = true;
    @Input() clearButtonText = 'Clear';
    @Input() clearButtonClass = 'btn btn-default';

    @Input() format: 'blob' | 'base64' | 'json' = 'blob';

    @Input() height = 150;
    @Input() width = 600;

    @Output() done = new EventEmitter();
    @Output() cleared = new EventEmitter();

    @Input() responsive = true;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        // Resize Canvas to full screen:
        if (this.responsive) {
            window.addEventListener('resize', () => {
                this.resizeCanvas();
            });
            this.resizeCanvas();
            this.initPad();
        }
    }

    initPad() {
        this.signaturePad = new SignaturePad(this.canvasRef.nativeElement, {
            penColor: this.penColor,
            backgroundColor: this.backgroundColor
        });
        this.signaturePad.penColor = this.penColor;

        if (this.editable) {
            this.signaturePad.on();
        } else {
            this.signaturePad.off();
        }

        this.signaturePad.onEnd = () => {
            this.emitPoints();
            if (this.emitOnDragEnd) {
                this.emitBlob();
            }
        };

        this.applyPoints();
        if (this.emitOnDragEnd) {
            this.emitBlob();
        }
    }

    clearPad() {
        this.signaturePad.clear();
        this.cleared.emit();
        this.emitPoints();
        if (this.emitOnDragEnd) {
            this.emitBlob();
        }
    }

    applyPoints() {

        if (!this.points || !this.signaturePad) { return; }

        this.signaturePad.clear();

        const multiplier = this.canvasRef.nativeElement.offsetWidth / this.width;

        const points = JSON.parse(JSON.stringify(this.points));
        points.forEach(group => {
            group.forEach(pt => {
                pt.x = pt.x * multiplier;
                pt.y = pt.y * multiplier;
            });
        });
        this.signaturePad.fromData(points);
    }

    emitPoints() {
        const multiplier = this.canvasRef.nativeElement.offsetWidth / this.width;
        const points = JSON.parse(JSON.stringify(this.signaturePad.toData()));
        points.forEach(group => {
            group.forEach(pt => {
                pt.x = pt.x / multiplier;
                pt.y = pt.y / multiplier;
            });
        });
        this.pointsChange.emit(points);
    }

    emitPointsAndBlob() {
        this.emitPoints();
        this.emitBlob();
    }

    emitBlob() {

        switch (this.format) {

            case 'base64':
                this.done.emit(this.signaturePad.toDataURL());
                break;

            case 'json':
                this.done.emit(this.signaturePad.toData());
                break;

            default:
                this.canvasRef.nativeElement.toBlob((blob) => {
                    this.done.emit(blob);
                });
                break;
        }

    }


    resizeCanvas() {

        const canvas = this.canvasRef.nativeElement;
        if (!canvas) { return; }

        const pad = canvas.closest('.signature-pad') as HTMLElement;
        if (!pad) { return; }

        const w = pad.offsetWidth;
        const h = pad.offsetWidth / (this.width / this.height);

        canvas.setAttribute('width', `${w}`);
        canvas.setAttribute('height', `${h}`);

        this.applyPoints();

    }

}
