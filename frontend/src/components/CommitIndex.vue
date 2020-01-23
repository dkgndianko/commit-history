<template>
  <div class="commits">
    <div class="loader"></div>
    <div class="commit" v-for="commit in commits" :key="commit.id">
      <div class="commit-author-avatar">
        <img :src="commit.authorAvatar" :alt="commit.authorName"/>
      </div>
      <div class="commit-details">
        <h3 class="commit-author">Optimus Prime</h3>
        <span class="commit-at">2020-01-22T02:19:33Z</span>
      </div>
    </div>
  </div>
</template>

<script>
const {SERVER} = process.env
import axios from 'axios'
export default {
  data () {
    return {
      loading: false,
      commits: []
    }
  },
  methods: {
    loadCommits () {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `${SERVER}/commits`
        })
          .then((response) => resolve(response.data))
          .catch(error => reject(error))
      })
    }
  },
  mounted () {
    this.loading = true
    this.loadCommits()
      .then(commits => this.commits = commits)
      .catch(error => {
        window.alert('Something went wrong while fetching commits ' + JSON.stringify(error, null, 2))
        // console.error(error)
      })
      .then(() => this.loading = false)
  }
}
</script>

<style lang="scss">
  .commits {
    position: relative;
  }
  .loader {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ff9800;
    position: absolute;
    transform: translate3d(50%, 50%, 0);
  }
  .commit {
    display: flex;
    &-author-avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      position: relative;
      &::before, &::after {
        content: '';
        width: 2px;
        height: 100%;
        background-color: tomato;
      }
    }
  }

</style>