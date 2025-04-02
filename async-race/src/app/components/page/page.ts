import BaseComponent from '@components/base-component';
import Garage from '@components/garage/garage';
import tag from '@components/utility-components';
import Winners from '@components/winners/winners';
import type { PageView } from '@ts-types';

import EmitterViewManager from './event-emitter-view-manager';
import * as styles from './page.module.scss';

export default class Page extends BaseComponent<'main'> {
  private garage: Garage = new Garage();
  private winners: Winners = new Winners();
  private winnersButton: BaseComponent<'button'>;
  private garageButton: BaseComponent<'button'>;
  private pageContainer: BaseComponent;
  private viewManager: EmitterViewManager = new EmitterViewManager();
  private readonly events = {
    changeView: 'changeView',
  } as const;
  private currentView: PageView = 'garage';

  constructor() {
    super({ elementTag: 'main', classes: [styles.main] });

    const heading = tag.h1({
      classes: [styles.heading],
      text: `Welcome to Async Tractor Race !!!`,
    });

    this.winnersButton = tag.button(
      {
        classes: [styles.viewButton, styles.toWinners, styles.active, 'button'],
        onclick: () => this.triggerViewChange('winners'),
      },
      tag.div({ classes: [styles.buttonText], text: 'winners >>' })
    );

    this.garageButton = tag.button(
      {
        classes: [styles.viewButton, styles.toGarage, 'button'],
        onclick: () => this.triggerViewChange('garage'),
      },
      tag.div({ classes: [styles.buttonText], text: '<< garage' })
    );

    const buttonsContainer = tag.div(
      { classes: [styles.buttonsContainer] },
      this.winnersButton,
      this.garageButton
    );

    this.pageContainer = tag.div({ classes: [styles.page] });
    this.pageContainer.appendSingle(this.garage);

    this.appendChildren(heading, buttonsContainer, this.pageContainer);

    this.viewManager.on(this.events.changeView, this.changeView.bind(this));
  }

  public mount(): void {
    document.body.append(this.getElement());
  }

  private triggerViewChange(payload: PageView): void {
    this.viewManager.emit(this.events.changeView, payload);
  }

  private changeView(pageView: PageView): void {
    if (this.currentView !== pageView) {
      this.currentView = pageView;
      this.garageButton.toggleClasses(styles.active);
      this.winnersButton.toggleClasses(styles.active);

      if (pageView === 'garage') {
        this.changeContent(this.garage);
      } else if (pageView === 'winners') {
        this.changeContent(this.winners);
      }
    }
  }

  private changeContent(newContent: BaseComponent): void {
    this.pageContainer.getElement().replaceChildren(newContent.getElement());
  }
}
