# Angular Signature Pad

[See Demo on Stackblitz](https://stackblitz.com/edit/ng-plus-signature-pad?file=src%2Fapp%2Fapp.component.html)

Installation:
```npm
npm install @ng-plus/signature-pad --save
```
Usage (Blob/Image):
```html
<ng-signature-pad (done)="saveImage($event)"></ng-signature-pad>
```

JavaScript:
```typescript
saveImage(blob: Blob) {
    // Do something with the blob.
}
```


#### Options:
| Directives        | Description | Options | Default |
| ------------- | ------------- | ------------- | ------------- |
| `[editable]` | Turn pad on or off | `true`, `false` | `true`
| `[emitOnDragEnd]` | Emit the `(done)` method as soon as drag end. | `true`, `false` | `false`
| `[penColor]` | Color of signature pen | Color | `black`
| `[backgroundColor]` | Background of signature pad | Color | `transparent`
| `(done)` | Fired on clicking `Done` button | `function($event: Blob/base64/json)` | `null`
| `(clear)` | Fired on clicking `Clear` button | `function()` | `null`
| `[(points)]` | JSON points model | json | `null`
| `[format]` | Output format foe `(done)` method. `json` output is same as `points` model. | `blob`, `base64`, `json` | `blob`
| `[width]` | Width of canvas | `number` | `600`
| `[height]` | Height of canvas | `number` | `150`
| `[responsive]` | Resize to 100% parent. But the points will still output `width`x`height` ratio  | `true`, `false` | `true`
| `[showDoneButton]` | Show or Hide Done Button | `true`, `false` | `true`
| `[showClearButton]` | Show or Hide Clear Button | `true`, `false` | `true`
| `[doneButtonText]` | Text of Done Button | `string` | `Done`
| `[clearButtonText]` | Text of Clear Button | `string` | `Clear`
| `[doneButtonClass]` | Class classes of Done Button | `string` | `btn  btn-primary`
| `[clearButtonClass]` | Class classes of Clear Button | `string` | `btn  btn-default`
