import { HomePageObject } from "../pages/searchPage";
const { Then } = require("cucumber");

const search: HomePageObject = new HomePageObject();

Then(/^I clear the search text$/, async () => {
     await search.searchTextBox.clear();
});
