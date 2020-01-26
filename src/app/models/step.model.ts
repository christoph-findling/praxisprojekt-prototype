import { RecordedVideo } from "./recorded-video.model";
import { StoredVideo } from "./stored-video.model";

export interface Step {
  id: number;
  name: string;
  tools: string;
  information: string;
  complications: string;
  videos: StoredVideo[];
}
