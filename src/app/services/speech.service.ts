import { Injectable } from '@angular/core';
import { resultList, RxSpeechRecognitionService } from '@kamiazya/ngx-speech-recognition';
import { Subject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { WhiteListedAction } from './white-listed-action.enum';

@Injectable({ providedIn: 'root' })
export class SpeechService {
    private recognizedActions$: Subject<WhiteListedAction[]> = new Subject();

    constructor(public speechRecognitionService: RxSpeechRecognitionService) {
    }

    start() {
        this.speechRecognitionService
            .listen()
            .pipe(
                resultList,
                map((list: SpeechRecognitionResultList) => list.item(list.length - 1)),
                map((result: SpeechRecognitionResult) => result.item(0)),
                filter((result: SpeechRecognitionAlternative)  => result.confidence > 0.5),
                map((result: SpeechRecognitionAlternative)  => result.transcript.trim()),
                tap((result: string)  => console.log(`Speech Recognizer heard: "${result}"`)),
                map((result: string) => {
                    const results = result.split(' ').map(partialResult => partialResult.toLowerCase());
                    const filtered = results.filter(partialResult => Object.values(WhiteListedAction).includes(partialResult as any));
                    return filtered as unknown as WhiteListedAction[];
                })
            )
            .subscribe((results: WhiteListedAction[]) => {
                console.log('Speech actions recognized', results);
                this.recognizedActions$.next(results);
            });
    }

    listen() {
        return this.recognizedActions$.asObservable();
    }
}
