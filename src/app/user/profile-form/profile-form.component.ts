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
    // tslint:disable-next-line: align
    private ps: ProfileService) { }

  ngOnInit() {
    this.profileModel = new Profile(1, 'Nurali', 'Khoja', Gender.Male, [
      { name: 'Reading', selected: false },
      { name: 'Cricket', selected: false },
      { name: 'Singing', selected: false },
      { name: 'Dancing', selected: false }],
      new Date('1995-10-02'), 1110, 'Valsad');

    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: [Validators.required],
      hobbies: this.buildHobbies(),
      birthDate: [Validators.required],
      salary: [0, [Validators.required, Validators.minLength(4), Validators.maxLength(7)]],
      city: ['', Validators.required]
    });

    this.cities = ['City 1', 'City 2', 'City 3', 'City 4'];
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
    const profile: Profile = this.profileForm.value;
    this.ps.addProfile(profile as Profile).subscribe(response => {
      this.ps.getProfiles().subscribe(x => this.profiles = x);
    });
  }
  load() {
    this.profileForm.patchValue(this.profileModel);
  }
}
