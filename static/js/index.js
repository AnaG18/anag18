let index = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        current_page: "home",
        projects: [],
        blogs: [],
        publications: [],
        top_k: [],
        latest_project: {},
        updated: "",
    },
    methods: {
        navigate_to: function(page) {
            this.current_page = page
        },
        open_link: function(url) {
            let win = window.open(url, "_blank")
            win.focus()
        },
        get_top_k: function() {
            axios.get("/top_k", {
                params: {
                    "k": 3
                },
            })
                .then(function(response) {
                    index.top_k = response["data"]["top_k"]
                })
        },
        get_repos: function() {
            // Get all public repos
            axios.get("/public_repos")
                .then(function(response) {
                    index.projects = response["data"]["repos"]  // TODO: Add error checking
                    index.latest_project = index.projects[0]
                    index.updated = response["data"]["updated"]
                })
        },
        get_blogs: function() {
            // Get all blogs
            axios.get("/blogs")
                .then(function(response) {
                    index.blogs = response["data"]["blogs"]
                })
        },
        get_publications: function() {
            // Get all publications
            axios.get("/publications")
                .then(function(response) {
                    index.publications = response["data"]["publications"]
                })
        },
    },
    created: function() {
        this.get_top_k()
        this.get_repos()
        this.get_blogs()
        this.get_publications()
    }
})
