import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { Subscription } from 'rxjs';
import { AdviceGeneric } from '../models/advice.model';
import { CompleteAnswerSet } from '../models/all-answers.model';
import { InfoGeneric } from '../models/info.model';
import { AdviceSave } from '../models/save-advice.model';
import { UserDataSave } from '../models/save-user-data.model';
import { AdviceService } from '../services/advice-boxes.service';
import { AllAnswers } from '../services/all-answers.service';
import { InfoService } from '../services/info-boxes.service';

@Component({
  selector: 'app-wildlife-layout',
  templateUrl: './wildlife-layout.component.html',
  styleUrls: ['./wildlife-layout.component.scss']
})
export class WildlifeLayoutComponent implements OnInit {

  /**********************************************************************
   **********************************************************************
   *** LOGIC TO HIDE/UNHIDE PAGE ELEMENTS AND CHOOSE ADVICE/INFO BOXES **
   **********************************************************************
   ***********************************************************************/

  public multichoiceShow: boolean = true;
  public responseShow: boolean = false;

  private ourPollinatorsService: Subscription = new Subscription();
  private ourAdviceService: Subscription = new Subscription();
  private ourInfoService: Subscription = new Subscription();
  private extraSub: Subscription = new Subscription();

  public specialInfoOne: InfoGeneric = {"Title": "", "Special": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "BodyText": ""};
  public ourSpecialAdvice: InfoGeneric[] = [this.specialInfoOne];

  public hedgehogAdviceOne: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public hedgehogAdviceTwo: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public hedgehogAdviceThree: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public ourHedgehogAdvice: AdviceGeneric[] = [this.hedgehogAdviceOne, this.hedgehogAdviceTwo, this.hedgehogAdviceThree];
  
  public hedgehogInfoOne: InfoGeneric = {"Title": "", "Special": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "BodyText": ""};
  public ourHedgehogInfo: InfoGeneric[] = [this.hedgehogInfoOne];

  public birdAdviceOne: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public birdAdviceTwo: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public birdAdviceThree: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public birdAdviceFour: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public ourBirdsAdvice: AdviceGeneric[] = [this.birdAdviceOne, this.birdAdviceTwo, this.birdAdviceThree, this.birdAdviceFour];

  public birdInfoOne: InfoGeneric = {"Title": "", "Special": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "BodyText": ""};
  public birdInfoTwo: InfoGeneric = {"Title": "", "Special": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "BodyText": ""};
  public ourBirdsInfo: InfoGeneric[] = [this.birdInfoOne, this.birdInfoTwo];

  public insectAdviceOne: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public insectAdviceTwo: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public insectAdviceThree: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public insectAdviceFour: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public insectAdviceFive: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public insectAdviceSix: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public ourInsectsAdvice: AdviceGeneric[] = [this.insectAdviceOne, this.insectAdviceTwo, this.insectAdviceThree, this.insectAdviceFour, this.insectAdviceFive, this.insectAdviceSix];

  public insectInfoOne: InfoGeneric = {"Title": "", "Special": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "BodyText": ""};
  public insectInfoTwo: InfoGeneric = {"Title": "", "Special": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "BodyText": ""};
  public insectInfoThree: InfoGeneric = {"Title": "", "Special": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "BodyText": ""};
  public ourInsectsInfo: InfoGeneric[] = [this.insectInfoOne, this.insectInfoTwo, this.insectInfoThree];

  public frogAdviceOne: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public frogAdviceTwo: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public frogAdviceThree: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public ourFrogsAdvice: AdviceGeneric[] = [this.frogAdviceOne, this.frogAdviceTwo, this.frogAdviceThree];

  private hedgehogCountAdvice: number = 0;
  private birdCountAdvice: number = 0;
  private insectCountAdvice: number = 0;
  private frogCountAdvice: number = 0;

  private hedgehogCountInfo: number = 0;
  private birdCountInfo: number = 0;
  private insectCountInfo: number = 0;
  private specialCountInfo: number = 0;

  private readonly NUM_FIRST_DISPLAY: number = 1;

