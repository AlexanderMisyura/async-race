import { getRandom } from '@utils/get-random';

import track_1 from '../../assets/audio/track_1.mp3';
import track_2 from '../../assets/audio/track_2.mp3';
import track_3 from '../../assets/audio/track_3.mp3';

const NEXT = 1;
const DEFAULT_FIRST_TRACK = 0;
const DEFAULT_LAST_TRACK = 2;
const firstTrack = getRandom(DEFAULT_FIRST_TRACK, DEFAULT_LAST_TRACK);

class AudioController {
  public isPlaying = false;
  public tracks = [new Audio(track_1), new Audio(track_2), new Audio(track_3)];

  constructor() {
    for (const [index, track] of this.tracks.entries()) {
      track.preload = 'auto';
      track.addEventListener('ended', () => {
        track.currentTime = 0;
        void this.tracks[(index + NEXT) % this.tracks.length].play();
      });
    }
  }

  public playCurrentTrack(): void {
    this.isPlaying = true;
    void this.tracks[firstTrack].play();
  }

  public pauseTrack(): void {
    for (const track of this.tracks) {
      this.isPlaying = false;
      track.pause();
    }
  }
}

export default new AudioController();
