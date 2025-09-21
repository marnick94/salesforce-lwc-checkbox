import { LightningElement, api } from 'lwc';

const DEFAULT_MESSAGE_WHEN_VALUE_MISSING = 'Complete this field.';

export default class Checkbox extends LightningElement {
    _checked = false;
    _readOnly = false;
    _required = false;
    _validity = true;
    _showError = false;
    _parent = undefined;
    _customValidityErrorMsg = "";
    _messageWhenValueMissing = DEFAULT_MESSAGE_WHEN_VALUE_MISSING;

    @api
    get checked() {
        return this._checked;
    }

    set checked(value) {
        this._checked = !!value;
    }

    @api
    get value() {
        return this.checked;
    }

    set value(value) {
        this.checked = !!value;
    }

    @api
    get readOnly() {
        return this._readOnly;
    }

    set readOnly(value) {
        if(this.hasParent) return;

        this._readOnly = !!value;
    }

    @api
    get required() {
        return this._required;
    }

    set required(value) {
        if(this.hasParent) return;

        this._required = !!value;
    }

    @api
    get messageWhenValueMissing() {
        return this._messageWhenValueMissing;
    }

    set messageWhenValueMissing(value) {
        if(this.hasParent) return;

        this._messageWhenValueMissing = value ? value : DEFAULT_MESSAGE_WHEN_VALUE_MISSING;
    }

    @api
    blur() {
        if(this.hasParent) return;

        this.template.querySelector("input").blur();
    }

    @api
    focus() {
        if(this.hasParent) return;

        this.template.querySelector("input").focus();
    }

    @api
    checkValidity() {
        if(this.hasParent) return;

        if(this._customValidityErrorMsg && !this.readOnly) {
            this._validity = false;
        } else if(this.required && !this.readOnly) {
            this._validity = this.checked;
        } else {
            this._validity = true;
        }
        
        return this._validity;
    }
    
    @api
    reportValidity() {
        if(this.hasParent) return;

        this._showError = !this.checkValidity();
        return this._validity;
    }

    @api
    setCustomValidity(message) {
        if(this.hasParent) return;

        this._customValidityErrorMsg = message;
        this.reportValidity();
    }

    handleChange(event) {
        this.checked = event.currentTarget.checked;
        this.dispatchEvent(new CustomEvent("change"));
        this.reportValidity();
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

    get errorMessage() {
        return this._customValidityErrorMsg ? this._customValidityErrorMsg : this.messageWhenValueMissing;
    }

    get formElementClass() {
        let classes = 'slds-form-element';
        classes += this._showError ? ' slds-has-error' : '';
        classes += this.readOnly ? ' read-only' : '';
        return classes;
    }

    get hasParent() {
        return !!this._parent;
    }

    @api
    bind(value) {   // for internal use only
        if(!value) {
            this._parent = undefined;
            return;
        }

        if(value.tagName == 'C-CHECKBOX-GROUP') {
            this._parent = value;
            this._readOnly = this._parent.readOnly;
            this._required = false;
            this._validity = true;
            this._showError = false;
            this._customValidityErrorMsg = "";
            this._messageWhenValueMissing = DEFAULT_MESSAGE_WHEN_VALUE_MISSING;
        }
    }
}