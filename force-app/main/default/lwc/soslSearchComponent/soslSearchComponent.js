import { LightningElement, track, wire } from 'lwc';
import getUsersList from '@salesforce/apex/soslSearch.getUsersList';
import getUserByName from '@salesforce/apex/soslSearch.getUserByName';
// import getUserByNameSOSL from '@salesforce/apex/soslSearch.getUserByNameSOSL';
// import getContentVersions from '@salesforce/apex/soslSearch.getContentVersions';

const columns = [
    { label: 'CV ID', fieldName: 'Id' },
    { label: 'CV TITLE', fieldName: 'Title' },
];

const actions = [
    { label: 'Go to Item', name: 'go_to_item' },
    { label: 'Go to File', name: 'go_to_file' },
];

const columnsAction = [
    { label: 'CV ID', fieldName: 'Id' },
    { label: 'CV TITLE', fieldName: 'Title' },
    { label: 'VersionData', fieldName: 'VersionData' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    }
];

export default class LightningExampleInputSearch extends LightningElement {
    @track searchKey;
    @track searchKeySOSL;
    @track cvSOSL;

    @track columns = columns;
    @track columnsAction = columnsAction;
    @track data;
    @track error;

    @wire(getUsersList) users;
    @wire(getUserByName, { searchKey: '$searchKey' }) contacts;
    // @wire(getUserByNameSOSL, { searchKeySOSL: '$searchKeySOSL' }) userSOSL;
    // @wire(getContentVersions, { cvSOSL: '$cvSOSL' }) cvs;
    // @wire(getContentVersions, { cvSOSL: '$cvSOSL' }) cvsTable({ error, data }) {
    //     if (data) {
    //         this.data = data;
    //         console.log('data', this.data) //eslint-disable-line
    //     } else if (error) {
    //         this.error = error;
    //     }
    // }

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

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        console.log(event.detail); //eslint-disable-line
        switch (actionName) {
            case 'go_to_item':
                this.goToItem(row);
                break;
            case 'go_to_file':
                this.goToFile(row);
                break;
            default:
        }
    }

    goToItem(row) {
        const { Id } = row;
        const index = this.findRowIndexById(Id);
        console.log(row, Id, index) // eslint-disable-line
    }

    findRowIndexById(id) {
        let ret = -1;
        this.data.some((row, index) => {
            if (row.Id === id) {
                ret = index;
                return true;
            }
            return false;
        });
        return ret;
    }


//     gotoURL: function (component, event, helper) {
//     var urlEvent = $A.get("e.force:navigateToURL");
//     urlEvent.setParams({
//         "url": "/006/o"
//     });
//     urlEvent.fire();
// }
    goToFile(row) {
        const { Id } = row;
        let url = 'https://curious-hawk-12nndm-dev-ed.lightning.force.com/lightning/r/ContentDocument/'+ Id + '/view'
        console.log('url:'+url)// eslint-disable-line

    }
}
