import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Profile } from '../../model/profile';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  profileForm: FormGroup;
  profileModel: Profile;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.profileModel = new Profile('', '', null, [
      { name: 'Reading', selected: false },
      { name: 'Cricket', selected: false },
      { name: 'Singing', selected: false },
      { name: 'Dancing', selected: false }],
      null, 0, '');

    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: [Validators.required],
      hobbies: this.buildHobbies(),
      birthDate: [Validators.required],
      salary: [0, Validators.required],
      city: ['', Validators.required]
    });
  }


  get hobbies() {
    return this.profileForm.get('hobbies') as FormArray;
  }

  buildHobbies() {
    const arr = this.profileModel.hobbies.map(hobby => {
      return this.fb.control(hobby.selected);
    });
    return this.fb.array(arr);
  }

  clearForm() {
    this.profileForm.reset();
  }
  onSubmit() {
    console.log(this.profileForm.value)
  }

}
