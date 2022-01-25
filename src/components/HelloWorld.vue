<template>
  <v-app>
    <v-app-bar
        app
        color="secondary"
        dark
    >
      <div class="d-flex align-center">
        <v-img
            alt="Vuetify Logo"
            class="shrink mr-4"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
        />
      </div>

      <v-spacer></v-spacer>

<!--      <input placeholder="search..." class="ma-auto search_input">-->
      <v-text-field
          hide-details
          label="Find Artist"
          placeholder="Search..."
          filled
          rounded
          dense
      ></v-text-field>
      <v-spacer></v-spacer>


      <v-btn
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          text
      >
        <span class="mr-2">Log In</span>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>

        <v-navigation-drawer permanent>
          <v-list
              dense
              nav
          >
            <v-list-item
                link
            >
              <v-list-item-icon>
                <v-icon> mdi-view-dashboard </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Find a project</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
            >

              <v-list-item-content>
                <v-list-item-title>Distance</v-list-item-title>
                <v-card-text>
                  <v-slider
                      v-model="zoom"
                      thumb-label="always"
                      class="distance_slide"
                      append-icon="mdi-magnify-plus-outline"
                      prepend-icon="mdi-magnify-minus-outline"
                      @click:append="zoomIn"
                      @click:prepend="zoomOut"
                  ></v-slider>
                </v-card-text>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    zoom:0,
    group: null,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Photos', icon: 'mdi-image' },
      { title: 'About', icon: 'mdi-help-box' },
    ],
    right: null,
  }),
  methods:{
      zoomOut () {
        this.zoom = (this.zoom - 10) || 0
      },
      zoomIn () {
        this.zoom = (this.zoom + 10) || 100
      },
  },

  watch: {
    group () {
      this.drawer = false
    },
  },
}
</script>

<style>
.search_input{
  width: 30%;
  height: 75%;
  border-radius: 30px;
  border: 1px solid white;
  padding: 10px;
  color: wheat;
}

.distance_slide{
  margin-top: 20px;
}

</style>