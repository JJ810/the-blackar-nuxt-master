<template>
  <v-container grid-list-xs>
    <v-layout row justify-space-around>
      <v-flex xs12 sm12 md10>
        <v-card class="pa-3">
          <v-layout row wrap>
            <v-tabs centered style="width: 90%" class="mx-auto" min-hight="500">
              <!--TABS LINKS-->
              <v-tab>Profile info</v-tab>
              <v-tab>Scheduled rides</v-tab>
              <v-tab>Ride history</v-tab>

              <!--USER INFO TAB-->
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-layout align-center justify-center column>
                      <v-avatar  size="100" class="mb-3">
                        <!--                        <img :src="user.imgUrl">-->
                      </v-avatar>
                      <v-btn small color="black" dark>Update photo</v-btn>
                    </v-layout>

<!--                    <profile-form-->
<!--                      v-if="user"-->
<!--                      :user="user"-->
<!--                      @validate="validate"-->
<!--                      :loading="loading">-->
<!--                    </profile-form>-->

                  </v-card-text>
                </v-card>
              </v-tab-item>
              <!--RIDE HISTORY TAB-->
              <v-tab-item>
                <v-card flat>
                  <v-card-text>Ride history</v-card-text>
                </v-card>
              </v-tab-item>
              <!--PAYMENT TAB-->
              <v-tab-item>
                <v-card flat>
                  <v-card-text>Payment method</v-card-text>
                </v-card>
              </v-tab-item>

            </v-tabs>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  //import ProfileForm from '../components/Partials/Forms/ProfileForm';
  import { mapGetters } from 'vuex'
  export default{
    //components:{ ProfileForm },
    methods:{
      validate () {
        //this.$store.dispatch('updateUser', )
        console.log(this.user)
      },
    },
    computed:{
      ...mapGetters([
        'user',
        'error',
        'loading',
      ])
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    }
  }
</script>
