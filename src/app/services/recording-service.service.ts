import { Injectable, NgZone } from "@angular/core";
import * as RecordRTC from "recordrtc";
import * as moment from "moment";
import { Observable, Subject } from "rxjs";
import { isNullOrUndefined } from "util";
import { RecordedVideo } from "../models/recorded-video.model";

@Injectable({ providedIn: "root" })
export class RecordingService {
  private stream;
  private recorder;
  private interval;
  private startTime;
  private recorded$ = new Subject<RecordedVideo>();
  private recordingTime$ = new Subject<string>();
  private recordingFailed$ = new Subject<string>();

  getRecordedBlob(): Observable<RecordedVideo> {
    return this.recorded$.asObservable();
  }

  getRecordedTime(): Observable<string> {
    return this.recordingTime$.asObservable();
  }

  recordingFailed(): Observable<string> {
    return this.recordingFailed$.asObservable();
  }

  async startRecording() {
    if (this.recorder) {
      // It means recording is already started or it is already recording something
      return;
    }

    this.recordingTime$.next("00:00");
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });
    this.record();
  }

  abortRecording() {
    this.stopMedia();
  }

  private async record() {
    this.recorder = new RecordRTC.RecordRTCPromisesHandler(this.stream, {
      type: "video",
      mimeType: "video/webm"
    });

    this.recorder.startRecording();
  }

  async stopRecording(): Promise<Blob | Error> {
    try {
      await this.recorder.stopRecording();
      const blob = await this.recorder.getBlob();
      return blob;
    } catch (err) {
      return err;
    }
  }

  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      // if (this.stream) {
      //   this.stream.getVideoTracks().forEach(track => track.stop());
      //   this.stream = null;
      // }
    }
  }
}
