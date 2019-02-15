import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from '../components/streams/streams.component';
import { TokenService } from '../services/token.service';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SideBarComponent } from '../components/side-bar/side-bar.component';

@NgModule({
  declarations: [StreamsComponent, ToolbarComponent, SideBarComponent],
  imports: [CommonModule],
  exports: [StreamsComponent, ToolbarComponent],
  providers: [TokenService]
})
export class StreamsModule {}
