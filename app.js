
new Vue({
        el: '#app-vue',
        data() {
            return {
                tasks: [],
                compTasks: [],
                currentTask: ''
            }
        },
        methods: {
            addTask: function()
            {
                let task = this.currentTask;
                this.tasks.push(task);
                this.currentTask = '';
            },
            taskCompleted: function(index)
            {
                let task = this.tasks[index];
                this.tasks.splice(index, 1);
                this.compTasks.push(task)
            },
            returnTask: function(index)
            {
                let task = this.compTasks[index];
                this.tasks.push(task);
                this.compTasks.splice(index, 1);
            },
            removeTask: function(index)
            {
                this.tasks.splice(index, 1);
            },
            copyTasks: function()
            {
                let el = document.createElement('textarea');
                let count = 1;
                el.value = '';
                
                el.value = "Completed:\n";
                for (const task of this.compTasks)
                {
                    el.value += (count +"." + task + ", completed\n");
                    count++;
                }

                count = 1;
                el.value += "Need to Complete:\n"
                for (const task of this.tasks)
                {
                    el.value += (count +"." + task + "\n");
                    count++;
                }

                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
                console.log(el.value);                
            }
        }
});
