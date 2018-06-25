import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as SignaturePad from 'signature_pad/dist/signature_pad';

@Component({
    selector: 'ng-signature-pad',
    templateUrl: 'signature-pad.component.html',
    styleUrls: ['signature-pad.component.scss']
})
export class SignaturePadComponent implements OnInit {
    @ViewChild('canvas') canvas;

    @Input() dataUrl: string;
    @Input() dataPoints: string;
    @Input() editable = true;
    @Input() showClearButton = true;
    @Input() output: 'blob' | 'base64' = 'blob';

    private pad: SignaturePad;
    @Output() signed = new EventEmitter<string | Blob>();

    constructor() {
    }

    ngOnInit() {
        this.initPad();
        window.addEventListener('resize', this.resize);
        this.resize();
    }

    initPad() {
        console.log(this.canvas.nativeElement);
        this.pad = new SignaturePad.default(this.canvas.nativeElement);
        if (this.dataUrl) {
            this.pad.fromDataURL(this.dataUrl);
        }
        if (this.dataPoints) {
            this.pad.fromData(this.dataPoints);
        }
        if (this.editable) {
            this.pad.on();
        } else {
            this.pad.off();
        }

        this.pad.onEnd = () => this.emitCanvas();
    }

    emitCanvas() {

        switch (this.output) {

            case 'base64':
                const str = this.canvas.nativeElement.toDataURL();
                this.signed.emit(str);
                break;

            default:
                this.canvas.nativeElement.toBlob((blob) => {
                    this.signed.emit(blob);
                });
                break;
        }

    }

    clear() {
        this.pad.clear();
        this.emitCanvas();
    }

    private resize() {
        const canvas = this.canvas.nativeElement;
        const ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
    }

}
