import { Step } from "./models/step.model";
import { Routes } from "./routes";

export const defaultSteps: Step[] = [
  {
    id: "0",
    name: "Step 1",
    tools: "nice tools",
    information: "cut into eye",
    complications: "many",
    videos: [
      { path: "video_1_Katarakt.webm", fileName: "1_Katarakt.webm" },
      { path: "video_1_Katarakt.webm", fileName: "1_Katarakt.webm" }
    ],
    instructionVideoSource: Routes.VIDEO_FOLDER + "/video_1_Katarakt.mp4"
  },
  {
    id: "1",
    name: "Step 2",
    tools: "more nice tools",
    information: "cut deeper into eye",
    complications: "many more",
    videos: [
      { path: "video_2_Katarakt.webm", fileName: "2_Katarakt.webm" },
      { path: "video_2_Katarakt.webm", fileName: "2_Katarakt.webm" }
    ],
    instructionVideoSource: Routes.VIDEO_FOLDER + "/video_2_Katarakt.mp4"
  },
  {
    id: "2",
    name: "Step 3",
    tools: "the best tools",
    information: "remove the eye",
    complications: "no vision",
    videos: [
      { path: "video_3_Katarakt.webm", fileName: "3_Katarakt.webm" },
      { path: "video_3_Katarakt.webm", fileName: "3_Katarakt.webm" }
    ],
    instructionVideoSource: Routes.VIDEO_FOLDER + "/video_3_Katarakt.mp4"
  }
];
