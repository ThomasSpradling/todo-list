const FormView = {
  $form: $('form#create'),
  $input: $('input#input'),

  initialize: function () {
    FormView.$form.on('submit', FormView.handleSubmit);
    $(document).on('click', '#filter a:not(#text)', FormView.handleFilter);
  },

  handleSubmit: function (e) {
    e.preventDefault();
    const item = FormView.$input.val();

    Tasks.create(item, () => {
      TasksView.render();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    FormView.$input.val('');
  },

  handleFilter: function (e) {
    $('#filter a:not(#text)').removeClass();
    $(this).addClass('active');
    Tasks.setFilter($(this).attr('id'), TasksView.render);
  }
};