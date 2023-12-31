import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from './listings.service';

@Component({
  selector: "app-listings-listingform",
  templateUrl: "./listingform.component.html",
  styleUrls: ['./listingform.component.css']
})
export class ListingformComponent {
  listingForm: FormGroup;
  isEditMode: boolean = false;
  listingId: number = -1;

  constructor( 
    private _formbuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _listingService: ListingService
  ) {
    this.listingForm = _formbuilder.group({ // Input validation
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', [Validators.pattern(/^https?:\/\/.+/)]],
      AdditionalImageUrl: ['', [Validators.pattern(/^https?:\/\/.+/)]],
      Rooms: [0, Validators.required], 
      Toilets: [0, Validators.required],
      Area: [0, Validators.required], 
      Address: ['', Validators.required] 
   
    });
  }

  onSubmit() { // Function to submit the create a listing
    console.log("ListingCreate form submitted:");
    console.log(this.listingForm);
    const newListing = this.listingForm.value;
    if (this.isEditMode) {
      this._listingService.updateListing(this.listingId, newListing)
        .subscribe(response => {
          if (response.success) {
            console.log(response.message);
            this._router.navigate(['/listings']);
          }
          else {
            console.log('Listing update failed');
          }
        });
    }
    else {
      this._listingService.createListing(newListing)
        .subscribe(response => {
          if (response.success) {
            console.log(response.message);
            this._router.navigate(['/listings']);
          }
          else {
            console.log('Listing creation failed');
          }
        });
    }
  }

  backToListings() { // Function to go back to listings
    this._router.navigate(['/listings']);
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      if (params['mode'] === 'create') {
        this.isEditMode = false; // Create mode
      } else if (params['mode'] === 'edit') {
        this.isEditMode = true; // Edit mode
        this.listingId = +params['id']; // Convert to number
        this.loadListingForEdit(this.listingId);
      }
    });
  }

  loadListingForEdit(listingId: number) { // Function for edit
    this._listingService.getListingById(listingId)
      .subscribe(
        (listing: any) => {
          console.log('retrived listing: ', listing);
          this.listingForm.patchValue({
            name: listing.Name,
            price: listing.Price,
            description: listing.Description,
            imageUrl: listing.ImageUrl,
            AdditionalImageUrl: listing.AdditionalImageUrl,
            Rooms: listing.Rooms || 0, 
            Toilets: listing.Toilets || 0, 
            Area: listing.Area || 0, 
            Address: listing.Address || ''
          });
        },
        (error: any) => {
          console.error('Error loading listing for edit:', error);
        }
      );
  }

}
