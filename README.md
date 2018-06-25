# Angular Signature Pad

Installation:
```npm
npm install @ng-plus/signature-pad --save
```

Usage:
```html
  <ng-signature-pad #pad
        [output]="'blob'" <!-- blob (default) or base64 (optional)-->
        (signed)="signed($event)"></ng-signature-pad>
```

JavaScript:
```javascript
    signed(blob) {
        // Do something with blob here.
    }
```
