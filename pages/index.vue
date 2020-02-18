<template>
  <v-layout row wrap>
    <About :data="about" />
    <Services :data="services" />
    <Rates :data="rates" />
    <Feedbacks />

  </v-layout>
</template>

<script>
  import About from '@/components/Sections/About'
  import Services from '@/components/Sections/Services'
  import Rates from '@/components/Sections/Rates'
  import Feedbacks from '@/components/Sections/Feedbacks'
  export default {
    components: { About, Services, Rates, Feedbacks },
    meta:{ requireFooter: true },
    data() {
      return {
        about: {
          title: 'Who we are',
          imgUrl: '/banner.png',
          text: 'theBlackar is executive black car service in City of Chicago and Metropolitan area. We provide most reliable and timely transportation. Whether  you’re travaling for business or pleasure, theBlackar is the service you can rely on.'
        },
        services:{
          title: 'Our Services',
          services: [
            {
              title: 'Airport trips',
              desc: 'We provide service to and from O’hare International Airport and Midway withing the Chicago City and Metropolitan area.',
              imgSrc: '/plane.svg'
            },
            {
              title: 'Point to Point',
              desc: 'We provide direct and speedy service from your pick-up location to your destination. Pick-up and drop-off locations may include downtown Chicago and/or suburban neighborhoods.',
              imgSrc: '/route.svg'
            },
            {
              title: 'Hourly charter',
              desc: 'We provide hourly charter for whether you’re exploring the city and want to visit as many places as you can, or you need transportation for corporate event.',
              imgSrc:'/clock.svg'
            }
          ],
        },
        rates:{
          title: 'Our Rates',
          cars: [
            {
            title:'Sedan',
            options: ["Lincoln MKS", "Cadilac XTS", "Mersedes"],
            imgSrc: '/lincoln.jpeg',
            descOptions: ['Opacity: 4' ,'Per Mile: $3.35', 'Per Minite: $0.40', 'Hourly: $45', 'Min order: $25'],
            minOrder: 25
          },
          {
            title: 'SUV',
            options: ["Suburban", "Escalade", "Navigator"],
            imgSrc: '/escalade.jpeg',
            descOptions: ['Opacity: 6', 'Per Mile: $4.10', 'Per Minute: $0.55', 'Hourly: $60', 'Min order: $40'],
            minOrder: 40
          }
          ],
        }
      }
    },
  }
</script>
