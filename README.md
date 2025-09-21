# salesforce-lwc-checkbox

A reusable Lightning Web Component (LWC) for Salesforce that offers a more flexible and customizable checkbox than the standard Salesforce checkbox component, making it easy to adapt to a variety of use cases.

---

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation / Deployment](#installation--deployment)
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

- Custom visual checkbox (checked / unchecked)
- Interactive behavior that emits events to parent components when the state changes
- Configurable label, initial state, and enable/disable options

---

## Requirements

- Salesforce org with LWC support
- Compatible API version (e.g. 50.0+)
- Permissions to deploy LWC components

---

## Installation / Deployment

1. Clone the repository:

   ```bash
   git clone https://github.com/marnick94/salesforce-lwc-checkbox.git
   ```

2. Move the files into your Salesforce DX project folder, for example:
   `force-app/main/default/lwc/checkbox`

3. Deploy to your Salesforce org:

   ```bash
   sfdx force:source:deploy -p force-app/main/default/lwc/checkbox --targetusername <your_org_alias>
   ```

---

## Usage

After deployment, you can use the component inside other LWCs.

### Properties (API)

| Property                   | Type      | Required | Default | Description                                            |
|----------------------------|-----------|----------|---------|--------------------------------------------------------|
| `checked`                  | `Boolean` | No       | `false` | State of the checkbox.                                 |
| `value`                    | `Boolean` | No       | `false` | Same as `checked` property.                            |
| `readonly`                 | `Boolean` | No       | `false` | If `true`, the checkbox is read-only.                  |
| `required`                 | `Boolean` | No       | `false` | If `true`, the checkbox is required (must be checked). |
| `messageWhenValueMissing`  | `String`  | No       | `false` | Error message displayed when the checkbox is `required` and has not been set to `true`. The default value is `Complete this field.`. |

### Methods (API)

| Method              | Arguments   | Return Type | Description                                           |
|---------------------|-------------|-------------|-------------------------------------------------------|
| `blur`              | None | None | Removes focus from the checkbox. |
| `focus`             | None | None | Sets focus on the checkbox. |
| `checkValidity`     | None | `Boolean` | Checks if the input is valid. Returns `false` if:<br>•&nbsp;&nbsp;`readonly = false` and custom validity is set<br>•&nbsp;&nbsp;`readonly = false` AND `checked = false` AND `required = true`<br>Otherwise returns `true`. |
| `reportValidity`    | None | `Boolean` | Displays the error messages and returns `false` if the input is invalid. If the input is valid, `reportValidity()` clears displayed error messages and returns `true`. |
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

### Example 2: Required Checkbox

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

### Example 3: Readonly Checkbox

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
