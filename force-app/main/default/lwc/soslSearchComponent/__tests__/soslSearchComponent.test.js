import { createElement } from "lwc";
import soslSearchComponent from 'c/soslSearchComponent';
import { registerApexTestWireAdapter } from "@salesforce/lwc-jest";
import getUsersList from "@salesforce/apex/soslSearch.getUsersList";
import getUserByName from "@salesforce/apex/soslSearch.getUserByName";

const users = require("./data/users.json");
const users2 = require("./data/users2.json");
const getUsersListAdapter = registerApexTestWireAdapter(getUsersList);
const getUserByNameAdapter = registerApexTestWireAdapter(getUserByName)

describe('c-sosl-search-component', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        jest.clearAllMocks();
    });

    describe('get list of users @wire', () => {
        it("renders two records", () => {
            const element = createElement(
                "c-sosl-search-component",
                { is: soslSearchComponent }
            );
            document.body.appendChild(element);

            getUsersListAdapter.emit(users);

            return Promise.resolve().then(() => {
                const detailEls = element.shadowRoot.querySelectorAll(".individual-user");
                expect(detailEls.length).toBe(users.length);
                expect(detailEls[0].textContent).toBe( "Name: " + users[0].Name );
            });
        });

        it("gets called with data from user input", () => {
            const USER_INPUT = "Straw Berry";
            const WIRE_PARAMETER = { searchKey: USER_INPUT };

            const element = createElement(
                "c-sosl-search-component",
                { is: soslSearchComponent }
            );
            document.body.appendChild(element);

            const inputEl = element.shadowRoot.querySelector("lightning-input");
            inputEl.value = USER_INPUT;

            let e = new CustomEvent("keyup");
            e.keyCode = 13;
            inputEl.dispatchEvent(e);
            expect(inputEl.value).toEqual(USER_INPUT);
        
            return Promise.resolve().then(() => {
                expect(getUserByNameAdapter.getLastConfig()).toEqual(
                    WIRE_PARAMETER
                );
            });
        });

        it("returns one user from search", () => {
            const USER_INPUT = "Straw Berry";

            const element = createElement("c-sosl-search-component", {
                is: soslSearchComponent
            });
            document.body.appendChild(element);

            const inputEl = element.shadowRoot.querySelector( "lightning-input" );
            inputEl.value = USER_INPUT;

            let e = new CustomEvent("keyup");
            e.keyCode = 13;
            inputEl.dispatchEvent(e);
            expect(inputEl.value).toEqual(USER_INPUT);

            getUserByNameAdapter.emit(users2);

            return Promise.resolve().then(() => {
                const detailEls = element.shadowRoot.querySelectorAll( ".searched-user" );
                expect(detailEls.length).toBe(1);
                expect(detailEls[0].textContent).toBe( "NAME: " + users[0].Name );
                const errorEls = element.shadowRoot.querySelectorAll( ".searched-error" );
                expect(errorEls.length).toBe(0);
            });
        });
    });
});