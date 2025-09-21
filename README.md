# salesforce-lwc-checkbox

A reusable Lightning Web Component (LWC) that offers a more flexible and customizable checkbox than the standard Salesforce checkbox component, making it easy to adapt to a variety of use cases.

---

## Table of Contents

- [Features](#features)
- [Usage](#usage)
  - [Properties (API)](#properties-api)
  - [Methods (API)](#methods-api)
  - [Events](#events)
  - [Examples](#examples)
- [Styling / Customization](#styling--customization)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Label is **more flexible** than the standard:
  - it can be **blank** or missing
  - it can contains **hyperlinks** or other text-oriented HTML tags
  - it's always displayed to the **right of the checkbox** and formatted as a single block, even when the label text is long  
- Option to set the checkbox as **read-only**  
- Option to make the checkbox **required** (must be checked) with a customizable error message.  
  - If the checkbox is required and left unchecked, the error message appears when it loses focus or when the `reportValidity()` method is called  
- Ability to **invalidate the checkbox programmatically** and show a custom error message using the `setCustomValidity(message)` method  
- Support for creating a **validation group** using the accompanying [`checkbox-group`](https://github.com/marnick94/salesforce-lwc-checkbox-group) component

---

## Usage

You can use this component inside your Lightning Web Components, Aura components or together with the companion [`checkbox-group`](https://github.com/marnick94/salesforce-lwc-checkbox-group) component.

### Properties (API)

| Property                   | Type      | Required | Default | Description                                            |
|----------------------------|-----------|----------|---------|--------------------------------------------------------|
| `checked`                  | `Boolean` | No       | `false` | State of the checkbox.                                 |
| `value`                    | `Boolean` | No       | `false` | Same as `checked` property.                            |
| `readonly`                 | `Boolean` | No       | `false` | If `true`, the checkbox is read-only.                  |
| `required`                 | `Boolean` | No       | `false` | If `true`, the checkbox is required (must be checked). |
| `messageWhenValueMissing`  | `String`  | No       | `Complete this field.` | Error message shown when the checkbox is `required` and has not been `checked`. |

### Methods (API)

| Method              | Arguments   | Return Type | Description                                           |
|---------------------|-------------|-------------|-------------------------------------------------------|
| `blur`              | None | None | Removes focus from the checkbox. |
| `focus`             | None | None | Sets focus on the checkbox. |
| `checkValidity`     | None | `Boolean` | Checks if the input is valid. Returns `false` if:<br>•&nbsp;&nbsp;`readonly = false` and custom validity is set<br>•&nbsp;&nbsp;`readonly = false` AND `required = true` AND `checked = false`<br>Otherwise returns `true`. |
| `reportValidity`    | None | `Boolean` | Displays the error messages and returns `false` if the checkbox is invalid. If the checkbox is valid, `reportValidity()` clears displayed error messages and returns `true`. |
| `setCustomValidity` | `message` : `String` | None | Sets a custom error message to be displayed immediately. If `message` is [`<blank>`, `null`, `undefined`], custom validity is unset. |

### Events

| Event               | Description                 |
|---------------------|-----------------------------|
| `change`            | Checkbox state has changed. |
| `click`             | Checkbox has been clicked.  |
| `input`             | Same as `change`.           |
| `focus`             | Checkbox has gained focus.  |
| `blur`              | Checkbox has lost focus.    |

## Examples

### Example 1: Basic Usage

![base_checkbox](https://github.com/user-attachments/assets/462a805f-2e30-48bb-b7d2-98b837c72f99)

```html
<!-- parentComponent.html -->
<template>
  <c-checkbox
    checked={accepted}
    onchange={handleCheckboxChange}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </c-checkbox>
</template>
```

```js
// parentComponent.js
import { LightningElement, track } from 'lwc';

export default class ParentComponent extends LightningElement {
  @track accepted = false;

  handleCheckboxChange(event) {
    this.accepted = event.target.checked;
  }
}
```

### Example 2: Required

![required_checkbox](https://github.com/user-attachments/assets/a53699c8-2c0a-4f6d-adcb-b348c90276b7)

```html
<!-- parentComponent.html -->
<template>
  <c-checkbox
    onchange={handleCheckboxChange}
    required>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </c-checkbox>
</template>
```

### Example 3: Read-Only

![readonly_checkbox](https://github.com/user-attachments/assets/d7c03cd2-788a-4a86-9b55-2b0db54aacf5)

```html
<!-- parentComponent.html -->
<template>
  <c-checkbox
    checked="true"
    readonly>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </c-checkbox>
</template>
```

### Example 4: Custom Missing Value Message

![custom_missing_message](https://github.com/user-attachments/assets/1695bcdf-4221-43fc-b4a9-d922f40fe9b1)

```html
<!-- parentComponent.html -->
<template>
  <c-checkbox
    checked={accepted}
    onchange={handleCheckboxChange}
    message-when-value-missing="This field is required."
    required>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </c-checkbox>
</template>
```

### Example 5: Custom Validity

![custom_validity](https://github.com/user-attachments/assets/2ed84126-346c-4219-8cbd-fcf00bb180a1)

```html
<!-- parentComponent.html -->
<template>
  <lightning-button label="Toogle Custom Validity" onclick={handleCustomValidityToogle}></lightning-button>
  <c-checkbox>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</c-checkbox>
</template>
```

```js
// parentComponent.js
import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
  handleCustomValidityToogle(event) {
      const checkbox = this.template.querySelector('c-checkbox');
      checkbox.setCustomValidity(checkbox.checkValidity() ? 'This field is required.' : '');
  }
}
```

### Example 6: Label with hyperlink

<img width="568" height="85" alt="image" src="https://github.com/user-attachments/assets/24a05d3c-2303-419d-83d2-5b8f48c15687" /><br>

```html
<!-- parentComponent.html -->
<template>
  <c-checkbox>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Take a look <a href="https://www.lipsum.com" target="_blank">here</a>.
  </c-checkbox>
</template>
```

### Example 7: Long label

<img width="780" height="263" alt="image" src="https://github.com/user-attachments/assets/858818e8-f3f7-45e5-9e12-c49c417ce580" /><br>

```html
<!-- parentComponent.html -->
<template>
  <c-checkbox>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur elit ac leo aliquam, sed vestibulum dolor feugiat. Fusce sit amet arcu auctor, volutpat sem nec, porta ante. Morbi sit amet libero finibus, semper tortor et, aliquet urna. Sed cursus euismod purus id malesuada. Sed eros leo, convallis sed convallis id, elementum at elit. Praesent ullamcorper ligula id ex lacinia, eu luctus mauris laoreet. Sed eleifend interdum dolor eu vestibulum. Integer molestie diam eu sapien cursus pharetra. Ut ultrices nunc sem, nec hendrerit neque maximus id. Maecenas molestie nulla ac leo maximus, ut pulvinar arcu efficitur. Duis condimentum vel ipsum sollicitudin consequat. Curabitur lacinia nisl sit amet finibus gravida. Integer efficitur, neque a porttitor mollis, velit risus commodo massa, eget fermentum est massa sit amet quam. Ut quis urna hendrerit, viverra felis mollis, tempor leo. Integer mollis finibus nulla sit amet tempor.
  </c-checkbox>
</template>
```

## Styling / Customization

You can customize styles (colors, size, margins, etc.) by editing the component's `.css` file.  
Use CSS variables or SLDS design tokens where possible to maintain compatibility with Salesforce themes (light/dark, accessibility).

---

## Contributing

1. Open an *Issue* to report bugs or request features.  
2. Fork the repository and create a new branch for your changes.  
3. Submit a *Pull Request* with a clear description of your updates.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
