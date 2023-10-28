import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/service/data-service.service';

@Component({
  selector: 'image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent {
  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer
  ) {}

  @Output() uploadedImage = new EventEmitter<string>();

  file: any;
  image: any;

  @Input() title: string;
  @Input() imageUrl: any;
  @Input() folderName: string;
  @Input() getEndpoint: string;
  @Input() uploadEndpoint: string;

  ngOnInit() {}

  ngOnChanges() {
    if (this.imageUrl) {
      this.getImage(this.imageUrl);
    }
  }

  onFileChange(event) {
    this.file = event.target.files[0];
    let formData = new FormData();
    formData.append('photo', this.file, this.file.name);

    this.dataService
      .post(`/${this.uploadEndpoint}/${this.folderName}`, formData)
      .then((resp) => {
        console.log(resp);
        this.uploadedImage.emit(resp);
      });
  }

  getImage(imageUrl) {
    this.dataService
      .getImage(`/${this.getEndpoint}/${imageUrl}`)
      .subscribe((blob) => {
        let objectURL = URL.createObjectURL(blob);
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
  }
}
