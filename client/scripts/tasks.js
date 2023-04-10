const Tasks = {
  _data: {},
  _filter: 'all',

  _getID: (function () {
    let size = 0;
    let _storage = [];
    return function(createdAt, stores) {
      let uid = ((createdAt.getTime() + Math.random()) * 10000).toString(36);
      _storage[size] = uid;
      return `item-${_storage[size]}`;
    };
  })(),

  create: function(text, callback = ()=>{}) {
    const createdAt = new Date();
    const id = Tasks._getID(createdAt);
    Tasks._data[id] = {
      id: id,
      text: text,
      finished: false,
      createdAt: createdAt,
      lastUpdatedAt: createdAt,
      finished: false
    };
    window.localStorage.setItem(id, JSON.stringify(Tasks._data[id]));
    callback();
  },

  setFinished: function(id, finished, callback) {
    Tasks._data[id].finished = finished;
    window.localStorage.setItem(id, JSON.stringify(Tasks._data[id]));
    callback();
  },

  update: function(id, text = Tasks._data[id].checked, callback = ()=>{}) {
    const updatedAt = new Date();
    Tasks._data[id].lastUpdatedAt = updatedAt;
    Tasks._data[id].text = text;
    window.localStorage.setItem(id, JSON.stringify(Tasks._data[id]));
    callback();
  },

  delete: function(id, callback = ()=>{}) {
    window.localStorage.removeItem(id);
    delete Tasks._data[id];
    callback();
  },

  get: function(id) {
    return id ? Tasks._data[id] : undefined;
  },

  fetch: function(callback = ()=>{}) {
    Tasks._data = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('item-')) {
        Tasks._data[key] = JSON.parse(localStorage.getItem(key));
      }
    }
    callback();
  },

  getFilter: function() {
    return Tasks._filter;
  },

  setFilter: function(newFilter, callback) {
    Tasks._filter = newFilter;
    callback();
  },

  each: function(callback = ()=>{}) {
    _(Tasks._data).each((value, key) => {
      callback(value);
    });
  }
};