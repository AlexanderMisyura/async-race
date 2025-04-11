import BaseComponent from '@components/base-component';
import createSvgChunk from '@components/create-svg-chunk';

import guitarImage from '../../assets/img/guitar.svg';
import * as styles from './audio-button.module.scss';
import audioController from './audio-controller';

export default class AudioButton extends BaseComponent<'button'> {
  private guitarSvg = createSvgChunk(guitarImage, ['iconExtraSmall']);

  constructor() {
    super({
      elementTag: 'button',
      classes: [styles.audioButton, 'button'],
      title: 'Play hell metal',
    });

    this.getElement().append(this.guitarSvg);

    this.addListener('click', () => this.handleClick());
  }

  private handleClick(): void {
    if (audioController.isPlaying) {
      this.pause();
      this.removeClasses(styles.active);
    } else {
      this.play();
      this.addClasses(styles.active);
    }
  }

  private play(): void {
    audioController.playRandomTrack();
  }

  private pause(): void {
    audioController.stopTrack();
  }
}
