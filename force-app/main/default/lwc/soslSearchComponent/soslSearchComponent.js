import { LightningElement, track, wire } from 'lwc';
import getUsersList from '@salesforce/apex/soslSearch.getUsersList';
import getUserByName from '@salesforce/apex/soslSearch.getUserByName';
import getUserByNameSOSL from '@salesforce/apex/soslSearch.getUserByNameSOSL';
import getContentVersions from '@salesforce/apex/soslSearch.getContentVersions';

const columns = [
    { label: 'CV ID', fieldName: 'Id' },
    { label: 'CV TITLE', fieldName: 'Title' },
];

export default class LightningExampleInputSearch extends LightningElement {
    @track searchKey;
    @track searchKeySOSL;
    @track cvSOSL;

    @track columns = columns;
    @track data;
    @track error;

    @wire(getUsersList) users;
    @wire(getUserByName, { searchKey: '$searchKey' }) contacts;
    @wire(getUserByNameSOSL, { searchKeySOSL: '$searchKeySOSL' }) userSOSL;
    @wire(getContentVersions, { cvSOSL: '$cvSOSL' }) cvs;
    @wire(getContentVersions, { cvSOSL: '$cvSOSL' }) cvsTable({ error, data }) {
        if (data) {
            this.data = data;
            console.log(this.data) //eslint-disable-line
        } else if (error) {
            this.error = error;
        }
    }

    handleKeyUp(evt) {
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            this.searchKey = evt.target.value;
        }
    }

    handleKeyUpSOSL(evt) {
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            this.searchKeySOSL = evt.target.value;
        }
    }

    handleKeyUpCVSOSL(evt) {
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            this.cvSOSL = evt.target.value;
            console.log('this.cvSOSL', this.cvSOSL) // eslint-disable-line
        }
    }

    handleSelect(event) {
        // // 1. Prevent default behavior of anchor tag click which is to navigate to the href url
        event.preventDefault();
        console.log('blarg') //eslint-disable-line
        // // 2. Create a custom event that bubbles. Read about event best practices at http://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.events_best_practices
        // const selectEvent = new CustomEvent('contactselect', {
        //     detail: { contactId: event.currentTarget.dataset.contactId }
        // });
        // // 3. Fire the custom event
        // this.dispatchEvent(selectEvent);
    }
}
