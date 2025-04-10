import { getRandom } from '@utils/get-random';

import track_1 from '../../assets/audio/track_1.mp3';
import track_2 from '../../assets/audio/track_2.mp3';
import track_3 from '../../assets/audio/track_3.mp3';
import track_4 from '../../assets/audio/track_4.mp3';
import track_5 from '../../assets/audio/track_5.mp3';
import track_6 from '../../assets/audio/track_6.mp3';

const NEXT = 1;
const DEFAULT_FIRST_TRACK = 0;
const ARRAY_OFFSET = 1;

class AudioController {
  public isPlaying = false;
  public tracks = [
    new Audio(track_1),
    new Audio(track_2),
    new Audio(track_3),
    new Audio(track_4),
    new Audio(track_5),
    new Audio(track_6),
  ];

  constructor() {
    for (const [index, track] of this.tracks.entries()) {
      track.preload = 'auto';
      track.addEventListener('ended', () => {
        track.currentTime = 0;
        void this.tracks[(index + NEXT) % this.tracks.length].play();
      });
    }
  }

  public playRandomTrack(): void {
    this.isPlaying = true;
    void this.tracks[
      getRandom(DEFAULT_FIRST_TRACK, this.tracks.length - ARRAY_OFFSET)
    ].play();
  }

  public stopTrack(): void {
    for (const track of this.tracks) {
      this.isPlaying = false;
      track.pause();
      track.currentTime = 0;
    }
  }
}

export default new AudioController();
