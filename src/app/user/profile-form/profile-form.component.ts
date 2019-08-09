import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Profile, Gender, City, Hobby } from '../../model/profile';
import { ProfileService } from '../../shared/profile.service';
import { hobbies, cities } from '../../constants/hobbies';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  profileForm: FormGroup;
  profiles: Profile[] = [];
  cities: City[];
  inputHobbies: Hobby[];
  displayError: boolean;

  constructor(private fb: FormBuilder,
              private ps: ProfileService) { }

  ngOnInit() {
    this.inputHobbies = hobbies;
    this.cities = cities;
    this.displayError = false;

    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      hobbies: this.buildHobbies(),
      birthDate: [null, Validators.required],
      salary: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(7), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      city: ['', Validators.required]
    });

    // Can be populated by a service
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

  buildHobbies() {
    const arr = this.inputHobbies.map(hobby => {
      return this.fb.control(hobby.selected);
    });
    return this.fb.array(arr);
  }

  clearForm() {
    this.profileForm.reset();
  }

  onSubmit() {
    const profile: Profile = this.profileForm.value;
    if (this.profileForm.invalid) {
      this.displayError = true;
    } else {
      this.displayError = false;
      this.ps.addProfile(profile as Profile).subscribe(response => {
        this.ps.getProfiles().subscribe(x => this.profiles = x);
      });
    }
  }
}
