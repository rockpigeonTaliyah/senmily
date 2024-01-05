import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { resolveRouterPath } from '../router';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

import { styles } from '../styles/shared-styles';

@customElement('app-home')
export class AppHome extends LitElement {

  // For more information on using properties and state in lit
  // check out this link https://lit.dev/docs/components/properties/
  @property() message = 'Welcome!';

  static styles = [
    styles,
    css`
    .container {
      display: grid;
      grid-template-columns: 0.5fr 1fr 3fr;
      grid-gap: 10px;
      height: 100vh;
      overflow:hidden;
    }
    .container-v {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 50px 0px;
    }
    .container-h {
      display: flex;
      flex-direction: row;
      width: 100%;
    }
    .item {
      background-color: orange;
      padding: 10px;
      cursor: pointer;
      width: -webkit-fill-available;

    }
    .item:has(>div.main-screen) {
      display: flex;
      align-items: center; /* Vertical alignment */
      justify-content: center; /* Horizontal alignment */
      border: 1px solid black; /* Optional: Just for visualization */
    }
    .option-block{
      width: 100%;
      height : 200px;
      background:grey;
      border; 1px white;
      margin-bottom:10px;
      min-height:20vh;
    }
    .option-list{
      display:flex;
      flex-direction:column;
      position:relative;
      overflow:scroll;
      max-height: 80vh;
    }
    .option-list::-webkit-scrollbar {
      width: 0em; /* Adjust the width as needed */
    }

    .option-list::-webkit-scrollbar-track {
      background: transparent;
    }

    .option-list::-webkit-scrollbar-thumb {
      background-color: transparent;
    }
    .option-list-box {
      position: relative;
    }
    .option-list-box::before,
    .option-list-box::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      height: 50px; /* Adjust the height as needed */
      pointer-events: none; /* Make sure the pseudo-elements don't interfere with interactions */
      z-index:1;
    }

    .option-list-box::before {
      top: 0;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
    }

    .option-list-box::after {
      bottom: 0;
      background: linear-gradient(to top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
    }
    .main-screen{
      background: #000000;
      height:80vh;
      width: -webkit-fill-available;

    }
    .circle{

    }

  `];

  async firstUpdated() {
    // this method is a lifecycle even in lit
    // for more info check out the lit docs https://lit.dev/docs/components/lifecycle/
    console.log('This is your home page');
  }

  share() {
    if ((navigator as any).share) {
      (navigator as any).share({
        title: 'PWABuilder pwa-starter',
        text: 'Check out the PWABuilder pwa-starter!',
        url: 'https://github.com/pwa-builder/pwa-starter',
      });
    }
  }

  render() {
    return html`
      <div class="container">
        <div class="item">
          <div class="container-v">
            <div class="item"><div class="circle"></div>親子繪本</div>
            <div class="item">家⾧學習</div>
            <div class="item">兒童學習</div>
            <div class="item">智能工具</div>
          </div>
        </div>
        <div class="item">
        <div class="container-v">
            <div class="item">
            <div class="container-h">
            <div class="item">作品</div>
            <div class="item">框架</div>
            <div class="item">模式</div>
          </div>
            </div>
            <div class="option-list-box">
              <div class="option-list">

                <div class="option-block">hbj</div>
                <div class="option-block">jbkj</div>
                <div class="option-block">jbkjasdf</div>
                <div class="option-block">sadf</div>
                <div class="option-block">sadf</div>
                <div class="option-block">sadf</div>
                <div class="option-block">sadf</div>
              </div>
            </div>
          </div>


        </div>
        <div class="item">
          <div class="main-screen"></div>
        </div>
      </div>


    `;
  }
}
// <sl-button href="${resolveRouterPath('about')}" variant="primary">Navigate to About</sl-button>