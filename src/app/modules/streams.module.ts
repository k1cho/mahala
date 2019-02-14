import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from '../components/streams/streams.component';
import { TokenService } from '../services/token.service';

@NgModule({
  declarations: [StreamsComponent],
  imports: [CommonModule],
  exports: [StreamsComponent],
  providers: [TokenService]
})
export class StreamsModule {}
