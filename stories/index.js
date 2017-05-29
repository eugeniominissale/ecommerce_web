import React from 'react';

import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n'; // initialized i18next instance

// addons.js
import '@kadira/storybook/addons';
import registerScissors, { defaultDevices } from 'storybook-addon-scissors';

import { storiesOf, action } from '@kadira/storybook';
import { MemoryRouter } from 'react-router';

import CategoryMenu from '../src/components/CategoryMenu';
import Item from '../src/components/Item';
import ItemList from '../src/components/ItemList';
import Login from '../src/components/Login';
import Register from '../src/components/Register';

registerScissors(defaultDevices);

storiesOf('CategoryMenu', module)
  .addDecorator((story) => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    ))
  .add('four categories', () => {
    const categories = [
      {name: 'abbigliamento uomo', id: 1},
      {name: 'abbigliamento donna', id: 2},
      {name: 'scarpe', id: 3},
      {name: 'accessori', id: 4},
    ];
    return (
      <CategoryMenu
      listCategories={categories} context={{}}/>
    );
  });

storiesOf('Item', module)
  .add('single item', () => {
    const item = {
      uuid: 'ert534534wertwert',
      name: 'Placeat voluptates repellendus',
      description: 'Deserunt ut quae architecto error assumenda exercitationem occaecati.',
      price: 233.34,
      pictureUrl: null,
      category: 'accessori',
    };
    return (
      <Item

      {...item} />
    );
  });


storiesOf('Itemlist', module)
  .add('empty', () => {
    const itemList = [];
    return (
      <I18nextProvider i18n={i18n}>
        <ItemList
        itemList={itemList}
        fetchItemList={action('fetch ItemList empty')}
        loaded={true}
        match={{ params: {category: 'accessori'}}}/>
      </I18nextProvider>
    );
  })
  .add('with one item', () => {
    const itemList = [{
      uuid: 'ert534534wertwert',
      name: 'Placeat voluptates repellendus veniam.',
      description: 'Deserunt ut quae architecto error assumenda exercitationem occaecati.',
      price: 233.34,
      pictureUrl: null,
      category: 'accessori',
    }];
    return (
      <I18nextProvider i18n={i18n}>
        <ItemList
        itemList={itemList}
        fetchItemList={action('fetch ItemList with one item')}
        loaded={true}
        match={{ params: {category: 'accessori'}}}/>
      </I18nextProvider>
    );
  })
  .add('with many items', () => {
    const itemList = [];

    for (let i = 0; i < 9; i++) {
      const item = {
        uuid: 'ert534534wertwert',
        name: 'Placeat voluptates repellendus veniam.',
        description: 'Deserunt ut quae architecto error assumenda exercitationem occaecati.',
        price: 233.34,
        pictureUrl: null,
        category: 'accessori',
      };
      item.item_id = item.item_id + i;
      itemList.push(item);
    }
    return (
      <I18nextProvider i18n={i18n}>
        <ItemList
        itemList={itemList}
        fetchItemList={action('fetch ItemList with one item')}
        loaded={true}
        match={{ params: {category: 'accessori'}}}/>
      </I18nextProvider>
    );
  });

storiesOf('Login', module)
  .add('empty login', () => {
    const error = '';
    return (
      <Login
      error={error}
      login={action('call to login')} />
    );
  })
  .add('bad credentials', () => {
    const error = 'Username o password non corretti';
    return (
      <Login
      error={error}
      login={action('call to login')} />
    );
  });

storiesOf('Register', module)
  .add('empty form', () => {
    const error = {};
    return (
      <Register
      error={error}
      register={action('call to register')} />
    );
  })
  .add('form with first name empty and email not correct', () => {
    const error = {
      text: 'Ci sono campi con errore',
      details: [{
        field: 'first_name',
        error: 'Campo obbligatorio'
      },{
        field: 'email',
        error: 'Email non corretta'
      }]
    };
    return (
      <Register
      error={error}
      register={action('call to register')} />
    );
  });
