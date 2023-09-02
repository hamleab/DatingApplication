import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined; // Create a property of type NgForm
  @HostListener('window:beforeunload',['$event']) unloadNotification($event: any){
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }

  member: Member | undefined; // Create a member property of type Member
  user: User | null = null; // Create a user property of type User

  constructor(private accountService:AccountService, private memberService: MembersService, private toastr: ToastrService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  } // Inject the User service into the constructor
  //This is a lifecycle method that runs when the component is initialized
  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    if(!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: member => this.member = member
    })
  }

  updateMember(){
   this.memberService.updateMember(this.editForm?.value).subscribe({
    next: _ => {
      this.toastr.success('Profile updated successfully');
      this.editForm?.reset(this.member);
    }
   });
  }

}
function HotListener(): (target: MemberEditComponent, propertyKey: "member") => void {
  throw new Error('Function not implemented.');
}