  public ourSubheader: String = "";

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public allAnswersService: AllAnswers, public adviceService: AdviceService, public infoService: InfoService, private httpClient: HttpClient) {
    this.ourPollinatorsService = this.allAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers: CompleteAnswerSet) => {
      //Get location from retrievedAnswers
      this.longitude = retrievedAnswers.longitude;
      this.latitude = retrievedAnswers.latitude;
      this.ourSubheader = this.getOurSubheader(retrievedAnswers);

      document.getElementById('allresults')!.classList.remove('hiddenElem');
      this.multichoiceShow = false;
      this.responseShow = true;
    },
    err => {
      console.log(err);
    });
    this.fetchAdvice();
    this.fetchInfo();
  }

  private getOurSubheader(retrievedAnswers: CompleteAnswerSet) : String{
    let tempSubheader = "";
    tempSubheader = tempSubheader + "You said you have <b>" + this.getSoilString(retrievedAnswers.soil) + "</b>, <b>" + this.getPHString(retrievedAnswers.ph) + "</b>. " +
    "You said you have <b>" + this.getGardenSizeString(retrievedAnswers.gardenSize) + "</b>, which experiences <b>" + this.getShadinessString(retrievedAnswers.shade) + "</b>. From your location we worked out that plants with a USDA hardiness level of <b>" + retrievedAnswers.hardiness + "</b> or above should be able to thrive in your garden.<br>";
    tempSubheader = tempSubheader + this.getOptionsString(retrievedAnswers);
    return tempSubheader;
  }

  private getSoilString(soil: String) : String{
    if(soil == "SoilLight"){
      return "Light-Weight";
    }
    else if(soil == "SoilMedium"){
      return "Medium-Weight";
    }
    else {
      return "Heavy-Weight";
    }
  }

  private getPHString(PH: String): String{
    if(PH == "PHAcid"){
      return "Acidic Soil";
    }
    else if(PH == "PHNeutral"){
      return "Neutral Soil";
    }
    else {
      return "Alkaline (Basic) Soil";
    }
  }

  private getShadinessString(shadiness: String): String{
    if(shadiness == "ShadeFull"){
      return "Heavy Shade";
    }
    else if(shadiness == "ShadeSemi"){
      return "Medium Shade";
    }
    else {
      return "No Shade";
    }
  }

  private getGardenSizeString(size: String): String{
    if(size == "WindoxBox"){
      return "A Window Box";
    }
    else if(size == "OutdoorPlantPots"){
      return "Outdoor Plant Pots";
    }
    else if(size == "SmallGarden"){
      return "A Small Garden";
    }
    else if(size == "LargeGarden"){
      return "A Large Garden";
    }
    else if(size == "Allotment"){
      return "An Allotment";
    }
    else {
      return "A Field or Multiple Fields";
    }
  }

  private getOptionsString(retrievedAnswers: CompleteAnswerSet): String{
    let tempSubheader = "";
    if(retrievedAnswers.childFriendly != "" || retrievedAnswers.cheap != "" || retrievedAnswers.easy != "" || retrievedAnswers.renting != "" || retrievedAnswers.pavedGardens != ""){
      tempSubheader = tempSubheader + "You said you were particularly interested in suggestions which were: ";
      if(retrievedAnswers.childFriendly != ""){
        tempSubheader = tempSubheader + "<b>Child-friendly </b>";
      }
      if(retrievedAnswers.cheap != ""){
        tempSubheader = tempSubheader + "<b>Cheap </b>";
      }
      if(retrievedAnswers.easy != ""){
        tempSubheader = tempSubheader + "<b>Easy </b>";
      }
      if(retrievedAnswers.renting != ""){
        tempSubheader = tempSubheader + "<b>Good for Renters </b>";
      }
      if(retrievedAnswers.pavedGardens != ""){
        tempSubheader = tempSubheader + "<b>Good for Paved Gardens </b>";
      }
    }
    return tempSubheader;
  }

  private fetchAdvice(){
    this.ourAdviceService = this.adviceService.getAnswerUpdateListener().subscribe((retrievedAdvice: AdviceGeneric[]) => {
      for(let i = 0; i < retrievedAdvice.length; i++){
        if(retrievedAdvice[i].Hedgehogs == "Y"){
          this.ourHedgehogAdvice[this.hedgehogCountAdvice] = retrievedAdvice[i];
          //Only automatically display the first piece of advice- the rest will be displayed with 'see more'
          if(this.hedgehogCountAdvice < this.NUM_FIRST_DISPLAY){
            //If there is a piece of hedgehog advice to show, show title and 'see more' button
            //It's in this 'if' because we don't want it called too many times unecessarily
            document.getElementById('hedgehogTitle')!.classList.remove('hiddenElem');
            document.getElementById('hedgehogButton')!.classList.remove('hiddenElem');
            //Show first piece of advice
            document.getElementById('hedgehogAdviceID' + this.hedgehogCountAdvice)!.classList.remove('hiddenElem');
          }
          this.hedgehogCountAdvice++;
        }
        if(retrievedAdvice[i].Birds == "Y"){
          this.ourBirdsAdvice[this.birdCountAdvice] = retrievedAdvice[i];
          if(this.birdCountAdvice < this.NUM_FIRST_DISPLAY){
            document.getElementById('birdsTitle')!.classList.remove('hiddenElem');
            document.getElementById('birdsButton')!.classList.remove('hiddenElem');
            document.getElementById('birdsAdviceID' + this.birdCountAdvice)!.classList.remove('hiddenElem');
          }
          this.birdCountAdvice++;
        }
        if(retrievedAdvice[i].Insects == "Y"){
          this.ourInsectsAdvice[this.insectCountAdvice] = retrievedAdvice[i];
          if(this.insectCountAdvice < this.NUM_FIRST_DISPLAY){
            document.getElementById('insectsTitle')!.classList.remove('hiddenElem');
            document.getElementById('insectsButton')!.classList.remove('hiddenElem');
            document.getElementById('insectsAdviceID' + this.insectCountAdvice)!.classList.remove('hiddenElem');
          }
          this.insectCountAdvice++;
        }
        if(retrievedAdvice[i].Amphibians == "Y"){
          this.ourFrogsAdvice[this.frogCountAdvice] = retrievedAdvice[i];
          if(this.frogCountAdvice < this.NUM_FIRST_DISPLAY){
            document.getElementById('frogTitle')!.classList.remove('hiddenElem');
            document.getElementById('frogButton')!.classList.remove('hiddenElem');
            document.getElementById('frogsAdviceID' + this.frogCountAdvice)!.classList.remove('hiddenElem');
          }
          this.frogCountAdvice++;
        }
      }
    },
    err => {
      console.log(err);
    });
  }

  private fetchInfo(){
    this.ourInfoService = this.infoService.getAnswerUpdateListener().subscribe((retrievedInfo: InfoGeneric[]) => {
      for(let j = 0; j < retrievedInfo.length; j++){
        if(retrievedInfo[j].Special == "Y"){
          this.ourSpecialAdvice[this.specialCountInfo] = retrievedInfo[j];
          this.specialCountInfo++;
        }
        if(retrievedInfo[j].Hedgehogs == "Y"){
          this.ourHedgehogInfo[this.hedgehogCountInfo] = retrievedInfo[j];
          this.hedgehogCountInfo++;
        }
        if(retrievedInfo[j].Birds == "Y"){
          this.ourBirdsInfo[this.birdCountInfo] = retrievedInfo[j];
          this.birdCountInfo++;
        }
        if(retrievedInfo[j].Insects == "Y"){
          this.ourInsectsInfo[this.insectCountInfo] = retrievedInfo[j];
          this.insectCountInfo++;
        }
      }
    },
    err => {
      console.log(err);
    });
  }

  public seeMoreInsect(){
    for(let a = 0; a < this.insectCountAdvice; a++){
      document.getElementById('insectsAdviceID' + a)!.classList.remove('hiddenElem');
    }
    for(let b = 0; b < this.insectCountInfo; b++){
      document.getElementById('InsectInfoID' + b)!.classList.remove('hiddenElem');
    }
    document.getElementById('insectsButton')!.classList.add('hiddenElem');
    document.getElementById('insectsButtonLess')!.classList.remove('hiddenElem');
  }

  public seeMoreHedgehog(){
    for(let c = 0; c < this.hedgehogCountAdvice; c++){
      document.getElementById('hedgehogAdviceID' + c)!.classList.remove('hiddenElem');
    }
    for(let d = 0; d < this.hedgehogCountInfo; d++){
      document.getElementById('HedgehogInfoID' + d)!.classList.remove('hiddenElem');
    }
    document.getElementById('hedgehogButton')!.classList.add('hiddenElem');
    document.getElementById('hedgehogButtonLess')!.classList.remove('hiddenElem');
  }

  public seeMoreBird(){
    for(let e = 0; e < this.birdCountAdvice; e++){
      document.getElementById('birdsAdviceID' + e)!.classList.remove('hiddenElem');
    }
    for(let d = 0; d < this.birdCountInfo; d++){
      document.getElementById('BirdInfoID' + d)!.classList.remove('hiddenElem');
    }
    document.getElementById('birdsButton')!.classList.add('hiddenElem');
    document.getElementById('birdsButtonLess')!.classList.remove('hiddenElem');
  }

  public seeMoreFrog(){
    for(let f = 0; f < this.frogCountAdvice; f++){
      document.getElementById('frogsAdviceID' + f)!.classList.remove('hiddenElem');
    }
    document.getElementById('frogButton')!.classList.add('hiddenElem');
    document.getElementById('frogButtonLess')!.classList.remove('hiddenElem');
  }

  public seeLessInsect(){
    //hide all except first piece of advice
    for(let g = this.NUM_FIRST_DISPLAY; g < this.insectCountAdvice; g++){
      document.getElementById('insectsAdviceID' + g)!.classList.add('hiddenElem');
    }
    for(let h = 0; h < this.insectCountInfo; h++){
      document.getElementById('InsectInfoID' + h)!.classList.add('hiddenElem');
    }
    document.getElementById('insectsButton')!.classList.remove('hiddenElem');
    document.getElementById('insectsButtonLess')!.classList.add('hiddenElem');
  }

  public seeLessHedgehog(){
    for(let k = this.NUM_FIRST_DISPLAY; k < this.hedgehogCountAdvice; k++){
      document.getElementById('hedgehomAdviceID' + k)!.classList.add('hiddenElem');
    }
    for(let l = 0; l < this.hedgehogCountInfo; l++){
      document.getElementById('HedgehogInfoID' + l)!.classList.add('hiddenElem');
    }
    document.getElementById('hedgehogButton')!.classList.remove('hiddenElem');
    document.getElementById('hedgehogButtonLess')!.classList.add('hiddenElem');
  }

  public seeLessBird(){
    for(let m = this.NUM_FIRST_DISPLAY; m < this.birdCountAdvice; m++){
      document.getElementById('birdsAdviceID' + m)!.classList.add('hiddenElem');
    }
    for(let n = 0; n < this.birdCountInfo; n++){
      document.getElementById('BirdInfoID' + n)!.classList.add('hiddenElem');
    }
    document.getElementById('birdsButton')!.classList.remove('hiddenElem');
    document.getElementById('birdsButtonLess')!.classList.add('hiddenElem');
  }

  public seeLessFrog(){
    for(let o = this.NUM_FIRST_DISPLAY; o < this.frogCountAdvice; o++){
      document.getElementById('frogsAdviceID' + o)!.classList.add('hiddenElem');
    }
    document.getElementById('frogButton')!.classList.remove('hiddenElem');
    document.getElementById('frogButtonLess')!.classList.add('hiddenElem')
  }

  ngOnInit(): void {
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    this.ourPollinatorsService.unsubscribe();
    this.ourAdviceService.unsubscribe();
    this.ourInfoService.unsubscribe();
    this.extraSub.unsubscribe();
    // ******* We were experiencing a problem where, if you navigated away from the advice page and back and then
    //tried to get more advice it would crash the site. This is (presumably?) because there was still data being held by
    //the wildlife-advice-page components, so that when more data was added was inserted into the components the site crashed.
    //This is a very imperfect fix for this problem. '@HostListener('unloaded')' assures that whenever we exit the advice page,
    //ngOnDestroy() is called. 'window.location.reload();' then triggers the page (and therefore site) to reload. This prevents the crash. This is 
    //against the principle of a single page application, and so will be the first thing to fix if we have time!
    window.location.reload();
  }

  /**********************************************************************
   **********************************************************************
   ********* LOGIC TO HANDLE ADVICE THAT WILL BE SAVED AS GEOJSON ********
   **********************************************************************
   ***********************************************************************/

  //the email that the user has submitted
  private email = "";

  //the user's longitude and latitude
  public longitude: Number = 0; 
  public latitude: Number = 0; 

  //array which holds saved advice 
  private savedAdvice: AdviceSave[] = [];

  /* An array of saved advice is created and passed to all children. When 'save this advice' is clicked in an advice box, it adds a data entry to this
  array. When a user submits their email, this array is wrapped up with the email and location (retrieved from CompleteAnswerSet) and added to the database as geojson.
  Therefore, it may be useful to generate longitude/latitude in locationInfo.
  We can also create a InYourLocalArea component which takes the user's location and searches the same database for people who are near enough to give advice.*/

  public addAdvice(advice: AdviceSave) {
    this.savedAdvice.push(advice);
  }

  public removeAdvice(advice: String) {
    this.savedAdvice.forEach((value,index)=>{
      if(value.Header==advice){
        this.savedAdvice.splice(index,1);
      }
    });  
  }

  //Triggered by processEmailData() below
  private saveUserData(){
    //Correct order of coordinates in geojson is [longitude, latitude, elevation] https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.1
    const geoJsonObj: UserDataSave = {
      "type": "Feature",
      "properties": {
        "email": this.email,
        "savedAdvice": this.savedAdvice,
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          this.longitude, this.latitude
        ]
      }
    };
    //************* this line may not need to include a .subscribe()
    //check for err????
    this.extraSub = this.httpClient.post("http://localhost:3000/api/userData", geoJsonObj).subscribe();
  }

  /***********************************************************************
   ***********************************************************************
   ************************ LOGIC TO HANDLE EMAILS ***********************
   ***********************************************************************
   ***********************************************************************/

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

  public processEmailData(){
    this.email = this.emailFormControl.value;
    this.sendEmail()
    this.saveUserData();
  }

  private sendEmail(){
    if(this.savedAdvice.length == 0){
      alert("You haven't saved any advice yet! Please select some advice and then re-enter your email.");
    }
    else{
      const emailContent = { email: this.email, emailBody: this.getEmailContent()};
      axios.post('http://localhost:3000/api/sendmail', emailContent)
      .then(response => {
        alert("An email was sent to " + this.email + ". Happy gardening!");
      })
      .catch(error => {
          console.error('There was an error!', error);
      });
    }
  }

  private getEmailContent(): String{
    let htmlString: String = '<head><link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet"></head><body>' + 
        '<p style="text-align: center; font-family:' + "'Playfair Display'" + ', serif; font-size: 30px;">Thank you for using Rewild My Garden!</p>' +
        '<p style="text-align: center; font-size: 20px">Please see the advice you saved below: </p><br>';

    for(let i=0; i<this.savedAdvice.length; i++){
      htmlString = htmlString +"<div>" +
        "<div>" +
          '<p style="font-family:' + "'Playfair Display'" + ', serif; font-size: 20px; line-height: 0.8;">' + this.savedAdvice[i].Header + '</p>' +
          "<p><b>" + this.savedAdvice[i].Justification + "</b></p>" +
          "<p>" + this.savedAdvice[i].BodyText + "</p>" +
        '</div>' +
        '<br>';
    }
    htmlString = htmlString + "</body>"
    return htmlString;
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
