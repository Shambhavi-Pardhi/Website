import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    feedback: new FormControl('', Validators.required),
    comment: new FormControl('')
  });

  constructor(
    private http: HttpClient,
    private contactService: ContactService) { }

  ngOnInit() { 
    this.getContact();
  } 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getContact(): void {
    this.contactService.getContact()
    .subscribe(contact => {
      this.userForm.setValue ({
        name: contact.name,
        email: contact.email,
        feedback: contact.feedback,
        comment: contact.comment
      })
    }); 
  }

  private selectedLink: string="";        
  setradio(e: string): void {  
    this.selectedLink = e;  
  } 

  isSelected(fdbck: string): boolean {  
    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;  
    }  
      return (this.selectedLink === fdbck); // if current radio button is selected, return true, else return false  
  }  
  
  errorStatus: string;
  
  onFormSubmit(temp: Contact): void {
    this.contactService.postContact(temp).subscribe(
      success => {
        if(success) {
          alert('Your details have been successfully updated');
          this.errorStatus = "";
          console.log(success);
          console.log(temp.name);
        } else {
          //leave
        }
      }, error => {
        alert('Error occured');
        this.errorStatus = error;
        console.log('Error');
      }
    );
    this.userForm.reset();
  }
  
  resetForm() : void {
    this.userForm.reset();
  }

}

