const Tasks = {
  _data: {},

  _getID: (function () {
    let id = 0;
    let _storage = {};
    return function(...args) {
      const s = JSON.stringify(args);
      _storage[s] = id++;
      return `item-${_storage[s]}`;
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
    callback();
  },

  setFinished: function(id, finished, callback) {
    Tasks._data[id].finished = finished;
    callback();
  },

  update: function(id, text = Tasks._data[id].checked, callback = ()=>{}) {
    const updatedAt = new Date();
    Tasks._data[id].lastUpdatedAt = updatedAt;
    Tasks._data[id].text = text;
    callback();
  },

  delete: function(id, callback = ()=>{}) {
    delete Tasks._data[id];
    callback();
  },

  get: function(id) {
    return id ? Tasks._data[id] : undefined;
  },

  fetch: function(callback = ()=>{}) {
    callback();
  },

  each: function(callback = ()=>{}) {
    _(Tasks._data).each((value, key) => {
      callback(value);
    });
  }
};