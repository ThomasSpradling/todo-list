const TaskView = {
  render: _.template(`
    <label class="item" for="<%- id %>">
      <input type="checkbox" id="<%- id %>" <%- checked %>>
      <span class='check'><i class="fa-solid <%- icon %>"></i></span>
      <span class='text'><%- text %></span>
      <span class='edit'><i class="fas fa-edit"></i></span>
      <span class='delete'><i class="fa-solid fa-trash-can"></i></span>
    </label>
  `)
};