<template>
  <div class="container">
    <section class="todo">
      <Todo />
    </section>
  </div>
</template>

<script>
import Todo from './components/Todo.vue'

export default {
  name: 'app',
  components: {
    Todo
  }
}
</script>

<style>
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}
body {
    background: #f8f6f6;
    color: #404040;
    font-family: 'Lucida Grande', Verdana, sans-serif;
    font-size: 13px;
    font-weight: normal;
    line-height: 20px;
}
.container {
    margin: 50px auto;
    width: 380px;
}
.todo{
    position: relative;
    width: 260px;
    margin: 0 auto;
    padding: 12px 0;
    background: #fff;
    border: 1px solid;
    border-color: #dfdcdc #d9d6d6 #ccc;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.todo:before, .todo:after {
    content: '';
    position: absolute;
    z-index: -1;
    height: 4px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 2px;
}

.todo:after {
    left: 0;
    right: 0;
    bottom: -3px;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.todo:before {
    left: 2px;
    right: 2px;
    bottom: -5px;
    border-color: #c4c4c4;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}

.lt-ie9 .todo:before, .lt-ie9 .todo:after {
    height: 1px;
    border-top: 0;
}
</style>
