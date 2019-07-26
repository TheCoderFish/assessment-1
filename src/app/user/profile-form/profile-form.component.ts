import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Profile, Gender } from '../../model/profile';
import { ProfileService } from '../../shared/profile.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  profileForm: FormGroup;
  profileModel: Profile;
  profiles: Profile[] = [];
  cities;

  constructor(private fb: FormBuilder,
              private ps: ProfileService) { }

  ngOnInit() {
    this.profileModel = new Profile(null, '', '', null, [
      { name: 'Reading', selected: false },
      { name: 'Cricket', selected: false },
      { name: 'Singing', selected: false },
      { name: 'Dancing', selected: false }],
      null, null, '');

    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: [Validators.required],
      hobbies: this.buildHobbies(),
      birthDate: [null, Validators.required],
      salary: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(7)]],
      city: ['', Validators.required]
    });

    // Can be populated by a service
    this.cities = [{ id: 1, name: 'City 1' }, { id: 2, name: 'City 2' }, { id: 3, name: 'City 3' }, { id: 4, name: 'City 4' }];
  }

  // Getters And Setters
  get firstName() {
    return this.profileForm.get('firstName') as FormControl;
  }

  get lastName() {
    return this.profileForm.get('lastName') as FormControl;
  }
  get gender() {
    return this.profileForm.get('gender') as FormControl;
  }
  get salary() {
    return this.profileForm.get('salary') as FormControl;
  }
  get birthDate() {
    return this.profileForm.get('birthDate') as FormControl;
  }
  get city() {
    return this.profileForm.get('city') as FormControl;
  }

  get hobbies() {
    return this.profileForm.get('hobbies') as FormArray;
  }

  set date(date: Date) {
    this.profileForm.patchValue({ birthDate: date });
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
    const profile: Profile = this.profileForm.value;
    this.ps.addProfile(profile as Profile).subscribe(response => {
      this.ps.getProfiles().subscribe(x => this.profiles = x);
    });
  }
}
