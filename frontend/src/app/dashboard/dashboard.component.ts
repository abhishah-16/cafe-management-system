import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, AfterViewInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constant';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	responsemessage: any
	data: any
	ngAfterViewInit() { }

	constructor(
		private dashboardservice: DashboardService,
		private snackbarservice: SnackbarService
		
	) {
		this.dashboardData()
	}
	dashboardData() {
		this.dashboardservice.getDetails().subscribe((res: any) => {
			this.data = res
		}, (error: any) => {
			console.log(error)
			if (error.error) {
				this.responsemessage = error.error
			}
			else {
				this.responsemessage = GlobalConstants.genericerror
			}
			this.snackbarservice.opensnackbar(this.responsemessage, GlobalConstants.error)
		})
	}
}
