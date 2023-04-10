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
    _.chain(Tasks._data)
      .reduce((accum, key) => {
        accum.push(key);
        return accum;
      }, [])
      .sortBy('createdAt')
      .filter((task, key) => {
        if (Tasks.getFilter() === 'finished') {
          return task.finished;
        }
        if (Tasks.getFilter() === 'unfinished') {
          return !task.finished;
        }
        return true;
      })
      .each(TasksView.renderTask);
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
    if (id !== undefined && id.length !== 0) {
      Tasks.setFinished(id, !Tasks.get(id).finished, TasksView.render);
    }

    e.preventDefault();
    e.stopPropagation();
  },

  handleEdit: function (e) {
    const id = $($(this).siblings('input[type="checkbox"]')[0]).attr('id');
    if (id !== undefined && id.length !== 0) {
      const text = window.prompt('Edit this?', Tasks.get(id).text) || Tasks.get(id).text;
      Tasks.update(id, text, TasksView.render);
    }

    e.preventDefault();
    e.stopPropagation();
  },

  handleDelete: function (e) {
    const id = $($(this).siblings('input[type="checkbox"]')[0]).attr('id');
    if (id !== undefined && id.length !== 0) {
      Tasks.delete(id, () => {
        $(`.item[for="${id}"]`).slideUp(400, TasksView.render);
      });
    }

    e.preventDefault();
    e.stopPropagation();
  }
};