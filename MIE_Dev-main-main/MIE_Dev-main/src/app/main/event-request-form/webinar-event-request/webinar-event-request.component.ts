import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/shared/services/event-utility/utility-service.service';

@Component({
  selector: 'app-webinar-event-request',
  templateUrl: './webinar-event-request.component.html',
  styleUrls: ['./webinar-event-request.component.css']
})
export class WebinarEventRequestComponent implements OnInit {
  eventInitiation1 : FormGroup;
  eventInitiation2 : FormGroup;
  eventInitiation3 : FormGroup;
  
  // Event Initiation Form2 Control
  static startTime : any;
  eventDetails : any;
  eventType : string = 'EVTWEB';
  eventDate : string ;
  show30DaysUploaDeviation: boolean = false;
  show7DaysUploadDeviation : boolean = false;
  showVendornameandupload : boolean = false;
  isStep1Valid : boolean = false;
  isStep2Valid : boolean = false;
  //Min Date
  today:string = new Date().toISOString().split('T')[0];


  constructor( private utilityService : UtilityService) {
    this.eventInitiation1 = new FormGroup({
      withIn30DaysDeviation : new FormControl(''),
      eventDate : new FormControl('',Validators.required),
      next7DaysDeviation : new FormControl('')
    })

    this.eventInitiation2 = new FormGroup({
      eventTopic : new FormControl('', [Validators.required]),     
      startTime : new FormControl('',[Validators.required]),
      endTime : new FormControl('',endTimeValidator),
      meetingType : new FormControl('',[Validators.required])
    })

    this.eventInitiation3 = new FormGroup({
      
    })
    

    this.filterEventsWithIn30Days(utilityService.getPreviousEvents());
    
  }

   
  

  ngOnInit(): void {
    this.event2FormPrepopulate();
  }

  eventsWithin30Days: any[] =[] ;
  filterEventsWithIn30Days(eventList:any){
    if(Boolean(eventList) && eventList.length > 0){
      console.log(this.eventsWithin30Days);
      eventList.forEach(event => {
        let today : any = new Date();
        // console.log(event.EventDate)
        if(event.EventDate){
          let eventDate : any = new Date(event.EventDate);
          if(eventDate > today){
           
            let Difference_In_Time = eventDate.getTime() - today.getTime();
   
            // To calculate the no. of days between two dates
            let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
  
            if(Difference_In_Days <= 30){
              this.eventsWithin30Days.push(event)
            }
            if(Difference_In_Days <= 7){
              this.show7DaysUploadDeviation = true;
            }
           
            if(this.eventInitiation1.valid){
              this.isStep1Valid = true;
            }
            
            else this.isStep1Valid = false;
          }
          }
       
      })
    }

    // this.pageLoaded = true
    if(this.eventsWithin30Days.length > 0){
      this.show30DaysUploaDeviation = true;
    }
    console.log(this.eventsWithin30Days)
    

  }

  event2FormPrepopulate(){
    this.eventInitiation2.valueChanges.subscribe(changes => {
      if(changes.startTime){
        // console.log(changes.startTime)
        WebinarEventRequestComponent.startTime = changes.startTime;
      }
      
      if(changes.meetingType == 'Vendor')
      {
        this.showVendornameandupload = true;
      }
      else{
        this.showVendornameandupload = false;
      }
      

      this.isStep2Valid = (this.eventInitiation2.valid)? true : false;
    })

  }

 

}
function endTimeValidator(control : AbstractControl): ValidationErrors | null{
  
  console.log(WebinarEventRequestComponent.startTime)
  if(WebinarEventRequestComponent.startTime < control.value){
    // console.log("Yes")
    return null;
  }
  else{
    return {customError : true}
  }
 
}

