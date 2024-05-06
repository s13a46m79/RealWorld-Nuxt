<template>
  <div>
    <EditorMenu :editor="editor"/>
    <editor-content class="mt-5 m-10 p-3 border-2 border-green-500 focus:outline-none" :editor="editor"/>
  </div>
</template>

<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import EditorMenu from './EditorMenu.vue';

const editor = ref()
const comments = ref<number[]>([])
const activeCommentId = ref()
const inputRef = ref<HTMLElement[]>([])

editor.value = new Editor({
  content: "<p>I’m running Tiptap with Vue.js. 🎉</p>",
  extensions: [
    StarterKit,
  ],
})

onUnmounted(() => {
  editor.value.destroy()
})

</script>

<style lang="scss">
.ProseMirror:focus {
    outline: none;
}

.my-comment {
  background-color: rgb(255, 255, 175);
  font-style: underline;
}

.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    color: black;
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }
}
</style>