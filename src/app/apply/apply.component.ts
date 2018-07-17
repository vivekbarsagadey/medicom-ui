import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  sendToServer: any;
user: any = {};
  constructor(private formBuilder: FormBuilder) {
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      pregnancy: ['', Validators.required], glucose: ['', Validators.required],
      bloodpressure: ['', Validators.required],
      skinThickness: ['', Validators.required],
      insulin: ['', Validators.required],
      bmi: ['', Validators.required],
      diabetesPedigreeFunction: ['', Validators.required],
      age: ['', Validators.required],
    });
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
    fetch('http://localhost:8080/api/applications/', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(this.registerForm.value), // data can be `string` or {object}!
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
  }
  /*openClickSubmit() {
     this.sendToServer = {
       'firstName' : this.user.firstName,
       'lastName' : this.user.lastName,
       'pregnancy' : this.user.pregnancy,
       'glucose' : this.user.glucose,
       'bloodpressure' : this.user.bloodpressure,
       'skinThickness' : this.user.skinThickness,
       'insulin' : this.user.insulin,
       'bmi' : this.user.bmi,
       'diabetesPedigreeFunction' : this.user.diabetesPedigreeFunction,
       'age' : this.user.age
     };
     fetch('http://localhost:8080/api/applications/', {
       method: 'POST', // or 'PUT'
       body: JSON.stringify(this.sendToServer), // data can be `string` or {object}!
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
       }
     }).then(res => res.json())
       .catch(error => console.error('Error:', error))
       .then(response => console.log('Success:', response));
   }*/
}