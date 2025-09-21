# salesforce-lwc-checkbox

A reusable Lightning Web Component (LWC) for Salesforce that provides a customizable checkbox component for use in various contexts.

---

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation / Deployment](#installation--deployment)
- [Usage](#usage)
  - [Properties (API)](#properties-api)
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

After deployment, you can use the component inside other LWCs, in Lightning App Builder, Record Pages, or Aura components.

### Properties (API)

| Property   | Type      | Required | Default | Description                                       |
|------------|-----------|----------|---------|---------------------------------------------------|
| `label`    | `String`  | no       | `''`    | Text label displayed next to the checkbox         |
| `checked`  | `Boolean` | no       | `false` | Initial checked state                             |
| `disabled` | `Boolean` | no       | `false` | If `true`, the checkbox is read-only / not clickable |

### Events

- `change` — fired when the user toggles the checkbox.  
  The event detail contains the new `checked` value.

  ```js
  {
    detail: {
      checked: true/false
    }
  }
  ```

---

## Examples

### Example 1: Basic Usage in an LWC

```html
<!-- parentComponent.html -->
<template>
  <c-checkbox
    label="Accept terms and conditions"
    checked={accepted}
    onchange={handleCheckboxChange}>
  </c-checkbox>
  <p>Checkbox state: {accepted}</p>
</template>
```

```js
// parentComponent.js
import { LightningElement, track } from 'lwc';

export default class ParentComponent extends LightningElement {
  @track accepted = false;

  handleCheckboxChange(event) {
    this.accepted = event.detail.checked;
  }
}
```

### Example 2: Disabled Checkbox

```html
<template>
  <c-checkbox
    label="Read-only example"
    checked={true}
    disabled={true}
    onchange={handleCheckboxChange}>
  </c-checkbox>
</template>
```

### Example 3: Usage in Aura / Flows / Record Page

You can include this component in a Lightning Page or Aura component (if exposed in the meta file), or make it available for Salesforce Flows if configured.  
Usage and attributes remain the same.

---

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

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for details.
