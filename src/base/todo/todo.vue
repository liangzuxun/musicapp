<template>
<div>
   <h3>搜索记录</h3>
  <ul class="todolist" v-if="list">
  
    <li class="todo-item"
    v-for="(item,index) in list"
    :key="index"
    >
    <span class="text" @click="Todo(item)">{{item}}</span>
    <span class="delete" @click.stop="_deleteItem(index)">&times;</span>
    </li>
    <h4 @click="_deleteAll" v-if="list">清除搜索记录</h4>
  </ul>
</div>
</template>
<script>
export default {
  name: "todo-list",
  props: {
    todolist: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      list: ""
    };
  },
  created() {
    this.list = localStorage.getItem("todo")
      ? localStorage.getItem("todo").split(",")
      : "";
  },
  methods: {
    _deleteItem(index) {
      if (this.list.length === 1) {
        localStorage.removeItem("todo");
        this.list = "";
        return;
      }
      this.list.splice(index, 1);
      localStorage.setItem("todo", this.list);
    },
    _deleteAll() {
      this.list = "";
      localStorage.removeItem("todo");
    },
    Todo(item){
      this.$emit('Todo',item)
    }
  }
};
</script>
<style lang="stylus" scoped>
h3 {
  text-align: left;
  font-weight: normal;
  color: #fff;
}

.todolist {
  margin-top: 10px;

  h4 {
    color: #ccc;
    font-weight: normal;
  }
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  padding-right: 20px;

  .text {
    color: orange;
  }

  .delete {
    color: #fff;
    font-size: 24px;
  }
}
</style>


