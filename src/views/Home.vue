<template>
  <main class="overview-page">
    <section>
      <header>
        <h2>Formaadid:</h2>

        <router-link :to="{ name: 'formats' }">Lisa formaat
          <span class="btn-icon-s">
            <plus-square-icon class="icon-m"/>
          </span>
        </router-link>
      </header>

      <ul>
        <li v-for="format in formats"
          :key="format.id">
          <span>{{ format.code }}</span>
          <div class="color-block"
            :class="'color-block--' + format.color"></div>
        </li>
      </ul>
    </section>

    <section>
      <header>
        <h2>Infoväljad:</h2>

        <router-link :to="{ name: 'formats' }">Sisesta väljad
          <span class="btn-icon-s">
            <plus-square-icon class="icon-m"/>
          </span>
        </router-link>
      </header>

      <ul>
        <li v-for="field in fields"
          :key="field.id">{{ field }}</li>
      </ul>
    </section>

    <footer>
      <mi-btn small buttonText="Genereeri"/>
    </footer>
  </main>
</template>

<script>
import { PlusSquareIcon } from 'vue-feather-icons'
import MiBtn from '@/components/MiBtn'

export default {
  name: 'home',
  components: { PlusSquareIcon, MiBtn },
  props: {
    fields: Array,
    formats: Array
  }
}
</script>

<style lang="scss">
.overview-page {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  section {
    flex: 1;
    text-align: left;
  }

  footer {
    flex-basis: 100%;
    margin-top: 6rem;
  }
}
</style>
