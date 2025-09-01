import { LightningElement, api } from 'lwc';

export default class Checkbox extends LightningElement {
    @api checked = false;
    @api readOnly = false;
    @api required = false;
    @api messageWhenValueMissing = 'Complete this field.';

    validity = true;
    showError = false;
    customValidityErrorMsg = "";

    get errorMessage() {
        return this.customValidityErrorMsg ? this.customValidityErrorMsg : this.messageWhenValueMissing;
    }

    get formElementClass() {
        let classes = 'slds-form-element';
        classes += this.showError ? ' slds-has-error' : '';
        classes += this.readOnly ? ' read-only' : '';
        return classes;
    }

    @api
    get value() {
        return this.checked;
    }

    set value(checked) {
        this.checked = !!checked;
    }

    @api
    blur() {
        this.template.querySelector("input").blur();
    }

    @api
    focus() {
        this.template.querySelector("input").focus();
    }

    @api
    checkValidity() {
        if(this.customValidityErrorMsg && !this.readOnly) {
            this.validity = false;
        } else if(this.required && !this.readOnly) {
            this.validity = this.checked;
        } else {
            this.validity = true;
        }
        
        return this.validity;
    }
    
    @api
    reportValidity() {
        this.showError = !this.checkValidity();
        return this.validity;
    }

    @api
    setCustomValidity(message) {
        this.customValidityErrorMsg = message;
        this.reportValidity();
    }

    handleChange(event) {
        this.checked = event.currentTarget.checked;
        this.dispatchEvent(new CustomEvent("change"));
    }

    handleClick(event) {
        if(this.readOnly) event.preventDefault();
        this.dispatchEvent(new CustomEvent("click"));
    }

    handleInput(event) {
        this.dispatchEvent(new CustomEvent("input"));
    }

    handleFocus(event) {
        this.dispatchEvent(new CustomEvent("focus"));
    }

    handleBlur(event) {
        this.reportValidity();
        this.dispatchEvent(new CustomEvent("blur"));
    }
    
}