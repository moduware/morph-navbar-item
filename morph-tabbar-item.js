import { MorphElement } from 'morph-element/morph-element.js';
import 'morph-shared-colors/morph-shared-colors.js';
import 'morph-shared-styles/morph-shared-styles.js';
import 'morph-ripple/morph-ripple.js';
import '@polymer/polymer/lib/utils/debounce.js';
import '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
/**
 * `morph-tabbar-item`
 * Tab bar item for polymorph components
 *
 * @customElement
 * @polymer
 * @demo morph-tabbar-item/demo/index.html
 */
class MorphTabbarItem extends MorphElement(PolymerElement) {
  static get template() {
    return html`
    <style include="morph-shared-styles">

      :host {
        --ios-grey:var(--polymorph-ios-gray-color);
        --android-white: #fff;
        --selected-label-color-ios: var(--polymorph-ios-blue-color);
        --selected-label-color-android: var(--android-white);
        --ripple-color-selected: var(--selected-label-color-android);


        display: inline-block;
        text-align: center;
        position: relative;
        overflow: hidden;
      }

      :host([platform="ios"]) {
        --color: var(--ios-grey);
        color: var(--color);
        padding-top: 4px;
        padding-bottom: 4px;
      }

      :host([platform="android"]) {
        --color: var(--android-white);

        color: var(--color);
        padding-top: 12px;
        padding-bottom: 12px;
      }

      :host([platform="android"][selected][has-label])  .label {
        color: var(--selected-label-color-android);
      }

      :host([platform="ios"][selected][has-label])  .label {
        color: var(--selected-label-color-ios);
      }

      span {
        display: block;
      }

      .text {
        display: inline-block;
      }

      :host([has-label]) .label {
        display: block;
        margin: 0;
        position: relative;
      }

      :host([platform="ios"][has-label]) .label {
        color: var(--color);
        line-height: 10px;
        margin: 0;
        font-family: "-apple-system", "SF UI Text", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
        letter-spacing: .01em;
        font-size: 10px;
      }

      :host([platform="android"][has-label]) .label {
        line-height: 1;
        color: var(--color);
        margin: 0;
        margin-top:10px;
        font-family: "Roboto", "Noto", "Arial", sans-serif;
        text-transform: uppercase;
        letter-spacing: .01em;
        font-size: 14px;
        max-width: 100%;
      }

      :host(:not([has-label])) .label {
        display: none;
      }

      :host(:not([platform=android])) morph-ripple {
        display: none;
      }

      :host([platform="android"]) morph-ripple {
        --ripple-color: var(--color);
      }

      :host([platform="android"][selected]) morph-ripple, 
      :host([platform="android"][selected][has-label]) morph-ripple {
        --ripple-color: var(--ripple-color-selected);
      }

      :host([no-image]) img#icon {
        visibility: hidden;
      }

    </style>
      <span name="[[name]]">
        <img class="icon" id="icon">
        <span id="label" class="label"><slot id="slot"></slot></span>
        <morph-ripple></morph-ripple>
      </span>
`;
  }

  static get is() { return 'morph-tabbar-item'; }
  static get properties() {
    return {
      name: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      selectedImage: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      notSelectedImage: {
        type: String,
        reflectToAttribute: true,
        notify: true
      },
      selected: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      hasLabel: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      },
      noImage: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        notify: true
      }
    };
  }
  static get observers() {
    return [
      'selectedObserver(selected)',
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.checkSelectedImageSet();
  }


  /**
  * selectedObserver - Observer for the changes of selected attribute.
  */
  selectedObserver(changes) {
    this.setImageSource();
  }


  checkSelectedImageSet() {
    if (this.notSelectedImage == undefined) {
      this.set('noImage', true);
    }
  }

  /**
   * setImageSource - Sets up the image source based on the selected attribute.
   *
   */
  setImageSource() {
    if (this.noImage || this.notSelectedImage == undefined) return;
    if (this.selected) {
      //if selected-image source is not specified, fallback is the not-selected-image source.
      this.$.icon.src = this.selectedImage || this.notSelectedImage;
    } else {
      this.$.icon.src = this.notSelectedImage;
    }
  }
}

window.customElements.define(MorphTabbarItem.is, MorphTabbarItem);
