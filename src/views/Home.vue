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

      <ul class="overview-page__formats-list">
        <li v-for="(format, id) in formats"
          :key="id"
          class="overview-page__format">
          <router-link :to="{ name: 'formats', params: { id: id }}">
            <span>{{ format.size }}</span>
            <div class="icon-l"
              :style="{ backgroundColor: format.color }"></div>
          </router-link>
        </li>
      </ul>
    </section>

    <section>
      <header>
        <h2>Infoväljad:</h2>

        <router-link :to="{ name: 'fields' }">Sisesta väljad
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
    formats: Object
  }
}
</script>

<style lang="scss">
.overview-page {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 50rem;
  margin: 0 auto;

  section {
    flex: 1;
    text-align: left;

    &:nth-child(1) {
      flex-basis: 30%;
    }
  }

  footer {
    flex-basis: 100%;
    margin-top: 6rem;
  }

  a {
    display: inline-block;
  }

  &__formats-list {
    display: grid;
    grid-gap: .75rem;
  }

  &__format:hover {
    opacity: .7;
  }
}
</style>
