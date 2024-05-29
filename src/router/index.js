import {createRouter, createWebHistory} from 'vue-router'
import characters from '../components/characters.vue'
import episode from '../components/episode.vue'
import location from '../components/location.vue'
import Homepage from '../components/Homepage.vue'

  const router= createRouter(
    { history: createWebHistory(import.meta.env.BASE_URL),
      routes: [
           {
                path:"/",
                name:"Home",
                component: Homepage,
           },
           {
            path:"/characters",
            name:"character",
            component: characters,
          },
          {
               path:"/Episodes",
               name:"episode",
               component: episode,
          },
          {
               path:"/Locations",
               name:"location",
               component: location,
          }
     
       
    ]
   }
)


export default router