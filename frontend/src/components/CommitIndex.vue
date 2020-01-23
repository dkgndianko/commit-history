<template>
  <div class="commits-wrapper">
    <h2>Commits for repository <a href="https://github.com/bcdbuddy/commit-history">bcdbuddy/commit-history</a></h2>
    <button class="refresh-button" @click.prevent="loadCommits" :disabled="loading">Refresh</button>
    <p v-if="message">{{ message }}</p>
    <div class="loader" v-if="loading"></div>
    <div class="overlay" v-if="loading"></div>
    <div class="commits">
      <div class="commit" v-for="commit in sortedCommits" :key="commit.id">
        <div class="commit-author-avatar">
          <img :src="commit.authorAvatar" :alt="commit.authorName"/>
        </div>
        <div class="commit-details">
          <div>
            <h3 class="commit-name">{{ commit.message }}</h3>
            <span class="commit-id">{{ commit.id }}</span>
          </div>
          <p class="commit-meta">
            by <span class="commit-author">{{ commit.authorName }}</span> at 
          <span class="commit-at">{{ commit.at }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const {VUE_APP_SERVER} = process.env
import axios from 'axios'
export default {
  data () {
    return {
      loading: false,
      commits: [],
      message: ''
    }
  },
  computed: {
    sortedCommits () {
      return Array.from(this.commits)
        .sort((aCommit, bCommit) => new Date(bCommit.at) - new Date(aCommit.at))
    }
  },
  methods: {
    loadCommits () {
      this.loading = true
      this.message = ""
      axios({
        method: 'GET',
        url: `${VUE_APP_SERVER}/commit`
      })
        .then((response) => this.commits = response.data.data)
        .catch(error => {
          // window.alert('Something went wrong while fetching commits ' + JSON.stringify(error, null, 2))
          console.error(error)
          this.message = error.message
        })
      .then(() => this.loading = false)
    }
  },
  mounted () {
    this.loadCommits()
  }
}
</script>

<style lang="scss">
  $accent-color: #ff9800;
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255,255,255, .5);
    z-index: 3;
  }
  .commits-wrapper {
    position: relative;
    max-width: 600px;
    min-height: 400px;
    margin: 0 auto;
    --accent-color: #ff9800;
  }
  .commits {
    padding: 16px;
    margin-top: 60px;
    background-color: white;
    border-radius: 5px;
    position: relative;
  }
  .loader {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: var(--accent-color);
    position: absolute;
    transform: translate3d(50%, 50%, 0);
    animation: spin 1s ease-in-out infinite;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  .commit {
    --avatar-size: 70px;
    display: flex;
    align-items: center;
    padding: 32px 0;
    position: relative;
    transition: all .3s;
    &:hover {
      opacity: .85;
      background-color: lighten($accent-color, 30);
    }
    &::before, &::after {
      position: absolute;
      display: inline-block;
      left: 0;
      content: '';
      width: 3px;
      height: 50%;
      margin-left: calc(var(--avatar-size) / 2);
      z-index: 1;
      background-color: #ccc;
    }
    &::before {
      top: 0;
    }
    &::after {
      bottom: 0;
    }
    &:first-child {
      &::before {
        display: none;
      }
    }
    &:last-child {
      &::after {
        display: none;
      }
    }
    &-id {
      font-size: .85rem;
    }
    &-author-avatar {
      width: var(--avatar-size);
      height: var(--avatar-size);
      border-radius: 50%;
      z-index: 2;
      overflow: hidden;
      & img {
        width: var(--avatar-size);
        height: var(--avatar-size);
      }
    }
    &-details {
      width: 100%;
      display: flex;
      flex-direction: column;
      // align-items: center;
      text-align: left;
    }
    &-author {
      text-align: left;
      font-style: italic;
      font-weight: bold;
    }
    &-name {
      margin: 0;
    }
    &-at {
      font-size: 0.85rem;
      color: #888
    }
    &-meta {
      color: #888;
      margin-bottom: 0;
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg)}
    100% { transform: rotate(720deg)}
  }

  .refresh-button {
    outline: none;
    background-color: var(--accent-color);
    cursor: pointer;
    color: white;
    border: none;
    padding: 8px 16px;
    border: 2px solid transparent;
    border-radius: 3px;
    font-weight: bold;
    transition-property: background-color, color, border-color;
    transition-duration: .3s;
    &:hover {
      color: var(--accent-color);
      background-color: white;
      border-color: var(--accent-color);
    }
  }

</style>