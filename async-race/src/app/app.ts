import './styles/global.scss';

import Page from '@components/page/page';
import machine from '@state-machine/machine';

export default class App {
  private page: Page;

  constructor() {
    this.page = new Page();
  }

  public init(): void {
    void machine
      .makeTransition('state:initial', 'initialize')
      .then(() => this.page.mount());
  }
}
