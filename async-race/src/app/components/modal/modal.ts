import BaseComponent from '@components/base-component';
import tag from '@components/utility-components';

import * as styles from './modal.module.scss';

class Modal extends BaseComponent<'dialog'> {
  public modalControls = {
    showModal: this.showModal.bind(this),
    closeModal: this.closeModal.bind(this),
    closeModalButton: tag.button({
      text: 'Hail !!!',
      classes: ['button', styles.closeBtn],
      onclick: this.closeModal.bind(this),
    }),
  };

  private content: BaseComponent | undefined;
  private isOpen: boolean = false;

  constructor() {
    super({ elementTag: 'dialog', classes: [styles.modal] });

    this.addListeners();
  }

  public showModal(
    component: BaseComponent<keyof HTMLElementTagNameMap>
  ): void {
    if (this.isOpen) return;

    this.isOpen = true;
    this.createModal();
    document.body.append(this.getElement());
    if (this.content)
      this.content.getElement().replaceChildren(component.getElement());
    this.element.showModal();
  }

  private addListeners(): void {
    this.addListener('click', (event: Event) => {
      if (event.target === event.currentTarget) this.element.close();
    });

    this.addListener('close', () => {
      this.content?.removeSelf();
      this.getElement().remove();
    });
  }

  private createModal(): void {
    this.content = tag.div({ classes: [styles.content] });
    this.appendChildren(this.content, this.modalControls.closeModalButton);
  }

  private closeModal(event: Event): void {
    event.preventDefault();

    this.isOpen = false;
    this.getElement().close();
    this.content?.removeSelf();
    this.getElement().remove();
  }
}

export const modal = new Modal();
