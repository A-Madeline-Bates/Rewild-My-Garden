import { Injectable } from '@angular/core';
import { WildlifeAnswerSet } from '../models/multichoice-answers.model';
import { Observable, Subject } from 'rxjs';

//Could use this data to create a "users near you have save said they have X soil type" response ******

@Injectable({providedIn: 'root'})
export class WildlifeAnswers{

    private updatedAnswers = new Subject<WildlifeAnswerSet>();

    getAnswerUpdateListener(): Observable<any>{
        return this.updatedAnswers.asObservable();
    }

    addAnswerSet(soilAnswer: String, phAnswer: String, shadeAnswer: String, sizeAnswer: String){
        const ourAnswer: WildlifeAnswerSet = {soil: soilAnswer, ph: phAnswer, shade: shadeAnswer, gardenSize: sizeAnswer};
        //This is the equivalent of .emit- it sets a copy of the posts after they have been updated
        //The three methods that can be called on our observable are .next(), .error() and .complete()
        this.updatedAnswers.next(ourAnswer);
    }
}