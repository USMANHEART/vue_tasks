
new Vue({
        el: '#app-vue',
        data() {
            return {
                tasks: [],
                transTaskList: [],
                compTasks: [],
                transTasks: [],
                currentTask: '',
                todayID: 0,
            }
        },
        mounted(){
            this.firstLoad()
        },
        methods: {
            firstLoad: function()
            {
                let path = "http://localhost:8080/today_task";
                axios.get(path)
                .then((data) => {
                    if(data.data)
                    {
                        let tasks = data.data.tasks;
                        this.resetTasks();
                        tasks = tasks.split("|");
                        this.addTransTasks(tasks);
                        for (const task of tasks) 
                        {
                            this.addTask(task, false);
                        }
                    }
                });
            },
            saveTasks: function()
            {
                let allTasks = ""
                for (var i=0; i<(this.tasks.length); i++) {
                    let task = this.tasks[i];
                    if(i==0)
                    {
                        allTasks += task;
                    }
                    else
                    {
                        allTasks += ("|" + task);
                    }
                }

                let path = "http://localhost:8080/save_task";
                let params = {
                    "tasks": allTasks
                }
                axios.post(path, params)
                .then((response) => {
                    console.log(response)
                });
            },
            resetTasks: function()
            {
                this.tasks = [];
                this.transTaskList = [];
            },
            addTask: function(value = "", translate = true)
            {
                let task = (value == "") ? this.currentTask: value;
                this.tasks.push(task);
                if(translate) this.addTransTask(task)
                this.currentTask = '';
            },
            addTransTasks: function(tasks)
            {
                let requests = []
                for (const task of tasks) 
                {
                    let params = {
                        langpair: "en|zh",
                        q: task
                    }
                    let request = `https://api.mymemory.translated.net/get`;
                    requests.push(axios.get(request, {params}))
                }                

                axios.all(requests).then(axios.spread((...responses) => {
                    for (const data of responses) {
                        let translation = data.data.responseData.translatedText;
                        this.transTaskList.push(translation);
                    }                    
                  })).catch(errors => {
                    console.error(errors)
                  })
                  
            },
            addTransTask: function(task)
            {
                let params = {
                    langpair: "en|zh",
                    q: task
                }
                let request = `https://api.mymemory.translated.net/get`;
                axios.get(request, {params})
                .then((data) => {
                    if(data.data){
                        let translation = data.data.responseData.translatedText;
                        // console.log(task, translation);
                        this.transTaskList.push(translation);
                    }
                });
            },
            taskCompleted: function(index)
            {
                let task = this.tasks[index];
                let translation = this.transTaskList[index];
                this.tasks.splice(index, 1);
                this.transTaskList.splice(index, 1);
                this.compTasks.push(task);
                this.transTasks.push(translation);
                // let params = {
                //     langpair: "en|zh",
                //     q: task
                // }
                // let request = `https://api.mymemory.translated.net/get`;
                // axios.get(request, {params})
                // .then((data) => {
                //     if(data.data){
                //         let translation = data.data.responseData.translatedText;
                //         this.transTasks.push(translation);
                //     }
                // });
            },
            returnTask: function(index)
            {
                let task = this.compTasks[index];
                let translation = this.transTasks[index];
                this.tasks.push(task);
                this.transTaskList.push(translation);
                // let params = {
                //     langpair: "en|zh",
                //     q: task
                // }
                // let request = `https://api.mymemory.translated.net/get`;
                // axios.get(request, {params})
                // .then((data) => {
                //     if(data.data){
                //         let translation = data.data.responseData.translatedText;
                //         this.transTaskList.push(translation);
                //     }
                // });                
                this.compTasks.splice(index, 1);
                this.transTasks.splice(index, 1);
            },
            removeTask: function(index)
            {
                this.tasks.splice(index, 1);
                this.transTaskList.splice(index, 1);
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
                // console.log(el.value);    
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
                for (const task of this.transTaskList)
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
