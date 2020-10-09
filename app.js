
new Vue({
        el: '#app-vue',
        data() {
            return {
                tasks: [],
                compTasks: [],
                transTasks: [],
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
                this.compTasks.push(task);
                let params = {
                    langpair: "en|zh",
                    q: task
                }
                let request = `https://api.mymemory.translated.net/get`;
                axios.get(request, {params})
                .then((data) => {
                    if(data.data){
                        let translation = data.data.responseData.translatedText;
                        this.transTasks.push(translation);
                    }
                });
            },
            returnTask: function(index)
            {
                let task = this.compTasks[index];
                this.tasks.push(task);
                this.compTasks.splice(index, 1);
                this.transTasks.splice(index, 1);
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
            },
            copyTransTasks: function()
            {
                let el = document.createElement('textarea');
                let count = 1;
                el.value = '';
                
                el.value = "今日完成工作:\n";
                for (const task of this.transTasks)
                {
                    el.value += (count +"." + task + ", 完整的\n");
                    count++;
                }

                count = 1;
                el.value += "明日工作:\n"
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
