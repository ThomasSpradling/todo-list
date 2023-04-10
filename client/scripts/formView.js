const FormView = {
  $form: $('form#create'),
  $input: $('input#input'),

  initialize: function () {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function (e) {
    e.preventDefault();
    const item = FormView.$input.val();

    Tasks.create(item, () => {
      TasksView.render();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    FormView.$input.val('');
  }
};