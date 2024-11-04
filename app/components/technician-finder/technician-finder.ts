import { Observable, Dialogs, Utils } from '@nativescript/core';
import { TechnicianService } from '../../services/technician.service';
import { Technician } from '../../models/trip.model';

export class TechnicianFinderViewModel extends Observable {
    private technicianService: TechnicianService;
    private _technicians: Technician[] = [];
    private _loading: boolean = false;
    private _problemDescription: string = '';

    constructor() {
        super();
        this.technicianService = new TechnicianService();
    }

    get technicians(): Technician[] {
        return this._technicians;
    }

    set technicians(value: Technician[]) {
        if (this._technicians !== value) {
            this._technicians = value;
            this.notifyPropertyChange('technicians', value);
        }
    }

    get loading(): boolean {
        return this._loading;
    }

    set loading(value: boolean) {
        if (this._loading !== value) {
            this._loading = value;
            this.notifyPropertyChange('loading', value);
        }
    }

    get problemDescription(): string {
        return this._problemDescription;
    }

    set problemDescription(value: string) {
        if (this._problemDescription !== value) {
            this._problemDescription = value;
            this.notifyPropertyChange('problemDescription', value);
        }
    }

    async findTechnicians() {
        if (!this.problemDescription.trim()) {
            Dialogs.alert({
                title: 'Error',
                message: 'Please describe your RV issue',
                okButtonText: 'OK'
            });
            return;
        }

        this.loading = true;
        try {
            // Get current location
            // Note: In a real app, you'd use the geolocation plugin
            const latitude = 37.7749;
            const longitude = -122.4194;

            const technicians = await this.technicianService.findNearbyTechnicians(
                latitude,
                longitude
            );
            this.technicians = technicians;
        } catch (error) {
            Dialogs.alert({
                title: 'Error',
                message: 'Failed to find technicians. Please try again.',
                okButtonText: 'OK'
            });
        } finally {
            this.loading = false;
        }
    }

    async onTechnicianTap(args: any) {
        const technician = this.technicians[args.index];
        const result = await Dialogs.confirm({
            title: 'Book Technician',
            message: `Would you like to book ${technician.name}?`,
            okButtonText: 'Book',
            cancelButtonText: 'Cancel'
        });

        if (result) {
            try {
                const booked = await this.technicianService.bookTechnician(
                    technician.id,
                    this.problemDescription
                );
                if (booked) {
                    Dialogs.alert({
                        title: 'Success',
                        message: `Successfully booked ${technician.name}. They will contact you shortly.`,
                        okButtonText: 'OK'
                    });
                }
            } catch (error) {
                Dialogs.alert({
                    title: 'Error',
                    message: 'Failed to book technician. Please try again.',
                    okButtonText: 'OK'
                });
            }
        }
    }
}