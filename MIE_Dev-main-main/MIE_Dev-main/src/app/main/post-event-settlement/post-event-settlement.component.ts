import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/shared/services/event-utility/utility-service.service';

@Component({
  selector: 'app-post-event-settlement',
  templateUrl: './post-event-settlement.component.html',
  styleUrls: ['./post-event-settlement.component.css']
})

export class PostEventSettlementComponent implements OnInit {
  PostEventSettlement : FormGroup;
 
 
  stepper: any;
  isUploadShows:boolean=false;
  isUploadGST:boolean=false;
  show30DaysUpload:boolean=false;
 
  invitees : any;
  inviteeTableIsPresentCheckBox : any[] = [];
  totalAttendance : number = 0;
 
  showInviteeDeviation : boolean = false;
 
 
    constructor(private utilityService : UtilityService) {
 
      this.PostEventSettlement = new FormGroup({
       // dayssince: new FormControl('',Validators.required),
        uploadDeviation: new FormControl('',Validators.required),
        TotalAttendance: new FormControl('',Validators.required),
        itCompanysBTCBTE: new FormControl('',Validators.required),
        Expense: new FormControl('',Validators.required),
        costperparticipant: new FormControl('',Validators.required),
        Amount: new FormControl('',Validators.required),
        CostperparticipantINR: new FormControl('',Validators.required),
        includingGST: new FormControl('',Validators.required),
        uploadDeviation1: new FormControl('',Validators.required),
        actualAmount : new FormControl(''),
        inviteeIsPresent : new FormControl('',),
 
 
      })
      this.after30Days(this.utilityService.getPreviousEvents());
     
     
      this.utilityService.getInviteesData().subscribe( changes=>
        {
          this.invitees = changes;
          this.addInviteePrePopulate();
          console.log(this.invitees);
        })
     
 
   
    }
 
    addInviteePrePopulate(){
      console.log(this.invitees)
      for(let i=0;i<this.invitees.length;i++){
        this.inviteeTableIsPresentCheckBox.push(i);
      }
    }
 
    inviteePresent(value:any){
     console.log(value)
     if(value){
      this.totalAttendance++;
     }
     else{
      this.totalAttendance--;
     }
 
     if(this.totalAttendance < 5){
      this.showInviteeDeviation = true;
     }
     else this.showInviteeDeviation = false;
    }
 
 
 
    ngOnInit(): void {
       this.showingUpload();
 
       
    }
 
    showingUpload()
    {
     this.PostEventSettlement.valueChanges.subscribe( (res =>
      {
        console.log(res);
        this.isUploadShows = (res.dayssince == 'Yes')?true:false;
        this.isUploadGST = (res.includingGST == 'Yes')?true:false;
      }))
    }
 
    after30DaysList: any[] =[] ;
    private  after30Days(eventList : any)
      {
        // console.log(eventList)
       if(Boolean(eventList))
       {
        eventList.forEach(event =>
          {
 
           if(Boolean(event.EventDate)){
            let today : any = new Date();
            let eventDate = new Date(event.EventDate);
   
            let Difference_In_Time = eventDate.getTime() - today.getTime();
   
            let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
 
           
            if(Difference_In_Days <= -30){
              this.after30DaysList.push(event)
            }
           }
           }
         
               
       )}
       if(this.after30Days.length > 0){
        this.show30DaysUpload = true;
       }
       else{
        this.show30DaysUpload = false;
       }
       }

       expenses : any;
   gettingExpense()
   {
    this.utilityService.getExpensesData().subscribe( changes=>
      {
        this.expenses = changes;
        console.log(this.expenses);
      })
   }
       
}

