


new Vue({
        el: '#app-vue',
        data() {
            return {
                tasks: [],
                currentTask: ''
            }
        },
        methods: {
            addTask: function()
            {
                this.tasks.push(this.currentTask);
            },
            removeTask: function(index)
            {
                this.tasks.splice(index, 1);
            }
        }
});
