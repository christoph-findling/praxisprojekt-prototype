import { RecordedVideo } from "./recorded-video.model";

export interface Step {
  id: number;
  name: string;
  tools: string;
  information: string;
  complications: string;
  videos: RecordedVideo[];
}
