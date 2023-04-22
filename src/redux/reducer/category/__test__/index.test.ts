import store from 'src/redux/store';

import {Category} from 'src/redux/reducer/types';
import {DefaultCategories} from 'src/data/categories';

import {saveCategories, selectCategory} from '..';

describe('Category Actions', () => {
  it('can save categories', () => {
    const defaultCategories = store.getState().category.categories;
    expect(defaultCategories.length).toEqual(DefaultCategories.length); // should be the same with default

    store.dispatch(saveCategories([]));
    expect(store.getState().category.categories.length).toEqual(0);
  });

  it('can select a category', () => {
    const defaultCategory = store.getState().category.selectedCategory;
    expect(defaultCategory).toEqual(DefaultCategories[0]);

    const mockCategory: Category = {name: 'Mock Category', items: []};
    store.dispatch(selectCategory(mockCategory));
    const storedCategory = store.getState().category.selectedCategory;
    expect(storedCategory.name).toEqual(mockCategory.name);
  });
});
