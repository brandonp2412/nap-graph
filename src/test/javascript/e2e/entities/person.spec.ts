import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Person e2e test', () => {

    let navBarPage: NavBarPage;
    let personDialogPage: PersonDialogPage;
    let personComponentsPage: PersonComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load People', () => {
        navBarPage.goToEntity('person');
        personComponentsPage = new PersonComponentsPage();
        expect(personComponentsPage.getTitle())
            .toMatch(/People/);

    });

    it('should load create Person dialog', () => {
        personComponentsPage.clickOnCreateButton();
        personDialogPage = new PersonDialogPage();
        expect(personDialogPage.getModalTitle())
            .toMatch(/Create or edit a Person/);
        personDialogPage.close();
    });

    it('should create and save People', () => {
        personComponentsPage.clickOnCreateButton();
        personDialogPage.userSelectLastOption();
        personDialogPage.save();
        expect(personDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PersonComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-person div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class PersonDialogPage {
    modalTitle = element(by.css('h4#myPersonLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    };

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    };

    getUserSelect = function() {
        return this.userSelect;
    };

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
