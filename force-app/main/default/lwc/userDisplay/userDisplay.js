import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import USERNAME_FIELD from '@salesforce/schema/User.Username';

export default class UserDisplay extends LightningElement {
    userId = USER_ID;
    userName;
    userUsername;
    isLoading = true;

    @wire(getRecord, { recordId: '$userId', fields: [NAME_FIELD, USERNAME_FIELD] })
    wiredUser({ error, data }) {
        if (data) {
            this.userName = data.fields.Name.value;
            this.userUsername = data.fields.Username.value;
            this.isLoading = false;
        } else if (error) {
            console.error('Error loading user data:', error);
            this.isLoading = false;
        }
    }

    get currentDate() {
        const today = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return today.toLocaleDateString('en-US', options);
    }
}