
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
                // let post_data = {
                //     src: "en",
                //     dest: "zhCN",
                //     text: this.currentTask,
                //     email: "usmanheart@gmail.com",
                //     password: "PAKINDIA",
                //     premiumkey: null
                // }
                // axios.post("https://frengly.com/frengly/data/translateREST", post_data).
                // then((response) => {
                //     console.log(response.data.translation);
                //     this.tasks.push(response.data.translation)
                //   }
                // );
                let num = this.tasks.length + 1;
                let task = num + "." + this.currentTask + "\n";
                this.tasks.push(task);
                this.currentTask = '';
            },
            removeTask: function(index)
            {
                this.tasks.splice(index, 1);
            },
            copyTasks: function()
            {
                let el = document.createElement('textarea');
                el.value = '';
                for (const task of this.tasks) {
                    el.value += task;
                }
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
                console.log(el.value)
            }
        }
});
