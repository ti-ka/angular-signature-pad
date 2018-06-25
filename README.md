# Angular Signature Pad

Installation:
```npm
npm install @ng-plus/signature-pad --save
```

Usage (Blob):
```html
<ng-signature-pad [(blob)]="blob"></ng-signature-pad>
```

JavaScript:
```typescript
blob: Blob;

someButtonAction() {
    // Do something with the blob.
}
```

#
Or use a base64 string:
```html
<ng-signature-pad [(base64)]="base64"></ng-signature-pad>
<img [src]="base64" /> 
```
