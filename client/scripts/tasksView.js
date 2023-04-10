const TasksView = {
  $tasks: $('#tasks'),

  initialize: function () {
    TasksView.render();
    $(document).on('click', 'label.item', TasksView.handleCheck);
    $(document).on('click', '.edit', TasksView.handleEdit);
    $(document).on('click', '.delete', TasksView.handleDelete);
  },

  render: function () {
    TasksView.$tasks.html('');
    Tasks.each(TasksView.renderTask);
  },

  renderTask: function (task) {
    const $task = TaskView.render({
      id: task.id,
      text: task.text,
      checked: task.finished ? 'checked' : '',
      icon: task.finished ? 'fa-square-check' : 'fa-square'
    });
    TasksView.$tasks.append($task);
  },

  handleCheck: function (e) {
    const id = $(this).attr('for');
    Tasks.setFinished(id, !Tasks.get(id).finished, TasksView.render);

    e.preventDefault();
    e.stopPropagation();
  },

  handleEdit: function (e) {
    const id = $($(this).siblings('input[type="checkbox"]')[0]).attr('id');
    const text = window.prompt('Edit this?', Tasks.get(id).text) || Tasks.get(id).text;
    Tasks.update(id, text, TasksView.render);

    e.preventDefault();
    e.stopPropagation();
  },

  handleDelete: function (e) {
    const id = $($(this).siblings('input[type="checkbox"]')[0]).attr('id');
    //console.log($(`.item[for="${id}"]`));
    Tasks.delete(id, () => {
      $(`.item[for="${id}"]`).slideUp(400, TasksView.render);
    });

    e.preventDefault();
    e.stopPropagation();
  }
};