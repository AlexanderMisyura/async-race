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
    });

    this.getElement().append(this.guitarSvg);

    this.addListener('click', () => this.handleClick());
  }

  private handleClick(): void {
    if (audioController.isPlaying) {
      this.pause();
      this.guitarSvg.style.color = 'black';
    } else {
      this.play();
      this.guitarSvg.style.color = 'red';
    }
  }

  private play(): void {
    audioController.playCurrentTrack();
  }

  private pause(): void {
    audioController.pauseTrack();
  }
}
