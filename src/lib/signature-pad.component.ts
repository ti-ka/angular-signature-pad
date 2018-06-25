import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as SignaturePad from 'signature_pad/dist/signature_pad';

@Component({
    selector: 'ng-signature-pad',
    templateUrl: 'signature-pad.component.html',
    styleUrls: ['signature-pad.component.scss']
})
export class SignaturePadComponent implements OnInit {
    @ViewChild('canvas') canvas;

    @Input() base64: string;
    @Output() base64Change = new EventEmitter<string>();

    @Input() blob: Blob;
    @Output() blobChange = new EventEmitter<Blob>();

    @Input() dataPoints: string;
    @Input() editable = true;
    @Input() showClearButton = true;

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
        if (this.base64) {
            this.pad.fromDataURL(this.base64);
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
        const base64String = this.canvas.nativeElement.toDataURL();
        this.base64Change.emit(base64String);

        this.canvas.nativeElement.toBlob((blob) => {
            this.blobChange.emit(blob);
            this.signed.emit(blob);
        });

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
